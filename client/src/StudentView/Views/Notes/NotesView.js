import React, {useState} from 'react'
import './NotesView.css'
import NavbarStudent from '../../NavbarStudent'
import WeatherView from '../../../StudentView/Weather/WeatherView'
import NewsView from '../../../StudentView/News/NewsView'
import { useNavigate } from 'react-router-dom'
import Api from "../../../helpers/Api"
import Local from "../../../helpers/Local"


  const EMPTY_NOTE ={
    noteDate: '',
    title: '',
    note: ''
  
  };
  function NotesView(props) {
    const [noteData, setNoteData] = useState(EMPTY_NOTE);
    const navigate = useNavigate();
    
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

      // NOTE: CREATED fetch in API instead
      
      // let options = {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(note)
      // };

      // NOTE: From Api fetch functions, there is addNote(note) which does the POST as above
      let id = Local.getUserId();
      note.user_id = id; // this updates the user_id within note object
      console.log(note);

      try {
          // let response = await fetch('/note', options);
          // NOTE: The POST function with the noteDate, title, note, user_id object 
          let response = await Api.addNote(note);
          console.log(response);
          if (response.ok) {
              // let result = await response.json();
              setNoteData(response.data);
              navigate("/home");
          } else {
              console.log(`Server error: ${response.status} ${response.statusText}`);
          }
      } catch (err) {
          console.log(`Server error: ${err.message}`);
      }
  }
  return (
    <div className='NotesView'>
      <NavbarStudent />
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

    <div className='weather-box'>
        <WeatherView/>
      </div>
      <div className='news-box' id='scroll'>
        <NewsView/>
      </div>
      
    </div>
  )
}


export default NotesView