import { useState } from "react";
import postsApi from "../api/posts";

function Comment({ data, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(data.content);

    // Xử lý xóa bình luận
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?");
        if (confirmDelete) {
            try {
                await postsApi.deleteComment(data.id); // Gọi API xóa bình luận
                alert("Xóa bình luận thành công!");
                if (onDelete) onDelete(data.id); // Gọi callback để cập nhật danh sách
            } catch (error) {
                console.error("Lỗi khi xóa bình luận:", error);
                alert("Xóa bình luận thất bại!");
            }
        }
    };

    // Xử lý lưu bình luận đã chỉnh sửa
    const handleSave = async () => {
        try {
            await postsApi.updateComment(data.id, data.post, editedContent); // Gọi API sửa bình luận
            alert("Sửa bình luận thành công!");
            if (onUpdate) onUpdate(data.id, editedContent); // Gọi callback để cập nhật danh sách
            setIsEditing(false); // Đóng chế độ chỉnh sửa
        } catch (error) {
            console.error("Lỗi khi sửa bình luận:", error);
            alert("Sửa bình luận thất bại!");
        }
    };

    return (
        <div className="mt-2">
            {/* <p className="mb-1" style={{ color: "#000066" }}>{data.author}</p> */}
            {isEditing ? (
                <>
                    <textarea
                        className="form-control mb-2"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button className="btn btn-primary btn-sm me-2" onClick={handleSave}>
                        Lưu
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
                        Hủy
                    </button>
                </>
            ) : (
                <>
                    <p>{data.content}</p>
                    <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => setIsEditing(true)}
                    >
                        Sửa
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={handleDelete}
                    >
                        Xóa
                    </button>
                </>
            )}
        </div>
    );
}

export default Comment;
