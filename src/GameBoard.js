import * as React from 'react';
import Tile from './Tile';

function GameBoard(props) {
    const gridJsx = [];

    props.grid.forEach((tile) => {
        if (tile.x === 0) { gridJsx.push(<div />) }
        gridJsx.push(<Tile fill={tile.fill} />);
    });

    return (
        <div className='Game-center'>
            <div className='Game-board'>
                {gridJsx}
            </div>
        </div>
    )
}

export default GameBoard;