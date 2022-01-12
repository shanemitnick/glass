import React from "react";
import '../../styles/newsBlock.css';

class NewsBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        story1: {abstract: '',
                 created_date: '',
                 multimedia: [{caption: '',
                               copyright: '',
                               format: '',
                               height: '',
                               subtype: '',
                               type: '',
                               url: '',
                               width: ''}],
                title: '',
                url: ''},
        story2: {abstract: '',
                 created_date: '',
                 multimedia: [{caption: '',
                               copyright: '',
                               format: '',
                               height: '',
                               subtype: '',
                               type: '',
                               url: '',
                               width: ''}],
                 title: '',
                 url: ''},
        story3: '',
        story4: '',
        story5: ''
    };
  }

  componentDidMount() {

    fetch('/news/top_stories', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify({'user_id': 1})}

    ).then(res => res.json()).then(data => {
        console.log(data);
        console.log(data[0]);
        this.setState({story1: data[0]});
        this.setState({story2: data[1]});
        this.setState({story3: data[2]});
        this.setState({story4: data[3]});
        this.setState({story5: data[4]});
    });
  }

  render() {

    return (

        <div className='news'>

            <div className="news-item">
              <div className='image-container'>
                  <img src={this.state.story1.multimedia['0'].url}>
                  </img>
              </div>

              <div className='information-container'>
                  <div className='title-container'> {this.state.story1.title} </div>
                  <div className='abstract-container'> {this.state.story1.abstract} </div>
              </div>
            </div>

            <div className="news-item">
              <div className='image-container'>
                  <img src={this.state.story2.multimedia['0'].url}>
                  </img>
              </div>

              <div className='information-container'>
                  <div className='title-container'> {this.state.story2.title} </div>
                  <div className='abstract-container'> {this.state.story2.abstract} </div>
              </div>
            </div>



        </div>
    );
   }
   }

export default NewsBlock;
