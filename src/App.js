import './App.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API;     //adding environment variable
  state={
    progress:0
  }
  setProgress=(value)=>{
    this.setState({progress:value});
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='white'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
        <Routes>
          <Route exact path="/" element={<News apikey={this.apikey} setprogress={this.setProgress}  key="general" />} />
          <Route exact path="/business" element={<News apikey={this.apikey} setprogress={this.setProgress}  category="business" key="business" />} />
          <Route exact path="/entertainment" element={<News apikey={this.apikey} setprogress={this.setProgress}  category="entertainment" key="entertainment" />} />
          <Route exact path="/general" element={<News apikey={this.apikey} setprogress={this.setProgress}  category="general" key="general" />} />
          <Route exact path="/health" element={<News apikey={this.apikey} setprogress={this.setProgress}  category="health" key="health" />} />
          <Route exact path="/science" element={<News apikey={this.apikey} setprogress={this.setProgress}  category="science" key="science" />} />
          <Route exact path="/sports" element={<News apikey={this.apikey} setprogress={this.setProgress}  category="sports" key="sports" />} />
          <Route exact path="/technology" element={<News apikey={this.apikey} setprogress={this.setProgress}  category="technology" key="technology" />} />
                  
        </Routes>
        </Router>
      </div>
    )
  }
}
