import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import postsApi from '../api/posts';
import '../components/Custom.css'

const BASE_URL = "http://127.0.0.1:8000/"; 

function EditPostModal({ show, onHide, post, onUpdate }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image);
    const [loading, setLoading] = useState(false);

    // Đảm bảo rằng image được khởi tạo khi post có hình ảnh
    useEffect(() => {
        if (post.image) {
            console.log('image: ' + post.image);
            setImage(post.image);
        }
    }, [post]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('file', file);
        if (file) {
            setImage(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        // Nếu người dùng chọn ảnh mới, thêm ảnh vào formData
        if (image && typeof image !== 'string') {  // Kiểm tra nếu image là file
            formData.append('image', image); 
        } else if (typeof image === 'string') {  // Nếu image là đường dẫn URL, không cần thay đổi
            formData.append('image', image);  // Đảm bảo gửi lại URL của ảnh cũ
        }
        try {
            await postsApi.updatePost(post.id, formData);
            alert('Cập nhật bài viết thành công!');
            window.location.reload();
            if (onUpdate) onUpdate(post.id, title, image, content);
            onHide(); 
        } catch (error) {
            console.error('Lỗi khi cập nhật bài viết:', error);
            alert('Cập nhật bài viết thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={8} 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control 
                            type="file"
                            accept="image/*" // Chỉ cho phép chọn tệp hình ảnh
                            onChange={handleImageChange}
                        />
                        {image && typeof image === 'string' && (
                            // Nếu image là URL (string), hiển thị ảnh hiện tại
                            <div className="mt-3">
                                <p><strong>Ảnh hiện tại:</strong></p>
                                <img src={`${BASE_URL}${image}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </div>
                        )}
                        {image && typeof image !== 'string' && (
                            // Nếu image là file (tệp hình ảnh mới), hiển thị ảnh preview
                            <div className="mt-3">
                                <p><strong>Ảnh đã chọn:</strong></p>
                                <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            </div>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn blButtonHover rounded-pill' onClick={onHide}>
                    Hủy
                </Button>
                <Button className='btn buttonHover rounded-pill' onClick={handleSave} disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPostModal;
