import React, { useEffect, useState } from "react";
import '../../styles/gmailBlock.css';

function GmailBlock() {
  const [mail, getGmail] = useState({});
  const [gotData,  setGotData] = useState(false);

  useEffect(() => {
      if (!gotData) {
      fetch('/api/google/get_gmail', {method: 'GET',
                                      headers: {"Content-Type": "application/json"},
                                        // , "Content-Type": "application/x-www-form-urlencoded"}
                                           }
          ).then(res => res.json()
          ).then(data => {
              getGmail(data);
              console.log(mail);
              setGotData(true);
          });
      }
      //refreshes the data in the component every 3,600,000 ms (aka 1 hour)
      const intervalID = setInterval(() => {
        setGotData(false);
        }, 300000)
        return () => clearInterval(intervalID);

  });



  return (<div className="mail">
              {!gotData ?
                  <div> Loading </div> :
                  <div className='mail-container'>
                  <div className='mail-header'> Recent Emails </div>
                  <div className='messages'> 
                    {Object.keys(mail).map((message) => (
                        <div className='message' key={message}>
                          <div className='subject'> {mail[message].subject} </div>
                          {/* <div className='from'> {mail[message].from} </div> */}
                          <div className='summary'> {mail[message].summary} </div>
                        </div>
                    ))}
                    </div>
                  </div>
              }
           </div>)
 }

export default GmailBlock

