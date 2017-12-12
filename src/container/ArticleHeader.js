import React, { Component } from 'react';

class ArticleHeader extends Component {
  render() {
    return ( <h1 id="article-header-title">{this.props.title}</h1> );
  }
}

export default ArticleHeader;