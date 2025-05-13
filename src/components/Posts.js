import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Posts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => setPosts(res.data));
  }, [userId]);

  const sortedPosts = [...posts].sort((a, b) => {
    return sort === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  return (
    <div>
      <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
        Sort Title {sort === "asc" ? "A→Z" : "Z→A"}
      </button>
      {sortedPosts.map((post) => (
        <div key={post.id} className="post-card">
          <h4>{post.title}</h4>
          <p>{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
