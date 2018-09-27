import * as React from 'react';
import './Tile.css';

function Tile(props) {
    return (
        <canvas className={'tile ' + (props.fill === 0 ? 'empty-tile' : props.fill === 1 ? 'shape-tile' : 'fill-tile')} />
    )
}

export default Tile;