import React, { Component } from 'react';
import { firebaseDb } from '../firebase/';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sugest : [],
      result : [],
      results : [],
      related : [],
      input : ""
    }
    this.changeSearchInput = this.changeSearchInput.bind(this);
  }
  componentDidMount() {
    localStorage.language = localStorage.language || 'english';
    var langStorage = localStorage.language.substring(0, 2);
    var searchResult = document.getElementById('search-result');
    searchResult.classList.add(langStorage);
    var sugest = [];
    var self = this;
    firebaseDb.ref("/search").once('value').then(function(snapshot) {
      const val = snapshot.val();
      for (var i in val) {
        sugest.push(i);
        self.setState({ sugest : sugest })
      }
    });
  }
  changeSearchInput(e) {
    this.setState({ result : [] });
    this.setState({ related : [] });
    this.setState({ results : [] });
    var self = this;
    var sugest = this.state.sugest || [];
    var word = document.getElementById('search-input').value;
    this.setState({ input : word });
    var searchResult = document.getElementById('search-result');
    if (word.length === 0) {
      sugest = [];
      if (window.localStorage["before_search"]) {
        window.location.hash = window.localStorage["before_search"].split("#/").join("");
        window.localStorage.removeItem("before_search");
      }
      searchResult.classList.remove("show");
    } else {
      searchResult.classList.add("show");
      if (!window.localStorage["before_search"]) {
        window.localStorage["before_search"] = window.location.hash;
      }
      window.location.hash = "#/article";
    }
    function showResult(key, result, related) {
      self.state.result.push(key);
      self.state.related.push(related);
      self.state.result = self.state.result.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
      self.setState({ 
        result : self.state.result,
        related : self.state.related
      });
       var results = [];
       var data = self.state.result;
       for(var i in data){
         var href = JSON.parse(localStorage["search_" + data[i]])["result"][0];
         results.push(
           <a key={data[i]} href={"#" + href} className="results">
             <h3>{data[i]}</h3>
             <p>{window.location.href.split("/article").join("") + href}</p>
           </a>        
         );
       }
      self.setState({ results : results });
    }
    function getResult(key, val) {
      for (var i in val) {
        if (i === "result") {
          showResult(key, val, key);
          break;
        }
        if (i === "to") {
          if (!window.localStorage["search_" + val[i]]) {
            var toVal = val[i];
            var search = firebaseDb.ref("/search/" + toVal);
            search.on('value', function(snapshot) {
              var val = snapshot.val();
              window.localStorage["search_" + toVal] = JSON.stringify(val);
              showResult(toVal, val, key);
            });
          } else {
            var result = JSON.parse(window.localStorage["search_" + val[i]]);
            showResult(val[i], result, key);
          }
          break;        
        }
      }
    }
    for (var i of sugest) {
      if (i.indexOf(word) !== -1) {
        if (!window.localStorage["search_" + i]) {
          var search = firebaseDb.ref("/search/" + i);
          search.on('value', function(snapshot) {
            var val = snapshot.val();
            window.localStorage["search_" + snapshot.ref.path.pieces_[1]] = JSON.stringify(val); 
            getResult(snapshot.ref.path.pieces_[1], val);
          });
        } else {
          var val = JSON.parse(window.localStorage["search_" + i]);
          getResult(i, val);
        }
      }
    }
  }
  render() {
    return (
      <section className="search">
        <svg width="24px" height="24px" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
        <input id="search-input" type="search" placeholder="Search" onChange={this.changeSearchInput} />
        <section id="search-result">
          <p className="en">{"Keyword : " + this.state.input}</p>
          <p className="ja">{"キーワード : " + this.state.input}</p>
          <p className="en">{"Sugested : " + Array.from(new Set(this.state.related)).join(", ")}</p>
          <p className="ja">{"候補 : " + Array.from(new Set(this.state.related)).join(", ")}</p>
          <p className="en">{"Result : " + this.state.result.length + " results"}</p>
          <p className="ja">{"結果 : " + this.state.result.length + " 件"}</p>
          <section id="result-output">{this.state.results}</section>
        </section>
      </section>
    );
  }
}

export default Nav;