import React, { useState, useEffect } from "react";
import '../../styles/newsBlock.css';




function NewsBlock() {
  const [newsStories, setNewsStories] = useState({});
  const [gotData, setGotData] = useState(false);
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!gotData) {
      fetch('api/news', {method: 'POST',
                         headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                         body: JSON.stringify({'user_id': 1})}

      ).then(res => res.json()).then(data => {
        setNewsStories(data)
        setGotData(true)
    });
  } else {
    // updates the index of the story we show every 30,000ms (aka 30 seconds)
    const tick = () => setIdx(i => i + 2);
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }

  //refreshes the data in the component every 3,600,000 ms (aka 1 hour)
    const intervalID = setInterval(() => {
      setGotData(false);
      }, 3600000)
      return () => clearInterval(intervalID);

});

return (
  <div className='news'>
    {!gotData ?
      <div> loading </div> :
      <div className='news'>
          <div className="news-item">
              <div className='image-container'>
                <img 
                src={newsStories[idx % Object.keys(newsStories).length].multimedia[0].url}
                alt={newsStories[idx % Object.keys(newsStories).length].multimedia[0].caption}>
                </img>
              </div>

              <div className='information-container'>
                  <div className='title-container' id="scroll-text"> {newsStories[idx % Object.keys(newsStories).length].title} </div>
                  <div className='abstract-container'> {newsStories[idx % Object.keys(newsStories).length].abstract} </div>
              </div>
          </div>

          <div className="news-item">
              <div className='image-container'>
                  <img
                   src={newsStories[(idx+1) % Object.keys(newsStories).length].multimedia[0].url}
                   alt={newsStories[(idx+1) % Object.keys(newsStories).length].multimedia[0].caption}>
                  </img>
              </div>

              <div className='information-container'>
                  <div className='title-container' id="scroll-text"> {newsStories[(idx+1) % Object.keys(newsStories).length].title} </div>
                  <div className='abstract-container'> {newsStories[(idx+1) % Object.keys(newsStories).length].abstract} </div>
              </div>
           </div>
      </div>

    }

  </div>
);
}

export default NewsBlock
