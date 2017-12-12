import React, { Component } from 'react';
import { hideMenu, setFooterOpacity, getCurrentPath, setScrollStatus } from '../container/Util.js';
import ContentPanel from '../container/ContentPanel.js';
import SidePanel from '../container/SidePanel.js';
import ReactDOM from 'react-dom';

const path = { list : "/start", detail : "/docs" };

class Article extends Component {
  constructor(props) {
    super(props);
  }
  updateArticle(id) {
    var articleTag = document.getElementById("article");
    if (articleTag) {
      articleTag.innerHTML = "";
      var contentTag = document.createElement("div");
      var sideTag = document.createElement("div");
      contentTag.id = "content-tag";
      sideTag.id = "side-tag";
      articleTag.appendChild(contentTag);
      articleTag.appendChild(sideTag);
      const content = React.createElement(ContentPanel, {id : id});
      const side = React.createElement(SidePanel, {id : id});
      ReactDOM.render(content, contentTag);
      ReactDOM.render(side, sideTag);
    }
  }
  initArticle(props) {
    this.updateArticle(props.match.params.id || "top");
    var self = this;
    window.addEventListener("hashchange", function(){
      var id = getCurrentPath().split(path.detail).join("");
      id = id.split("/").join("");
      if (!window.id || window.id !== id) {
        window.id = id;
        self.updateArticle(id || "top");
        hideMenu();
        setScrollStatus();
      }
    }, false);
  }
  componentDidMount() {
    hideMenu();
    setFooterOpacity(1);
    this.initArticle(this.props);
  }
  render() {
    return ( <main id="article"></main> );
  }
}

export default Article;