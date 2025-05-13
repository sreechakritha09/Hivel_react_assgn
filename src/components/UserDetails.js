import React from "react";

export default function UserDetails({ user, onViewPosts, onViewTodos }) {
  if (!user) return null;

  const { username, phone, website, address } = user;

  return (
    <div className="details-panel">
      <h3>{username}</h3>
      <p>{phone}</p>
      <a href={`http://${website}`} target="_blank" rel="noreferrer">
        {website}
      </a>
      <p>
        {address.street}, {address.city}, {address.zipcode}
      </p>
      <button onClick={() => onViewPosts(user.id)}>📄 View Posts</button>
      <button onClick={() => onViewTodos(user.id)}>✅ View Todos</button>
    </div>
  );
}
