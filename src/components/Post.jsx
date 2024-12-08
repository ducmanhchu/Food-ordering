import { Link } from 'react-router-dom'

import Favorite from '../assets/Favorite.svg'
import Comment from '../assets/Comment.svg'

function Post() {
    return (
        <>
            <Link className='text-decoration-none text-black'>
                <div className="rounded bg-white px-3 py-2 mt-3">
                    <p className="fw-medium border-bottom pb-2" style={{color: '#000066'}}>Đức Mạnh Chu</p>
                    <p className="fs-4 fw-medium mb-2">Tiêu đề bài viết</p>
                    <p>Nội dung bài viết</p>
                </div>
            </Link>
        </>
    )
}

export default Post