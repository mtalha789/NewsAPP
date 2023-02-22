import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, urlToImage, url, author, publishedAt, source } =
      this.props;
    return (
      <div>
        <div className="card">
        <div className="d-flex" >
        <span className="position-absolute  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1'}}>
            {source}
          </span>
        </div>
          <img src={urlToImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                BY {author} on {new Date (publishedAt).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
