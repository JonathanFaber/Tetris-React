import * as React from 'react';
import './App.css';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div className="App" id='app'>
        <header className="App-header">
          <h1 className="App-title">Tetris in React!</h1>
        </header>
        <div className="Play-area">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
