import React, { useState} from 'react'
import './ResourcesView.css'
import NavbarStudent from '../../NavbarStudent'
import WeatherView from '../../../StudentView/Weather/WeatherView'
import NewsView from '../../../StudentView/News/NewsView'


function ResourcesView() {
  return (
    <div>
      <NavbarStudent />

    <div className='res-lay'>

     <label>Upload</label>
      <input type="file" />
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

export default ResourcesView