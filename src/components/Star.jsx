import 'bootstrap-icons/font/bootstrap-icons.css'

function Star(props){
    if (props.st < 0) {
        return null
    }

    return (
        <span>
            {/* Render sao vàng */}
            {[...Array(props.st)].map((_, i) => (
                <i 
                    key={`filled-${i}`} 
                    className="text-warning bi bi-star-fill" 
                    style={{ paddingRight: '3px', fontSize: '15px' }}
                ></i>
            ))}

            {/* Render sao trống */}
            {[...Array(5 - props.st)].map((_, i) => (
                <i 
                    key={`empty-${i}`} 
                    className="bi bi-star-fill" 
                    style={{ color: "#d9d9d9", paddingRight: '3px', fontSize: '15px' }}
                ></i>
            ))}
        </span>
    )
}

export default Star
