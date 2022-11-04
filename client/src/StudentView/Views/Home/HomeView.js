import React, {useEffect, useState} from 'react'
import './HomeView.css'
import NoteList from '../Notes/NoteList'
import Navbar from '../../../StudentView/Navbar'

function HomeView(props) {
  const [note, setNote] = useState([]);


  useEffect(() => {
      getNote();  
  }, []);

  async function getNote() {
      try {
          let response = await fetch('/note');  
          if (response.ok) {
              let result = await response.json();
              setNote(result);
          } else {
              console.log(`Server error: ${response.status} ${response.statusText}`);
          }
      } catch (err) {
          console.log(`Server error: ${err.message}`);
      }
  };

  console.log(note);

  async function deleteNote(id) {
    let options = {
        method: 'DELETE'
    };

    try {
        let response = await fetch(`/note/${id}`, options); 
        if (response.ok) {
            let notes = await response.json();
            setNote(notes);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
};


  return (
    <div className='StudentView'>
        <Navbar />
      <div className='note-view'>
        <NoteList 
            note1={note}
            deleteNote1={deleteNote}/>
      </div>
    </div>
  )
}
export default HomeView
