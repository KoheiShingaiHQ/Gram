import React, { Component } from 'react';
import { hideMenu, setFooterOpacity } from '../container/Util.js';
import ContentsFull from '../container/ContentsFull.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = { language : "" };
  }
  initTop() {
    localStorage.language = localStorage.language || 'english';
    var language = localStorage.language.substring(0, 2);
    this.setState({ language : language });
    var topTag = document.getElementById("top");
    var top = firebaseDb.ref("top/" + language);
    var self = this;
    top.on('value', function(snapshot) {
      const val = snapshot.val();
      if (topTag && val) {
        var fullTag = document.createElement("section");
        fullTag.id = "contents-full";
        topTag.innerHTML = "";
        topTag.appendChild(fullTag);
        const full = React.createElement(ContentsFull, {data : val.full});
        ReactDOM.render(full, fullTag);
        setFooterOpacity(1);
      }
    });
  }
  componentDidMount() {
    hideMenu();
    setFooterOpacity(0);
    this.initTop();
  }
  render() {
    return ( <main id="top" className={this.state.language}></main> );
  }
}

export default Top;