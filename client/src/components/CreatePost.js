import './createPost.css'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CreatePost = () => {

    const { user } = useSelector(state => state.auth)
    const [post, setPost] = useState({
        title: "",
        postText: "",
        postImage: "",
        imageUrl: "",
        likes: [],
        writer: user.name,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                "http://localhost:8000/api/post/add", post
            );
            alert("Post Created");
            navigate("/me");
            setPost({ // Clear the input fields
                title: "",
                postText: "",
                postImage: "",
                imageUrl: "",
                likes: [],
                writer: user.name,
            });
        } catch (error) {
            console.error(error);
        }
    };

    console.log(post)

    return (
        <div className="create-post">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                />

                <label htmlFor="postText">What's on your mind</label>
                <textarea
                    id="postText"
                    name="postText"
                    value={post.postText}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="postImage">Image URL</label>
                <input
                    type="text"
                    id="postImage"
                    name="postImage"
                    value={post.postImage}
                    onChange={handleChange}
                />

                <button type="submit">Share Post</button>
            </form>
        </div>
    );
};
