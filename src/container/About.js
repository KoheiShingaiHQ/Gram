import React, { Component } from 'react';
import { hideMenu, setFooterOpacity, setScrollStatus } from '../container/Util.js';
import ContentsSquare from '../container/ContentsSquare.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

class About extends Component {
  initAbout() {
    localStorage.language = localStorage.language || 'english';
    var language = localStorage.language.substring(0, 2);
    var aboutTag = document.getElementById("about");
    var about = firebaseDb.ref("list/" + language);
    var self = this;
    about.on('value', function(snapshot) {
      const val = snapshot.val();
      if (aboutTag && val) {
        var squareTag = document.createElement("section");
        squareTag.id = "contents-square";
        squareTag.classList.add(language);
        aboutTag.innerHTML = "";
        aboutTag.appendChild(squareTag);
        const square = React.createElement(ContentsSquare, {data : val.square});
        ReactDOM.render(square, squareTag);
        setScrollStatus();
        setFooterOpacity(1);
      }
    });
  }
  componentDidMount() {
    hideMenu();
    setFooterOpacity(0);
    this.initAbout();
    var self = this;
    window.addEventListener('resize', function (event) {
      setScrollStatus();
    });
  }
  render() {
    return ( <main id="about"></main> );
  }
}

export default About;