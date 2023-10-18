import React, { useState } from "react";
import { getInitialData, showFormattedDate } from "./utils";
import Navbar from "./components/navbar";
import Card from "./components/card";
import Button from "./components/button";

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [newNote, setNewNote] = useState({ title: "", body: "" });
  const [searchText, setSearchText] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newNote.title && newNote.body) {
      setNotes([
        ...notes,
        {
          id: +new Date(),
          title: newNote.title,
          body: newNote.body,
          archived: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setNewNote({ title: "", body: "" });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) => {
    const searchTextLower = searchText.toLowerCase();
    const titleLower = note.title.toLowerCase();

    if (showArchived) {
      return (
        note.archived &&
        (searchTextLower === "" || titleLower.includes(searchTextLower))
      );
    } else {
      return (
        !note.archived &&
        (searchTextLower === "" || titleLower.includes(searchTextLower))
      );
    }
  });

  return (
    <main>
      <Navbar
        onToggleArchived={() => setShowArchived(!showArchived)}
        showArchived={showArchived}
        onSearchChange={(searchText) => setSearchText(searchText)}
      />
      <div className="content">
        <h2>Tambahkan Catatan Baru</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Judul catatan (maksimum 50 karakter)"
            value={newNote.title}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                title: e.target.value.slice(0, 50),
              })
            }
          />
          <textarea
            placeholder="Isi catatan"
            value={newNote.body}
            onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
          />
          <Button type="submit">Tambahkan Catatan</Button>
        </form>

        {filteredNotes.length > 0 ? (
          <ul className="paraNote">
            {filteredNotes.map((note) => (
              <li className="note" key={note.id}>
                <Card
                  title={note.title}
                  text={note.body}
                  time={showFormattedDate(note.createdAt)}
                />
                <span style={{ gap: "10px", display: "flex" }}>
                  <Button
                    color={"crimson"}
                    onClick={() =>
                      window.confirm("anda yakin hapus note ini?") &&
                      deleteNote(note.id)
                    }
                  >
                    Hapus
                  </Button>
                  <Button
                    color={"chocolate"}
                    onClick={() => toggleArchive(note.id)}
                  >
                    {note.archived ? "Unarchive" : "Archive"}
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada catatan.</p>
        )}
      </div>
    </main>
  );
}

export default App;
