import React, { Component } from 'react';
import ContentLabel from '../container/ContentLabel.js';

class ContentsSquare extends Component {
  constructor(props) {
    super(props);
    this.state = { contents : [], language : "" }
  }
  componentDidMount() {
    var contents = [];
    var data = this.props.data;
    for(var i in data){
      var href, target = "";
      if (data[i].href) {
        href = (data[i].href.indexOf("http") !== -1) ? data[i].href : "#" + data[i].href;
        target = (data[i].href.indexOf("http") !== -1) ? "_blank" : "";
      }
      contents.push(
        <li key={data[i].main}>
          <a href={href} target={target}>
            <div style={{backgroundImage:"url("+ data[i].image +")", backgroundSize:data[i].size}}>
              <ContentLabel main={data[i].main} sub={data[i].sub}></ContentLabel>
            </div>
          </a>
        </li>
      );
    }
    this.setState({ contents : contents });
  }
  render() {
    return ( <ul>{this.state.contents}</ul> );
  }
}

export default ContentsSquare;