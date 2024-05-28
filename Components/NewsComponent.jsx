import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'
import Spinner from "./Spinner";


export class NewsComponent extends Component {

  static defaultProps = {
      country: 'in',
      pageSize : 5,
      category : 'general',

  }

  static propTypes = {
    country :PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  constructor() {
    super();
    console.log("Hello I am a constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("CDM");
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efd43181d6d14d05a137b1eec02876b7&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults : parsedData.totalResults,
      loading: false
    });
  }

  async updateNews(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efd43181d6d14d05a137b1eec02876b7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading : false
    });
  }

  handlePrevClick = async () => {
      this.setState({
        page: this.state.page - 1
      })

      this.updateNews()
  };

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">MonkeyNews - Top Headlines</h1>
       {this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 " key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : "" }
                  imageUrl={element.urlToImage? element.urlToImage: "https://i.ytimg.com/vi/lWM8rWVh9H0/maxresdefault.jpg"}
                  newsUrl={element.url}
                  author = {element.author}
                  date = {element.publishedAt}
                  source = {element.source.name}
                />
              </div>
            );
          })}

          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Prev </button>
            <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >  {" "}  Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsComponent;
