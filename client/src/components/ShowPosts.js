import React, { useEffect, useState } from "react";
import axios from "axios";

export const ShowPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/post/get");
                setPosts(response.data.posts); // Update the state with the posts array
            } catch (err) {
                console.log(err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => {
                    console.log(post);
                    console.log(typeof post)
                    return (
                        <li key={post._id} className="onePost">
                            <div>
                                <h2>{post.title}</h2>
                            </div>
                            <p className="author">Author: {post.writer}</p>
                            <div className="text">
                                <p>{post.postText}</p>
                            </div>
                            <img src={post.postImage} alt={post.title} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
