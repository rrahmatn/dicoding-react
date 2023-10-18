import React from "react";
import "../styles/style.css";
import Button from "./button";

function Navbar({ onToggleArchived, showArchived, onSearchChange }) {
  return (
    <nav className="navbar">
      <span>My Notes</span>
      <section>
        <input
          type="text"
          placeholder="Cari catatan..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button onClick={onToggleArchived} color={"white-smoke"}>
          {showArchived ? "Tampilkan Semua" : "Tampilkan Terarsip"}
        </Button>
      </section>
    </nav>
  );
}

export default Navbar;
