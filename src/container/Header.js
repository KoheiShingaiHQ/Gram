import React, { Component } from 'react';
import Nav from '../container/Nav.js';
import Search from '../container/Search.js';

const path = { list : "/start", detail : "/docs" };

class Header extends Component {
  clickMenu(e) {
    e.preventDefault();
    var header = document.getElementsByTagName('header')[0];
    header.classList.toggle('show-menu');
  }
  getObjectName(currentPath) {
    for (var i in path) {
      if (currentPath === path[i]) {
        return i;
      }
    }
  }
  clickSearch(e) {
    e.preventDefault();
    var main = document.getElementsByTagName('main')[0];
    main.classList.toggle('show-search');
    document.body.classList.toggle('show-search');
  }
  render() {
    return (
      <header>
        <div className="left">
          <svg className="menu" width="24px" height="24px" viewBox="0 0 24 24" onClick={this.clickMenu}>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
          <a href="#/"><h1>{this.props.title}</h1></a>
          <Nav></Nav>
          <svg data-selected={this.getObjectName("/" + window.location.hash.split("#").join("").split("/")[1]) || ""} className="search-button" height="24" viewBox="0 0 24 24" width="24" onClick={this.clickSearch}><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
        <div className="right"><Search></Search></div>
      </header>
    );
  }
}

export default Header;