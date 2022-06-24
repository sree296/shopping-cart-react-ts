// Import Packages
import { Offcanvas, Stack } from 'react-bootstrap'

// Import Context
import { useShoppingCart } from '../context/ShoppingCartContext'

// Import Utils
import { formatCurrency } from '../utilities/formatCurrency'

// Import Components
import CartItem from './CartItem'

// Import Data
import storeItems from "../data/items.json"

/**
 * Shopping Cart interface for Props
 */
export interface IShoppingCartProps {
    isOpen: boolean,
}

function ShoppingCart({isOpen}: IShoppingCartProps) {
    const {closeCart, cartItems} = useShoppingCart();

    return (
        <div>
            <Offcanvas 
                onHide={closeCart}
                show={isOpen} 
                placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack gap={3}>
                        {
                            cartItems.map(item => (
                                <CartItem key={item.id} {...item}/>
                            ))
                        }
                        <div className="ms-auto fw-bold fs-5">
                            Total{" "}
                            {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                            )}
                        </div>
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default ShoppingCart
