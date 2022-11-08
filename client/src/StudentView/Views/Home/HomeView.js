import React, {useEffect, useState} from 'react'
import './HomeView.css'
import NoteList from '../Notes/NoteList'
import NavbarStudent from '../../NavbarStudent'
import WeatherView from '../../../StudentView/Weather/WeatherView'
import NewsView from '../../../StudentView/News/NewsView'
import Local from '../../../helpers/Local'

function HomeView(props) {
  const [note, setNote] = useState([]);


  useEffect(() => {
      getNote();  
  }, []);

  async function getNote() {
    let id = Local.getUserId(); // getting userId from Local Storage

    // NOTE: GET method is automatic, if not specified

      try {
          let response = await fetch(`/note/${id}`);  // this is from the note route
          // Fetch address used in the front end, must match the route in the backend provided 
          // sets the note, just relevant notes to user
          console.log(response);
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
        <NavbarStudent />
      <div className='note-view'>
        <NoteList 
            note1={note}
            deleteNote1={(id) => deleteNote(id)}/> {/* NoteList passes the id to deleteNote function*/}
      </div>

      <div className='weather-box'>
        <WeatherView/>
      </div>
      <div className='news-box' id='scroll'>
        <NewsView/>
      </div>

    </div>
  )
}
export default HomeView
