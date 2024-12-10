import { Link } from 'react-router-dom'

function Post({ data }) {
    // Tính toán thời gian đăng bài 
    const formatDate = (created) => {
        const date = new Date(created)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
    
        return `${day}/${month}/${year}`
    }

    return (
        <>  
            <Link className='text-decoration-none text-black' to={`/posts/${data.id}`}>
                <div className="rounded bg-white px-4 py-3 mt-3">
                    <p className="fw-medium border-bottom pb-2" style={{color: '#000066'}}>{data.author}</p>
                    <p className="fs-4 fw-medium mb-2">{data.title}</p>
                    <p className='text-truncate mb-3'>{data.content}</p>
                    <div className='text-secondary' style={{fontSize: '14px'}}>{formatDate(data.created_at)}</div>
                </div>
            </Link>
        </>
    )
}

export default Post