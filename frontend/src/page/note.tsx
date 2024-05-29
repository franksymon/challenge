import{ useState, useEffect } from 'react';
import axios from 'axios';
import '../style/note.css';


const Note = () => {
  interface Note {
    id?: number;
    title: string;
    body: string;
    date?: string;
  }

  const [idSelected, setIdSelected] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({
    id: null,
    title: '',
    body: '',
    date:'',
  });



  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    if (idSelected) {
      const note = notes.find((note) => note.id === idSelected);
      if (note) {
        setNewNote(note);
      }
    }
  }, [idSelected]);

  const getAllNotes = async () => {
    axios.get('http://localhost:8080/api/v1/notes')
      .then((response) => {
        if (Array.isArray(response.data.data.notes)) {
          setNotes(response.data.data.notes);
        } else {
          console.error('La respuesta de la API no es un array');
        }
      })
      .catch((error) => {
        console.error('Error al obtener las notas:',  error.response.data.message);
      });
  };


  const handleDelete = async (id: number) => {

    await axios.delete(`http://localhost:8080/api/v1/notes/${id}`);
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  };


  const handleCreate = async () => {
    let response;
    if (newNote.id){
      response = await axios.put(`http://localhost:8080/api/v1/notes/${newNote.id}`, newNote);
    }else{
      response = await axios.post('http://localhost:8080/api/v1/notes', newNote);
    }
    
    setNewNote({
      id: null,
      title: '',
      body: '',
      date: '',
    })

    if (response.status === 201 || response.status === 200) {
      setNotes(response.data.data.note);
  }};
  

  return (
    <div>
      <h1>Notas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Contenido</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.title}</td>
              <td>{note.body}</td>
              <td>{note.date}</td>
              <td>
                <button onClick={() => setIdSelected(note.id)}>Editar</button>
                <button onClick={() => handleDelete(note.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="create-note">
        <input
          type="text"
          placeholder="Título"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <input
          placeholder="Contenido"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
        <input
          type="text"
          value={newNote.date}
          placeholder='yyyy-mm-dd'
          onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
        />
        <button onClick={handleCreate}>Crear Nota</button>
      </div>
    </div>
  );
};

export default Note;
