import React, { Component } from 'react';
import { getCurrentPath } from '../container/Util.js';

const path = { list : "/start", detail : "/docs" };

class Footer extends Component {
  getObjectName(currentPath) {
    for (var i in path) {
      if (currentPath === path[i]) {
        return i;
      }
    }
  }
  render() {
    return (
      <footer data-selected={this.getObjectName("/" + getCurrentPath().split("/")[1]) || ""}>
        <section>
          <section>  
            <div className="links">
              <ul>
                <a href="https://github.com/KoheiShingaiHQ/cmsy" target="_blank" rel="noopener noreferrer">
                  <li>
                    <svg aria-hidden="true" className="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24">
                      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </li>
                </a>
                <a href="https://twitter.com/CmsYourself" target="_blank" rel="noopener noreferrer">
                  <li>
                    <svg id="social-twitter" viewBox="0 0 18 18" width="100%" height="100%">
                      <path d="M16.5,4.3c-0.6,0.2-1.1,0.4-1.8,0.5c0.6-0.4,1.1-1,1.4-1.7c-0.6,0.4-1.3,0.6-2,0.8c-0.6-0.6-1.4-1-2.2-1 c-1.7,0-3.1,1.4-3.1,3.1c0,0.2,0,0.5,0.1,0.7C6.3,6.5,4.1,5.3,2.5,3.4C2.3,3.9,2.1,4.4,2.1,5c0,1.1,0.5,2,1.4,2.6 c-0.5,0-1-0.2-1.4-0.4c0,0,0,0,0,0c0,1.5,1.1,2.8,2.5,3.1c-0.3,0.1-0.5,0.1-0.8,0.1c-0.2,0-0.4,0-0.6-0.1c0.4,1.2,1.5,2.1,2.9,2.2 c-1.1,0.8-2.4,1.3-3.8,1.3c-0.2,0-0.5,0-0.7,0c1.4,0.9,3,1.4,4.7,1.4c5.7,0,8.8-4.7,8.8-8.9c0-0.1,0-0.3,0-0.4 C15.6,5.5,16.1,4.9,16.5,4.3"></path>
                    </svg>
                  </li>
                </a>
                <a href="https://www.youtube.com/channel/UCJscf7SB0yT7pa5wsGcf4rg" target="_blank" rel="noopener noreferrer">
                  <li>
                    <svg id="social-youtube" viewBox="0 0 18 18" width="100%" height="100%">
                      <path d="M7.2,11.6V6.4L12,9.1L7.2,11.6z M17.8,5.3c0,0-0.2-1.2-0.7-1.8c-0.7-0.7-1.4-0.7-1.8-0.8C12.8,2.6,9,2.6,9,2.6 s-3.8,0-6.3,0.2c-0.3,0-1.1,0-1.8,0.8C0.4,4.1,0.2,5.3,0.2,5.3S0,6.8,0,8.2v1.5c0,1.5,0.2,2.9,0.2,2.9s0.2,1.2,0.7,1.8 c0.7,0.7,1.6,0.7,2,0.8c1.4,0.1,5.9,0.2,6.1,0.2c0,0,3.8,0,6.3-0.2c0.3,0,1.1,0,1.8-0.8c0.5-0.5,0.7-1.8,0.7-1.8S18,11.2,18,9.8V8.2 C18,6.8,17.8,5.3,17.8,5.3z"></path>
                    </svg>
                  </li>
                </a>
              </ul>
            </div>
          </section>
        </section>
      </footer>
    );
  }
}

export default Footer;