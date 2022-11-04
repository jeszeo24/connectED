import React, {useState} from 'react'
import './NotesView.css'
import Navbar from '../../../StudentView/Navbar'


  const EMPTY_NOTE ={
    noteDate: '',
    title: '',
    note: ''
  
  };
  function NotesView(props) {
    const [noteData, setNoteData] = useState(EMPTY_NOTE);
    
    function handleSubmit (e) {
      e.preventDefault();
      addNote (noteData);
      setNoteData(EMPTY_NOTE);
    }
  
    function handleChange (e){
      let {name, value} = e.target;
      setNoteData (data => ({...data, [name]: value}));
    }
  
    async function addNote(note) {
      let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note)
      };
  
      try {
          let response = await fetch('/note', options);  
          if (response.ok) {
              let result = await response.json();
              setNoteData(result);
          } else {
              console.log(`Server error: ${response.status} ${response.statusText}`);
          }
      } catch (err) {
          console.log(`Server error: ${err.message}`);
      }
  }
  return (
    <div className='NotesView'>
      <Navbar />
    <div className='notes-lay'>
    <form className='notes-lay1'onSubmit={handleSubmit}>
       <label className='date'>
        <input
          type="date"
          name="noteDate"
          value={noteData.noteDate}
          onChange={handleChange}
          />
      </label>
      <label className='title'>
        <input
          type="text"
          name="title"
          placeholder='Title...'
          value={noteData.title}
          onChange={handleChange}
          />
      </label><br></br>
      <label className='note-area'>
        <textarea
          type="text"
          name="note"
          value={noteData.note}
          onChange={handleChange}
          />
      </label> <br></br>
        <button className="noteButton" type="submit">
          Add Note
        </button>
    </form>
    </div>
    </div>
  )
}


export default NotesView