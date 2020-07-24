import React from 'react';
import './App.css';
import Body from './components/body'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from "history";
// import createHistory from "history/createBrowserHistory";

const history = createBrowserHistory()
// const history = createHistory.createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history = {history}>
        <Body history ={history}/>
      </Router>
    )
  }
}

export default App;
