// Import Packages
import { Col, Row } from 'react-bootstrap';

// Import Store Data
import storeItems from '../data/items.json';

// Import components
import StoreItem from '../components/StoreItem';

function Store() {
    return (
        <div>
            <Row xs="1" md="2" lg="4" className="g-3">
                {
                    storeItems.map((item) => (
                        <Col key={item.id}>
                            <StoreItem {...item} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default Store
