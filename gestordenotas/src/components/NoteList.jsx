import { Link } from "react-router-dom";

function NoteList({ notes = [], deleteNote }) {
  if (!notes.length) {
    return <div className="text-white-50 text-center">No hay notas aún. Crea tu primera nota.</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="note-card p-3 shadow-sm"
          style={{
            borderRadius: "1rem",
            backgroundColor: "#fff3f3",
            border: "1px solid rgba(0,0,0,0.05)",
            nimationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div className="text-start">
              <h5 className="fw-bold">{note.title}</h5>
              <div className="text-muted-custom" style={{ fontSize: 13 }}>
                {new Date(note.createdAt).toLocaleString()}
                {note.updatedAt && note.updatedAt !== note.createdAt ? " • editado" : ""}
              </div>
            </div>

            <div className="d-flex flex-column gap-2">
              <Link
                to={`/edit/${note.id}`}
                className="btn btn-sm btn-powerpuff d-flex align-items-center gap-1"
              >
                <i className="bi bi-pencil-fill"></i> Editar
              </Link>
              <button
                className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                onClick={() => deleteNote(note.id)}
              >
                <i className="bi bi-trash-fill"></i> Eliminar
              </button>
            </div>
          </div>

          <hr style={{ borderColor: "#ffb3b3" }} />

          <div style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>{note.content}</div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
