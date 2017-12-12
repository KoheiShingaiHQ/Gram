import React, { Component } from 'react';
import Content from '../container/Content.js';

class ContentsHalf extends Component {
  render() {
    return (
      <section id="contents-half">
        <ul>{contents}</ul>
      </section>
    );
  }
}

var contents = [];
var data = [];
for(var i in data){
  contents.push(
    <li key={data[i].main}>
      <div>
        <Content half_main={data[i].main} half_sub={data[i].sub}></Content>
      </div>
    </li>
  );
}

export default ContentsHalf;