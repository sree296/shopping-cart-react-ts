import React from 'react'
import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext'
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

type CartItemProps = {
    id: number,
    quantity: number,
}
function CartItem({id, quantity}: CartItemProps) {

    const { removeFromCart} = useShoppingCart();
    const item = storeItems.find(i => i.id === id)
    if(item == null) return null;
    return (
        <div>
            <Stack className="d-flex align-items-center" direction="horizontal" gap={2}>
                <img 
                    src={item.imgUrl}
                    style={{width: '125px', height: '75px', objectFit: 'cover'}}
                />
                <div className="me-auto">
                    <div>
                        {item.name}
                        <span style={{fontSize:'0.65rem', paddingLeft: '0.5rem'}} className="text-muted">
                            {quantity}x
                        </span>
                    </div>
                    <div className="text-muted">
                        {
                            formatCurrency(item.price)
                        }
                    </div>
                </div>
                <div>
                    {
                        formatCurrency(item.price*quantity)
                    }
                    <Button style={{marginLeft: '0.2rem'}} variant="outline-danger" size="sm" 
                        onClick={() => removeFromCart(item.id)}>
                            &times;
                    </Button>
                </div>
            </Stack>
        </div>
    )
}

export default CartItem
