import React, { useState } from 'react'
import './NewsView.css'

let NEWS_URL = "https://api.goperigon.com/v1/all?apiKey=4f6054df-9a86-4ba6-9f4d-bd81731dc4b1&category="
// "https://newsdata.io/api/1/news?apikey=pub_12742b4dafcb12fcb92556cb2ccc825d2546f&language=en&country=gb&category="

function NewsView(props) {
    // const [category, setCategory] = useState ('');
    const [news, setNews] = useState ({});
    
    const handleChange = e => {
        // setCategory(e.target.value);
        getNews(e.target.value);
      };
    
    //   const handleSubmit = e => {
    //     e.preventDefault();
    //     getNews();
    // //     setCategory(''); 
    //   };

      async function getNews(category) {

        let url = `${NEWS_URL}${category}`;
        try {
          let response = await fetch(url);
          if (response.ok) {
            let data = await response.json();
            setNews(data);
          } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.log(`Network error: ${err.message}`);
        }
       }  


  return (

    <div className='newsView'>
        <form >
        {/* <select onChange={handleChange}> 
            <option>  </option>
            <option value="business" >Business</option>
            <option value="entertainment" >Entertainment</option>
            <option value="environment" >Environment</option>
            <option value="food" >Food</option>
            <option value="health" >Health</option>
            <option value="politics" >Politics</option>
            <option value="science" >Science</option>
            <option value="sports" >Sports</option>
            <option value="technology" >Technology</option>
            <option value="top" >Top</option>
            <option value="world" >World</option>
        </select> */}
        <select onChange={handleChange}> 
            <option>  </option>
            <option value="Business" >Business</option>
            <option value="Entertainment" >Entertainment</option>
            <option value="Environment" >Environment</option>
            <option value="Finance" >Finance</option>
            <option value="Health" >Health</option>
            <option value="Politics" >Politics</option>
            <option value="Science" >Science</option>
            <option value="Sports" >Sports</option>
            <option value="Tech" >Technology</option>
            <option value="Lifestyle" >Lifestyle</option>
            <option value="Travel" >Travel</option>
        </select>

        </form>
            <div className='first'>
                {news.articles? <img src={news.articles[0].imageUrl}/> : null}
                {news.articles? <a href={news.articles[0].url}><h3>{news.articles[0].title}</h3></a> : null}
                {news.articles? <p>{news.articles[0].description}</p> : null }
                
            </div>
            {/* <div className='second'>
                {news.results? <img src={news.results[0].image_url}/> : null}
                {news.results? <a href={news.results[1].link}><h3>{news.results[1].title}</h3></a> : null}
                {news.results? <p>{news.results[1].description}</p> : null }
            </div>
            <div className='third'>
                {news.results? <img src={news.results[2].image_url}/> : null}
                {news.results? <a href={news.results[2].link}><h3>{news.results[2].title}</h3></a> : null}
                {news.results? <p>{news.results[2].description}</p> : null }
            </div>
            <div className='fourth'>
                {news.results? <img src={news.results[3].image_url}/> : null}
                {news.results? <a href={news.results[3].link}><h3>{news.results[3].title}</h3></a> : null}
                {news.results? <p>{news.results[3].description}</p> : null }
            </div>
            <div className='fifth'>
                {news.results? <img src={news.results[4].image_url}/> : null}
                {news.results? <a href={news.results[4].link}><h3>{news.results[4].title}</h3></a> : null}
                {news.results? <p>{news.results[4].description}</p> : null }
            </div> */}

    </div>
  )
}

export default NewsView