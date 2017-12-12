import React, { Component } from 'react';

class ContentTimeline extends Component {
  constructor(props) {
    super(props);
    if (this.props.article.indexOf("http") !== -1) {
      this.state = { url : this.props.article, target : "_blank" };
    } else if (this.props.article.indexOf("#") !== -1) {
      this.state = { url : this.props.article, target : "" };
    } else {
      this.state = { url : "#/docs/" + this.props.article, target : "" };
    }
  }
  render() {
    return (
      <section className={"content-timeline " + this.props.language}>
        <time className="cbp_tmtime" dateTime={this.props.time}>
          <span>{this.props.year}</span>
          <span>{this.props.month}</span>
        </time>
        <div className="line"></div>
        <a href={this.state.url} target={this.state.target}>
          <div className={"content " + this.props.language}>
            <h2>{this.props.title}</h2>
            <p>{this.props.content}</p>
            { this.props.image ?
              <img alt={this.props.article} src={this.props.image} id={"image-" + this.props.article} /> : ""
            }
          </div>
        </a>
      </section>
    );
  }
}

export default ContentTimeline;