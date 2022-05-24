import React, { useState, useEffect } from "react";
import '../../styles/newsBlock.css';




function NewsBlock() {
  const [newsStories, setNewsStories] = useState({});
  const [gotData, setGotData] = useState(false);
  const [idx, setIdx] = useState(0);

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

    const tick = () => setIdx(i => i + 2);

    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }
  //refreshes the data in the component every 3,600,000 ms (aka 1 hour)
      
  const intervalID = setInterval(() => {
        setGotData(false);
        }, 3600000)
        return () => clearInterval(intervalID);
  
        
      }, [newsStories]);


  // useEffect(() => {
  //   const tick = () => setIdx(i => i + 2);
  //   const id = setInterval(tick,  10000);
  //   console.log('hi')
  //   return () => clearInterval(id);
  // }, []);


  return (
    <div className='news'>
      {!gotData ?
        <div> loading </div> :
        <div className='news'>
        
          {console.log(newsStories)}
          {console.log(idx)}
          {console.log(Object.keys(newsStories).length)}
          {console.log(idx % Object.keys(newsStories).length)}
          {console.log(newsStories[idx % Object.keys(newsStories).length])}
        
          <div> 
            <h1> {idx} </h1>
            <NewsStory story={newsStories[idx % Object.keys(newsStories).length]} />
            <NewsStory story={newsStories[(idx+1) % Object.keys(newsStories).length]} />
          
          </div>
        </div>
      }

    </div>
  );
  }

export default NewsBlock



function NewsStory(props) {
  const [story, setStory] = useState({});
  const [gotData,  setGotData] = useState(false);


  useEffect(() => {
    setStory(props.story)
    setGotData(true)
  
  }, [story]);



  return (<div className="news-story">
            {!gotData ?
              <div> Loading </div> :
              <div className="news-item">
                <div className='image-container'>
                  
                  <img 
                  src={story.multimedia[0].url}
                  alt={story.multimedia[0].caption}>
                  </img>
                </div>

                <div className='information-container'>
                  <div className='title-container' id="scroll-text"> {story.title} </div>
                  <div className='abstract-container'> {story.abstract} </div>
                </div>
              </div>}
            </div>)


}