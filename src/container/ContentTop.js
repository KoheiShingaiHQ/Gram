import React, { Component } from 'react';
import ContentsFull from '../container/ContentsFull.js';

class ContentTop extends Component {
  render() {
    return ( 
      <section id="content-top" className={this.props.language}>
        <section id="contents-full">
          <ContentsFull data={this.props.data}></ContentsFull>
        </section>
      </section>
    );
  }
}

export default ContentTop;