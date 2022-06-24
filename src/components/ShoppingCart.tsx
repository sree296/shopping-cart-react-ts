import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'

type ShoppingCartProps = {
    isOpen: boolean,
}
function ShoppingCart({isOpen}: ShoppingCartProps) {
    const {closeCart} = useShoppingCart()
    return (
        <div>
            <Offcanvas 
                onHide={closeCart}
                show={isOpen} 
                placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
            </Offcanvas>
        </div>
    )
}

export default ShoppingCart
