import React, {useEffect, useState} from 'react'
import './ReflectionList.css'
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root")

function ReflectionList(props) {
  const [open, setOpen] = useState(false);
  

  function toggleModal(e){
    setOpen(!open)
  }

  return (
    <div>
    <ul className='ref-lay'>
        { props.reflection1.map(r => (
            <li className='ref-list'
                key={r.id}>
                    {r.studentid} <br></br>
                    {(new Date(r.refDate)).toDateString()}
                    <button className='open' onClick={toggleModal}type="button">Select</button>
                    <ReactModal
                      isOpen={open}
                      onRequestClose={toggleModal}
                      contentLabel='content'
                      className='ref-modal'
                      overlayClassName='ref-overlay'
                      closeTimeoutMS={400}
                      >
                        <h3>Student Name: Jubilation Lee </h3>
                        <h4>Student ID:{r.studentid}</h4>
                        <h5>Problems I faced this week...</h5>
                        <p>{r.question1}</p>
                        <h5>Problems I overcame...</h5>
                        <p>{r.question2}</p>
                        <h5>Things I need to work on...</h5>
                        <p>{r.question3}</p>
                        <h5>What I found the most interesting...</h5>
                        <p>{r.question4}</p>
                        <h5>Something that made me feel good...</h5>
                        <p>{r.question5}</p>
                        <h5>I would rate this week as:</h5>
                        <p>{r.question6}</p>
                        <button className='close' onClick={toggleModal}>Close</button>
                      </ReactModal>
                </li>
        ))
        }
    </ul>

    </div>
  )
}

export default ReflectionList