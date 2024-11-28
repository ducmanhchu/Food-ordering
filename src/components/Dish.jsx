import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
 
import Star from './Star'
import Currency from './Currency'
import './Custom.css'

function Dish({ data }) {
    return (
        <>
            {data.map((item) => (
                <Link to={"dish/" + item.beanId} key={item.beanId} className='text-decoration-none'>
                    <Card className='border border-0 cardHover' style={{ width: '16rem', height: '320px' }}>
                        <Card.Img className='object-fit-cover' variant='top' src={item.imageUrl} style={{height: '175px'}}/>
                        <Card.Body>
                            <Card.Title>{item.flavorName}</Card.Title>
                            <Card.Text>
                                <span className="d-flex">
                                    <Star st={5} />
                                    <span className='ms-2 text-secondary'>5/5</span>
                                </span>
                                <Currency amount={50000} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            ))}
        </>
    )
}

export default Dish