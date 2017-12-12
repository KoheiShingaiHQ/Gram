import React, { Component } from 'react';

class ContentLabel extends Component {
  render() {
    return (
      <div className="content-label">
        <h2>{this.props.main ? this.props.main : ""}</h2>
        <h3>{this.props.sub ? this.props.sub : ""}</h3>
      </div>
    );
  }
}

export default ContentLabel;