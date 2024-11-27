import { Container } from 'react-bootstrap'

import gray from '../assets/grayLogo.svg'

function Footer() {
    return (
        <>
            <div className="mt-3" style={{backgroundColor: '#000066'}}>
                <Container className='pt-4 pb-2'>
                    <img src={gray} alt="Logo" width='60' />
                    <p className='text-secondary mt-2 mb-0'>Địa chỉ: Nghiêm Xuân Yêm - Đại Kim - Hoàng Mai - Hà Nội</p>
                    <div className="d-flex text-secondary justify-content-between">
                        <p>SĐT: 123456789</p>
                        <p>Copyright © 2024 Ducmanhchu and friends :3</p>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer