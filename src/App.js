import React, {Component} from 'react';
import TicTacToe from './containers/TicTacToe';
import GithubCorner from 'react-github-corner';
import {
    THEME_DARKEN,
} from './containers/StyleConstants';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TicTacToe/>
                <GithubCorner size={80} bannerColor={THEME_DARKEN} href="https://github.com/whjin/make-react-game"
                              target="_blank"/>
            </div>
        );
    }
}

export default App;
