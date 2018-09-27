import * as React from 'react';
import LineBlock from './LineBlock';
import SquareBlock from './SquareBlock';
import SBlock from './SBlock';
import ZBlock from './ZBlock';
import JBlock from './JBlock';
import LBlock from './LBlock';
import TBlock from './TBlock';
import './App.css';
import Controls from './Controls';
import GameBoard from './GameBoard';
import Stats from './Stats';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        document.onkeydown = this.handleInput;
        this.state = { playing: false, gameStarted: false, grid: genGrid(), score: 0, prevClears: 0, player: 'Bob De Fault', nameFocus: false}
        this.shape = newShape()
    }

    update() {
        if (this.state.playing) {
            if (this.shape.frozen === true) { this.shape = newShape() }
            const score = this.state.score + 1;
            this.setState({score})
            this.updateGrid();
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.update(),
            200
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    redrawGrid() {
        const grid = [];

        // Updates all squares to their next colours
        this.state.grid.forEach((tile) => {
            if (this.shape.getTilePos().some((pos) => (pos.x === tile.x && pos.y === tile.y))) {
                grid.push({ x: tile.x, y: tile.y, fill: this.shape.frozen ? 2 : 1 })
            } else { grid.push({ x: tile.x, y: tile.y, fill: tile.fill === 1 ? 0 : tile.fill }) }
        });

        this.setState({ grid })
    }

    clearRows() {
        let fallRow = 20;
        let nFall = 1;
        let score = this.state.score;
        const prevClears = this.state.prevClears + 1;

        for (let i = 0; i < 20; i++) {
            if (this.state.grid.filter((tile) => tile.y === i).every((rowTile) => rowTile.fill === 2)) {
                fallRow === 20 ? fallRow = i : nFall++;
            }
        }

        if (fallRow < 20) {
            const grid = [];

            this.state.grid.filter((tile) => tile.y > 19 - nFall).map((tile) => ({ x: tile.x, y: tile.y, fill: 0 })).forEach((tile) => grid.push(tile))
            this.state.grid.filter((tile) => tile.y >= fallRow + nFall).map((tile) => ({ x: tile.x, y: tile.y - nFall, fill: tile.fill })).forEach((tile) => grid.push(tile))
            this.state.grid.filter((tile) => tile.y < fallRow).forEach((tile) => grid.push(tile))

            score += nFall * (nFall) * prevClears * 100;

            this.setState({ grid, score, prevClears })
        } else {
            this.setState({ prevClears: 0 })
        }
    }

    updateGrid() {
        if (this.collision(0, -1)) { this.shape.frozen = true }
        else { this.shape.fall() }

        // Check for gameover
        if (this.shape.frozen && this.shape.getTilePos().some((pos) => pos.y >= 20)) {
            this.setState({ playing: false, gameStarted: false });
        }

        this.redrawGrid();
        if (this.shape.frozen) { this.clearRows() }
    }

    collision = (x = 0, y = 0) => {
        let c = false;
        this.state.grid.forEach((tile) => {
            if (this.shape.getTilePos().some((pos) => pos.x + x > 9 || pos.x + x < 0 || pos.y + y < 0 || (tile.fill === 2 && pos.x + x === tile.x && pos.y + y === tile.y))) {
                c = true;
            }
        })
        return c;
    }

    handleInput(e) {
        e.preventDefault();

        if (document.getElementById('nameInput') === document.activeElement) {
            return;
        }

        if (e.keyCode === 83) {
            // Start a new game
            this.shape = newShape()
            this.setState({gameStarted: false})
            this.setState({ playing: true, gameStarted: true, grid: genGrid(), score: 0, prevClears: 0 })
            this.redrawGrid();
            return;
        } else if (e.keyCode === 80 && this.state.gameStarted) {
            // Pause the game
            const p = this.state.playing;
            this.setState({ playing: !p })
            return;
        }

        if (!this.state.playing) { return }

        if (e.keyCode === 37 && !this.collision(-1)) {
            this.shape.moveLeft();
        } else if (e.keyCode === 40 && !this.collision(0, -1)) {
            this.shape.fall();
        } else if (e.keyCode === 39 && !this.collision(1)) {
            this.shape.moveRight();
        } else if (e.keyCode === 38) {
            this.shape.rotateRight();
            // Try to rotate
            if (this.collision()) {
                if (!this.collision(-1)) { this.shape.moveLeft() }
                else if (!this.collision(1)) { this.shape.moveRight() }
                else this.shape.rotateLeft();
            }
        } else { return }

        this.redrawGrid();
    }

    render() {
        return (
            <div className="Play-area">
                <Controls />
                <GameBoard grid={this.state.grid} />
                <Stats score={this.state.score} gameStarted={this.state.gameStarted} />
            </div>
        )
    }
}

function newShape() {
    const n = Math.floor(Math.random() * 7);

    if (n === 0) {
        return new SquareBlock();
    } else if (n === 1) {
        return new LineBlock();
    } else if (n === 2) {
        return new SBlock();
    } else if (n === 3) {
        return new ZBlock();
    } else if (n === 4) {
        return new JBlock();
    } else if (n === 5) {
        return new LBlock();
    } else if (n === 6) {
        return new TBlock();
    } else {
        return new SquareBlock();
    }
}

function genGrid(rows = 20, cols = 10) {
    const g = [];

    for (let y = rows - 1; y >= 0; y--) {
        for (let x = 0; x < cols; x++) {
            g.push({ x, y, fill: 0 });
        }
    }

    return g;
}

export default Game