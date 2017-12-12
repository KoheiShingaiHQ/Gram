import React, { Component } from 'react';
import SideRelatedContent from '../container/SideRelatedContent.js';
import { firebaseDb } from '../firebase/';
import ReactDOM from 'react-dom';

class SideRelated extends Component {
  initRelated(props) {
    var path = (props.id === "top") ? "top/" + props.language : "detail/" + props.id + "/" + props.language;
    var sideRelated = document.getElementById("related");
    if (sideRelated) {
    var related = firebaseDb.ref(path + "/side/related");
    var self = props;
    related.on('value', function(snapshot) {
      const val = snapshot.val();
      for (var i in val) {
        var data = val[i];
        var parent = document.createElement("li");
        parent.classList.add("side-related-content");
        parent.classList.add(self.language);
        sideRelated.appendChild(parent);
        var props = {
          title : data.split(":::")[0].split('-').join(' '),
          href : '#' + data.split(":::")[1],
          language : self.language,
          target : (data.indexOf('http') !== -1) ? '_blank' : ''
        };
        var child = React.createElement(SideRelatedContent, props);
        ReactDOM.render(child, parent);
      }
    });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.id) {
      this.initRelated(nextProps);
    }
  }
  componentDidMount() {
    this.initRelated(this.props);
  }
  render() {
    return (
      <section className={this.props.language}>
        <h2 className="en">Related</h2>
        <h2 className="ja">関連</h2>
        <ul id="related"></ul>
      </section>
    );
  }
}

export default SideRelated;