import React from 'react'
import { Card } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
 
type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string,
};

function StoreItem(props: StoreItemProps) {
    const {id, name, price, imgUrl} = props;
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
                </Card.Body>
            </Card>
        </div>
    )
}

export default StoreItem
