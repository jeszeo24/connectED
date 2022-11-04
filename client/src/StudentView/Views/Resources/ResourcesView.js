import React, { useState} from 'react'
import './ResourcesView.css'
import Navbar from '../../../StudentView/Navbar'


function ResourcesView() {
  return (
    <div>
      <Navbar />

    <div className='res-lay'>

     <label>Upload</label>
      <input type="file" />
    </div>
    </div>
  )
}

export default ResourcesView