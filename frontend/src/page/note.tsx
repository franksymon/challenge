import{ useState, useEffect } from 'react';
import axios from 'axios';
import '../style/note.css';


const Note = () => {
  interface Note {
    id?: number;
    title: string;
    body: string;
    date?: Date;
  }
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({
    title: '',
    body: '',
    date:'',
  });



  useEffect(() => {
    getAllNotes();
   // handleCreate();
  }, []);

  const getAllNotes = async () => {
    axios.get('http://localhost:8080/api/v1/notes')
      .then((response) => {
        if (Array.isArray(response.data.data.notes)) {
          setNotes(response.data.data.notes);
        } else {
          console.error('La respuesta de la API no es un array');
        }
        //console.log(response.data.data.notes);
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

  const handleEdit = (id: number) => {
    console.log(id);

    const note = notes.find((note) => note.id === id);

    console.log(note);

    if (note) {
      setNewNote({
        title: note.title,
        body: note.body,
        date: new Date(note.date as Date).toLocaleDateString(),
      });
    }

    axios.put(`http://localhost:8080/api/v1/notes/${id}`, {
      title: newNote.title,
      body: newNote.body,
      date: newNote.date,
    });




  };


  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/notes', {
        title: newNote.title,
        body: newNote.body,
        date: newNote.date,
      });
      console.log(response.data);
      if (response.status === 201) {
        setNotes((prevNotes) => [...prevNotes, {"body":response.data.body,"id":response.data.id,"title":response.data.title}]);
      } else {
        console.error('Error al crear la nota:', response);
      }
    } catch (error) {
      console.error('Error de red al crear la nota:', error);
    }
  };
  

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
              <td>{new Date(note.date as Date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(note.id)}>Editar</button>
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
          type="date"
          value={newNote.date}
          onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
        />
        <button onClick={handleCreate}>Crear Nota</button>
      </div>
    </div>
  );
};

export default Note;
