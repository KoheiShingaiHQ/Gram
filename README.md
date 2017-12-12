# Customizing Create React App : *Routing*

## Routing on Create React App
Getting started customizing `polyreact` .

### Edit js file : *index.js*
```diff
# File path : ~/polyreact/src/index.js
- ReactDOM.render(<App />, document.getElementById('root'));
+ ReactDOM.render(
+   <Provider store={store}>
+     <ConnectedRouter history={history}>
+       <div>
+         <App />
+       </div>
+     </ConnectedRouter>
+   </Provider>,
+ document.getElementById('root'));
```

### Create directory and js file : *container*
```bash
# Current path : ~/polyreact/src
mkdir container
```

```js
// File path : ~/polyreact/src/container/featured.js
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

class Featured extends Component {
  render() {
    return (
      <p>Featured</p>
    );
  }
}

export default Featured;
```

```js
// File path : ~/polyreact/src/container/About.js
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

class About extends Component {
  render() {
    return (
      <p>About</p>
    );
  }
}

export default About;
```

```js
// File path : ~/polyreact/src/container/Article.js
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

class Article extends Component {
  render() {
    return (
      <p>Article</p>
    );
  }
}

export default Article;
```

### Edit js file : *App.js*
```diff
# File path : ~/polyreact/src/app.js
+ import Featured from './container/Featured.js';
+ import About from './container/About.js';
+ import Article from './container/Article.js';
  import logo from './logo.svg';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
+         <Link to="/"><p>Featured</p></Link>
+         <Link to="/about"><p>About</p></Link>
+         <Link to="/article"><p>Article</p></Link>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
+         <Route exact path="/" component={Featured} />
+         <Route exact path="/about" component={About} />
+         <Route exact path="/article" component={Article} />
```

→ Open http://localhost:3000 to see `polyreact` .

> Demo : [koheishingaiHQ.github.io/routing-on-create-react-app](https://koheishingaihq.github.io/routing-on-create-react-app)

![routing-on-crate-react-app-screen-shot](https://c1.staticflickr.com/5/4497/36880247443_0c716eb73c_b.jpg)