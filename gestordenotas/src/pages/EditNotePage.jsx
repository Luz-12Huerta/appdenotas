// src/pages/EditNotePage.jsx
import { useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { useEffect, useState } from "react";

function EditNotePage() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    const note = saved.find((n) => n.id === id);
    if (note) setInitial(note);
  }, [id]);

  const handleUpdate = (updatedNote) => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    const updated = saved.map((n) => (n.id === id ? { ...n, ...updatedNote } : n));
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  if (!initial) return <div className="app-container">Cargando nota...</div>;

  return (
    <div className="app-container">
      <h2 className="mb-3">Editar Nota</h2>
      <div className="card p-3">
        <NoteForm onSubmit={handleUpdate} initialData={initial} submitLabel="Actualizar" />
      </div>
    </div>
  );
}

export default EditNotePage;
