// src/pages/HomePage.jsx
import { Link } from "react-router-dom"; // Navegación sin recargar la página
import { useEffect, useState } from "react"; // Hooks de React
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Librería moderna para arrastrar/soltar
import logo from "../assets/logo.png"; 
import ModoOscuro from "../components/ModoOscuro"; // Componente para cambiar modo oscuro/claro

function HomePage() {
  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  // Eliminar una nota
  const deleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  // Marcar o desmarcar una nota como favorita
  const toggleFavorite = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Sincronizar si se agregan o editan notas desde otra página
  useEffect(() => {
    const onFocus = () => {
      const saved = JSON.parse(localStorage.getItem("notes")) || [];
      setNotes(saved);
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // Filtrar notas según el texto buscado y el filtro de destacadas
  const filtered = notes.filter(
    (n) =>
      (n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())) &&
      (!showFavoritesOnly || n.isFavorite)
  );

  // Lógica para drag & drop
  const handleDragEnd = (result) => {
    if (!result.destination) return; // Si se suelta fuera del área, no hacer nada

    const items = Array.from(notes); // Crear copia del array original
    const [moved] = items.splice(result.source.index, 1); // Quitar la nota arrastrada
    items.splice(result.destination.index, 0, moved); // Insertarla en nueva posición

    setNotes(items);
    localStorage.setItem("notes", JSON.stringify(items)); // Guardar el nuevo orden
  };

  return (
    <div className="app-container p-4 rounded-4 shadow-sm">
      {/* CABECERA */}
      <div className="text-center mb-4">
        {/* Logo con animación */}
        <img
          src={logo}
          alt="Chicas Superpoderosas"
          className="img-fluid rounded-circle shadow-sm logo-chicas"
          style={{ width: "120px" }}
        />

        {/* Título y subtítulo */}
        <h1 className="mt-3 fw-bold text-white">Gestor de Notas</h1>
        <p className="text-white-50">Organiza tus ideas fácilmente ✨</p>

        {/* Botón de modo oscuro */}
        <ModoOscuro />
      </div>

      {/* BUSCADOR + BOTÓN NUEVA NOTA */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscar notas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderRadius: "12px", flex: 1, backgroundColor: "#fff0f5" }}
        />

        <Link
          to="/create"
          className="btn btn-powerpuff fw-bold"
          style={{ minWidth: "140px" }}
        >
          + Nueva
        </Link>
      </div>

      {/* CONTADOR Y FILTRO DE NOTAS */}
      <div className="text-white fw-bold mb-3 d-flex justify-content-between align-items-center">
        <span>Total de notas: {filtered.length}</span>

        <button
          className="btn-filtro-favoritas px-3 py-2 rounded-3"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          {showFavoritesOnly ? "Ver todas" : "Ver solo destacadas ⭐"}
        </button>
      </div>

      {/* LISTADO DE NOTAS CON DRAG & DROP */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div
              className="row g-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filtered.map((note, index) => (
                <Draggable
                  key={note.id.toString()}
                  draggableId={note.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="col-12 col-md-6 col-lg-4"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Tarjeta de nota */}
                      <div
                        className={`note-card p-3 shadow-sm ${
                          note.isFavorite ? "favorite" : ""
                        } ${snapshot.isDragging ? "dragging" : ""}`}
                        style={{
                          backgroundColor: "#ffe0eb",
                          borderRadius: "12px",
                          transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                      >
                        {/* Encabezado de nota */}
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5 style={{ marginBottom: 4 }}>
                              {note.title}{" "}
                              <button
                                className="btn-favorite-toggle"
                                onClick={() => toggleFavorite(note.id)}
                                title={
                                  note.isFavorite
                                    ? "Quitar destacado"
                                    : "Marcar como destacada"
                                }
                              >
                                {note.isFavorite ? "⭐" : "☆"}
                              </button>
                            </h5>

                            <div
                              className="text-muted-custom"
                              style={{ fontSize: 13 }}
                            >
                              {new Date(note.createdAt).toLocaleString()}
                              {note.updatedAt &&
                              note.updatedAt !== note.createdAt
                                ? " • editado"
                                : ""}
                            </div>
                          </div>

                          {/* Botones de acción */}
                          <div className="d-flex flex-column align-items-end">
                            <Link
                              to={`/edit/${note.id}`}
                              className="btn btn-sm btn-outline-primary mb-1"
                            >
                              Editar
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteNote(note.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>

                        <hr />

                        {/* Contenido de la nota */}
                        <div style={{ whiteSpace: "pre-wrap" }}>
                          {note.content}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder /* Espacio que ocupa la nota arrastrada */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default HomePage;
