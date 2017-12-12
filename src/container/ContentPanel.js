import React, { Component } from 'react';
import ArticleHeader from '../container/ArticleHeader.js';
import ContentTimeline from '../container/ContentTimeline.js';
import ContentGithub from '../container/ContentGithub.js';
import ContentTop from '../container/ContentTop.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

const components = {
  "timeline" : ContentTimeline,
  "github" : ContentGithub,
  "top" : ContentTop
};

class ContentPanel extends Component {
  initContent(id) {
    var path = (id === "top") ? "top" : "detail/" + id;
    localStorage.language = localStorage.language || "english";
    var language = localStorage.language.substring(0, 2);
    var panelTag = document.getElementById("content-panel");
    const docs = firebaseDb.ref(path + "/" + language);
    docs.on('value', function(snapshot) {
      const val = snapshot.val();
      if (val) {
      var headerTag = document.createElement("section");
      headerTag.id = "article-header";
      headerTag.classList.add(language);
      panelTag.innerHTML = "";
      panelTag.appendChild(headerTag);
      const header = React.createElement(ArticleHeader, {
        language : language,
        title : val.title
      });
      ReactDOM.render(header, headerTag);
      var contentTag = "";
      if (id === "top") {
        contentTag = document.createElement("div");
        panelTag.appendChild(contentTag);
        const content = React.createElement(components[val.type], { language : language, data : val.full });
        ReactDOM.render(content, contentTag);
      } else {
        for (var i in val.content) {
          contentTag = document.createElement("section");
          const data = val.content[i];
          contentTag.id = "content-" + (data.article || data.revision || data.file || data.project);
          panelTag.appendChild(contentTag);
          var props = {};
          for (var j in data) {
            props[j] = data[j];
            props["id"] = contentTag.id;
            props["language"] = language;
          }
          var content = React.createElement(components[data.type], props);
          ReactDOM.render(content, contentTag);
        }
      }
      }
      document.getElementsByTagName("footer")[0].style.display = "block";
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.id) {
      this.initContent(nextProps.id);
    }
  }
  componentDidMount() {
    document.getElementsByTagName("footer")[0].style.display = "none";
    this.initContent(this.props.id);
  }
  render() {
    return ( <article id="content-panel"></article> );
  }
}

export default ContentPanel;