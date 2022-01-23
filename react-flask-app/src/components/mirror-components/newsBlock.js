import React, { useState, useEffect } from "react";
import '../../styles/newsBlock.css';




function NewsBlock() {
  const [newsStories, setNewsStories] = useState({});
  const [gotData, setGotData] = useState(false);

  useEffect(() => {
    if (!gotData) {
      fetch('api/news', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify({'user_id': 1})}

      ).then(res => res.json()).then(data => {
        console.log(data)
        console.log(data[0])
        console.log(data['0'])

        setNewsStories(data)
        setGotData(true)
    });
  }
});

return (
  <div className='news'>
    {!gotData ?
      <div> loading </div> :
      <div className='news'>
          <div className="news-item">
              <div className='image-container'>
                <img src={newsStories[0].multimedia[0].url}>
                </img>
              </div>

              <div className='information-container'>
                  <div className='title-container'> {newsStories[0].title} </div>
                  <div className='abstract-container'> {newsStories[0].abstract} </div>
              </div>
          </div>

          <div className="news-item">
              <div className='image-container'>
                  <img src={newsStories[1].multimedia[0].url}>
                  </img>
              </div>

              <div className='information-container'>
                  <div className='title-container'> {newsStories[1].title} </div>
                  <div className='abstract-container'> {newsStories[1].abstract} </div>
              </div>
           </div>
      </div>

    }

  </div>
);
}

export default NewsBlock
