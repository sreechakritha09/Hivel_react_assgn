import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredUsers);
      setPage(1); // reset to first page on search
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, users]);

  const usersPerPage = 5;
  const paginatedUsers = filtered.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <div>
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />

      <div
        className="user-grid"
        style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
      >
        {paginatedUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            style={{
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              width: "200px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
              alt={user.name}
              width={50}
              height={50}
              style={{ borderRadius: "50%", marginBottom: "8px" }}
            />
            <h4 style={{ margin: "4px 0" }}>{user.name}</h4>
            <p style={{ margin: "2px 0", fontSize: "0.9em" }}>{user.email}</p>
            <p style={{ margin: "2px 0", fontSize: "0.9em", color: "#555" }}>
              {user.company.name}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {Array.from({
          length: Math.ceil(filtered.length / usersPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: "0 5px",
              padding: "6px 12px",
              backgroundColor: page === i + 1 ? "#333" : "#eee",
              color: page === i + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
