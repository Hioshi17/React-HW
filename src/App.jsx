import { useState } from "react";

export default function App() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState({
    author: "",
    content: "",
    isMyComment: false,
    avatar: "https://via.placeholder.com/50",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCommentWithTimestamp = {
      ...newComment,
      timestamp: Date.now(),
    };
    setComments([...comments, newCommentWithTimestamp]);
    setNewComment({
      author: "",
      content: "",
      isMyComment: false,
      avatar: "https://via.placeholder.com/50",
    });
  };

  return (
    <div>
      <h1 className="">Comments</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={newComment.author}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea
              name="content"
              value={newComment.content}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Is My Comment:
            <input
              type="checkbox"
              name="isMyComment"
              checked={newComment.isMyComment}
              onChange={(e) =>
                setNewComment({
                  ...newComment,
                  isMyComment: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <button type="submit">Add Comment</button>
      </form>
      {comments.map((comment, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <img
            src={comment.avatar}
            alt="avatar"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <div>
            <strong>{comment.author}</strong>
            <p>{new Date(comment.timestamp).toLocaleString()}</p>
            <p>{comment.content}</p>
            {comment.isMyComment && <span>My Comment</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
