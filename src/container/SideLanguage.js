import React, { Component } from 'react';
import { firebaseDb } from '../firebase/';

class SideLanguage extends Component {
  initLanguage(props) {
    var path = (props.id === "top") ? "top/" + props.language : "detail/" + props.id + "/" + props.language;
    var currentLanguage = document.getElementById("current-language");
    var menuLanguage = document.getElementById("menu-language");
    if (currentLanguage && menuLanguage) {
    var language = firebaseDb.ref(path + "/side/language");
    language.on('value', function(snapshot) {
      const val = snapshot.val();
      for (var i in val) {
        var data, dataId;
        if (val[i].indexOf(':::') === -1) {
          data = val[i];
          dataId = val[i];
        } else {
          data = val[i].split(':::')[0];
          dataId = val[i].split(':::')[1]; 
        }
        var element = document.createElement("div");
        if (props.language === dataId.substring(0, 2)) {
          currentLanguage.innerText = data || 'english';
          element.classList.add('selected');
        }
        element.classList.add('language');
        element.innerText = data;
        element["language"] = props.language;
        element.setAttribute('data', dataId);
        menuLanguage.appendChild(element);
      }
    });
    var menu = document.getElementById("menu");
    window.menuClicked = false;
    window.onclick = function(e){
      window.clicked = true;
      if (window.clicked === window.menuClicked) {
        menu.style.display = "block";
        window.menuClicked = false;
      } else {
        menu.style.display = "none";
      }
    }
  }
  }
  clickSideLanguage(e) {
    e.preventDefault();
    var currentLanguage = document.getElementById("current-language");
    var menu = document.getElementById("menu");
    window.menuClicked = true;
    if (e.target.classList[0] === 'language') {
      localStorage.language = e.target.getAttribute('data');
      currentLanguage.innerText = "";
      setTimeout(function(){
        menu.style.display = "none";
        window.location.reload();
      }, 150);
    }
  }
  componentDidMount(){
    this.initLanguage(this.props);
  }
  render() {
    return (
      <section className={this.props.language}>
        <h2 className="en">Language</h2>
        <h2 className="ja">言語</h2>
        <div className="selector" onClick={this.clickSideLanguage}>
          <span className="text">
            <div id="current-language"></div>
          </span>
          <span className="icon" aria-hidden="true">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
          </span>
          <div id="menu">
            <div id="menu-language"></div>
          </div>
        </div>
      </section>
    );
  }
}

export default SideLanguage;