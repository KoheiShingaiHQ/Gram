import React, { Component } from 'react';

class SideRelatedContent extends Component {
  render() {
    return (
      <a href={this.props.href} target={this.props.target}><h3>{this.props.title}</h3></a>
    );
  }
}

export default SideRelatedContent;