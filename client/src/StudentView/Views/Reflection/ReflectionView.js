// import { text } from 'express';
import React, { useState } from 'react'
import './ReflectionView.css';
import Navbar from '../../../StudentView/Navbar'

const EMPTY_FORM ={
  refDate: '',
  studentid: '',
  question1: '',
  question2: '',
  question3: '',
  question4: '',
  question5: '',
  question6: ''

};

function ReflectionView(props) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  
  function handleSubmit (e) {
    e.preventDefault();
    addReflection (formData);
    setFormData(EMPTY_FORM);
  }

  function handleChange (e){
    let {name, value} = e.target;
    setFormData (data => ({...data, [name]: value}));
  }

  async function addReflection(reflection) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reflection)
    };

    try {
        let response = await fetch('/reflection', options);  
        if (response.ok) {
            let result = await response.json();
            setFormData(result);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
}


  return (
    <div>
      <Navbar />
    <form className='reflectionForm' onSubmit={handleSubmit}>
      <label className='date'>
        Date
        <input
          type="date"
          name="refDate"
          value={formData.refDate}
          onChange={handleChange}
          />
      </label>
      <label className='studentid'>
        <input
          type="number"
          name="studentid"
          placeholder='Enter Student ID'
          value={formData.studentid}
          onChange={handleChange}
          />
      </label><br></br>
      <label>
       <h5>Problems I faced this week...</h5>
        <textarea
          type="text"
          name="question1"
          value={formData.question1}
          onChange={handleChange}
          />
      </label> <br></br>
      <label>
      <h5>Problems I overcame...</h5>
        <textarea
          type="text"
          name="question2"
          value={formData.question2}
          onChange={handleChange}
          />
      </label> <br></br>
      <label>
      <h5>Things I need to work on...</h5>
        <textarea
          type="text"
          name="question3"
          value={formData.question3}
          onChange={handleChange}
          />
      </label><br></br>
      <label>
      <h5>What I found the most interesting...</h5>
        <textarea
          type="text"
          name="question4"
          value={formData.question4}
          onChange={handleChange}
          />
      </label><br></br>
      <label>
      <h5>Something that made me feel good...</h5>
        <textarea
          type="text"
          name="question5"
          value={formData.question5}
          onChange={handleChange}
          />
      </label><br></br>
      <h5> I would rate this week as:</h5> <br></br>
      <label>
        Amazing
        <input className='inline'
          type="radio"
          name="question6"
          value="amazing"
          onChange={handleChange}
          />
        
      </label>
      <label>
        Good
        <input className='inline'
          type="radio"
          name="question6"
          value="good"
          onChange={handleChange}
          />
          
      </label>
      <label>
         Neutral
        <input className='inline'
          type="radio"
          name="question6"
          value="neutral"
          onChange={handleChange}
          />
         
      </label>
      <label>
        Could have been better
        <input className='inline'
          type="radio"
          name="question6"
          value="could have been better"
          onChange={handleChange}
          />
          
      </label>
      <label>
          Awful
        <input className='inline'
          type="radio"
          name="question6"
          value="awful"
          onChange={handleChange}
          />
         
      </label>
      <button className='ref-btn' type='submit'>Submit</button>
    </form>
    </div>
  )
}

export default ReflectionView