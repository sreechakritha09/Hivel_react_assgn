import React, { useState } from "react";
import UserList from "./components/Userlist.js";
import UserDetails from "./components/UserDetails.js";
import Posts from "./components/Posts.js";
import Todos from "./components/Todos.js";
import "./styles.css";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState("");

  return (
    <div className="app-container">
      <h1 className="app-title">User Dashboard</h1>

      <div className="app-layout">
        {/* User List Section */}
        <div className="userlist-section">
          <UserList
            onSelectUser={(user) => {
              setSelectedUser(user);
              setView("");
            }}
          />
        </div>

        {/* User Details + Posts/Todos Section */}
        <div className="details-section">
          <UserDetails
            user={selectedUser}
            onViewPosts={() => setView("posts")}
            onViewTodos={() => setView("todos")}
          />

          {selectedUser && view === "posts" && (
            <div>
              <h3 className="section-title">Posts</h3>
              <Posts userId={selectedUser.id} />
            </div>
          )}

          {selectedUser && view === "todos" && (
            <div>
              <h3 className="section-title">Todos</h3>
              <Todos userId={selectedUser.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
