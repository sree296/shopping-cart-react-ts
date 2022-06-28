// Import Packages
import { Button, Card } from 'react-bootstrap';

// Import Utils
import { formatCurrency } from '../utilities/formatCurrency';

// Import Context
import { useShoppingCart } from '../context/ShoppingCartContext';

/**
 * Store Item Interface for Props
 */
export interface IStoreItemProps {
    id: number,
    name: string,
    price: number,
    imgUrl: string,
};

function StoreItem(props: IStoreItemProps) {

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      } = useShoppingCart()

    const {id, name, price, imgUrl} = props;
    const quantity = getItemQuantity(id);

    return (
        <div>
            <Card>
                <Card.Img 
                    variant="top" 
                    src={imgUrl} 
                    height="200px" 
                    style={{objectFit: 'cover'}}
                    />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                        <span>{name}</span>
                        <span>{formatCurrency(price)}</span>
                    </Card.Title>
                    <div className="mt-auto">
                        {
                            (quantity === 0)
                            ? (
                                <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
                            ) : (
                                <div
                                    className="d-flex align-items-center justify-content-between flex-row"
                                    style={{ gap: ".5rem" }}
                                    >
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={()=> removeFromCart(id)}
                                    >
                                        Remove
                                    </Button>
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{ gap: ".5rem" }}
                                    >
                                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                        <div>
                                            <span className="fs-3">{quantity}</span> in cart
                                        </div>
                                        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default StoreItem
