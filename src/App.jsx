import React, { useState } from "react";
import { initialComments } from "../src/components/initialComments.js";
import "./App.css";

const CommentForm = ({ onAddComment }) => {
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
    onAddComment(newCommentWithTimestamp);
    setNewComment({
      author: "",
      content: "",
      isMyComment: false,
      avatar: "https://via.placeholder.com/50",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Автор:
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
          Содержание:
          <textarea
            name="content"
            value={newComment.content}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Мой комментарий:
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
      <button type="submit">Добавить комментарий</button>
    </form>
  );
};

const CommentList = ({ comments }) => {
  return (
    <div>
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
            {comment.isMyComment && <span>Мой комментарий</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [comments, setComments] = useState(initialComments);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="App">
      <h1>Комментарии</h1>
      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
}
