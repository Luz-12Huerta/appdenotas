import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteForm({ onSubmit, initialData = {}, submitLabel = "Guardar Nota" }) {
  // Estado para el título y contenido
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");

  // Estado para si la nota es destacada
  const [isFavorite, setIsFavorite] = useState(initialData.isFavorite || false);

  const navigate = useNavigate();

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    // Se crea el objeto nota incluyendo isFavorite
    const note = {
      id: initialData.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: initialData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: isFavorite, // ✅ propiedad agregada
    };

    onSubmit(note);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      {/* Campo título */}
      <div className="mb-3 text-start">
        <label className="form-label fw-bold">Título</label>
        <input
          type="text"
          className="form-control form-control-lg"
          value={title}
          placeholder="Título de la nota"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Campo contenido */}
      <div className="mb-3 text-start">
        <label className="form-label fw-bold">Contenido</label>
        <textarea
          className="form-control"
          rows="6"
          value={content}
          placeholder="Escribe tu nota..."
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* ✅ Checkbox para marcar como destacada */}
      <div className="form-check mb-3 text-start">
        <input
          className="form-check-input"
          type="checkbox"
          id="favoriteCheck"
          checked={isFavorite}
          onChange={(e) => setIsFavorite(e.target.checked)}
        />
        <label className="form-check-label fw-bold" htmlFor="favoriteCheck">
          Marcar como destacada ⭐
        </label>
      </div>

      {/* Botón de guardar */}
      <button type="submit" className="btn btn-powerpuff w-100 fw-bold">
        {submitLabel}
      </button>
    </form>
  );
}

export default NoteForm;