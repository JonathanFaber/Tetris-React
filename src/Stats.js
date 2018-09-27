import * as React from 'react';

const defaultPlayer = 'Bob De Fault'

class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.addPlayer = this.addPlayer.bind(this)
        this.state = { highscore: 0, player: defaultPlayer, gameStarted: this.props.gameStarted}
        this.players = []

        /*
        var fs = require('fs');
        fs.readFile('leaderboard.json', (err, data) => {
            if (err) throw err;
            this.players.push(JSON.parse(data));
            this.players.sort((a, b) => a.score < b.score)
          });
        */
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.setState({ player: name === '' ? defaultPlayer : name})
    }

    addPlayer() {
        const ind = this.players.findIndex((p) => p.name === this.state.player)
        let newPlayers = [];

        if (ind >= 0 && this.props.score > this.players[ind].score) {
            newPlayers = this.players.filter((p, i) => i != ind)
            newPlayers.push({ name: this.state.player, score: this.props.score })
            this.players = newPlayers.sort((a, b) => b.score - a.score);
        } else if (ind === -1) {
            this.players.push({ name: this.state.player, score: this.props.score })
            this.players.sort((a, b) => b.score - a.score);
        }
        
    }

    render() {
        if (this.props.score > this.state.highscore) { this.setState({ highscore: this.props.score }) }

        if (this.props.gameStarted != this.state.gameStarted) {
            this.setState({ gameStarted: this.props.gameStarted })
            if (!this.props.gameStarted) {
                this.addPlayer();
            }
        }

        return (
            <div className='Game-right'>
                <text>
                    Player: {this.state.player}<br />
                    Score: {this.props.score}<br />
                    Highscore: {this.state.highscore} achieved by {this.players.length > 0 ? this.players[0].name : defaultPlayer} <br />
                    Enter your name: {' '}
                </text>
                <input type='text' id='nameInput' maxLength={16} onChange={this.handleNameChange}></input>
                <br/><br/>

                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.players.filter((p, i) => i < 10).map((p, i) => (
                        <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{p.name}</td>
                            <td>{p.score}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Stats;