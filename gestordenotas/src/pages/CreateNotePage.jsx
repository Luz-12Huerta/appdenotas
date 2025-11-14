import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import logoChicas from "../assets/logo.png";
import ModoOscuro from "../components/ModoOscuro";

function CreateNotePage() {
  const navigate = useNavigate();

  const saveNote = (note) => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // Validar si ya existe una nota con el mismo título
    const titleExists = savedNotes.some(
      (existingNote) =>
        existingNote.title.trim().toLowerCase() === note.title.trim().toLowerCase()
    );

    if (titleExists) {
      alert("Ya existe una nota con ese título. Por favor elige otro.");
      return;
    }

    savedNotes.unshift(note);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div
      className="app-container p-4 rounded-4 shadow-sm"
      style={{
      //  background: "linear-gradient(135deg, #ff9aa2, #ffb347)",
       // minHeight: "100vh",
      }}
    >
      <div className="text-center mb-4">
        <img
          src={logoChicas}
          alt="Chicas Superpoderosas"
          className="img-fluid rounded-circle shadow-sm logo-chicas"
          style={{ width: "120px" }}
        />
        <h2 className="mt-3 fw-bold text-white">Crear Nota</h2>
     
      </div>

      <div
        className="card p-4"
        style={{ borderRadius: "1rem", backgroundColor: "#fff3f3" }}
      >
        <NoteForm onSubmit={saveNote} submitLabel="Crear Nota" />


        {/* Botón Cancelar */}
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-powerpuff w-100 fw-bold"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNotePage;