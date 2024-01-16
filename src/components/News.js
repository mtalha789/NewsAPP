import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loader from './Loader'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country:'in',
    category:'general',
    pageSize:5
  }  
  static propTypes={
    country :PropTypes.string,
    category :PropTypes.string,
    pageSize :PropTypes.number,
    key :PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults:0
    };
    document.title=`${this.capitalize(this.props.category)}-TAZAA KHABAR` 
  }
  capitalize(word){
    return word.charAt(0).toUpperCase()+word.slice(1)
  }
  updatenews=async()=>{
    try {
      this.props.setprogress(10)
      this.setState({loading:true})
      let url =
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      this.props.setprogress(30)
      let parseddata = await data.json();
      this.props.setprogress(70)
      this.setState({
        loading:false,
         articles: parseddata.articles,
         totalResults: parseddata.totalResults 
       });
       this.props.setprogress(100)
    
    } catch (error) {
      
    }
  }

  fetchData=async ()=>{
    try {
      let url =
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page:this.state.page+1})
        let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
        loading:false,
         articles: this.state.articles.concat(parseddata.articles),
         totalResults: parseddata.totalResults 
       });
    } catch (error) {
      
    }
  }
  
  

  async componentDidMount() {
    this.updatenews()
  }
  render() {
    return (
      <>
        <h1 className="text-center">Top Headlines from {this.capitalize(this.props.category)} Category</h1>
        <InfiniteScroll
  dataLength={this.state.articles?.length} //This is important field to render the next data
  next={this.fetchData}
  hasMore={this.state.articles?.length!==this.state.totalResults}
  loader={<Loader/>}
  >
    <div className="container">
        {this.state.loading && <Loader/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-3" key={this.props.key}>
                <Newsitem
                  title={element.title ? element.title : ""}
                  description={
                    element.description ? element.description : ""
                  }
                  urlToImage={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://media.cnn.com/api/v1/images/stellar/prod/230124103823-earth-core-structure.jpg?c=16x9&q=w_800,c_fill"
                  }
                  url={element.url}
                  author={element.author?element.author:'unknown'}
                  publishedAt={element.publishedAt}
                  source={element.source.name} 
                />
              </div>
            );
          })}
        </div>
        </div>

        </InfiniteScroll>
      </>
    );
  }
}

export default News;
