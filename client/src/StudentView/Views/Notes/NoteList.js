import React from 'react'
import './NoteList.css'

function NoteList(props) {
  return (
    <div>
         <ul className='note-lay'>
        { props.note1.map(n => (
            <li className='note-list'
                key={n.id}>
                    <button className='delete' onClick={(e) => props.deleteNote1(n.id)} title="delete" type="button">x</button>
                    {n.title} <br></br>
                    {(new Date(n.noteDate)).toDateString()}
                    
            </li>
        ))}
    </ul>

    </div>
  )
}

export default NoteList