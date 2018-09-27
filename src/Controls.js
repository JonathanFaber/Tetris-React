import * as React from 'react';

function Controls() {
    return (
        <div className='Game-left'>
            <h1>Controls</h1>
            <div className='Buttons'>
                <text>
                    S:<br />
                    P:<br />
                    Up arrow key:<br />
                    Left arrow key:<br />
                    Right arrow key:<br />
                    Down arrow key:
                      </text>
            </div>
            <div className='Instructions'>
                <text>
                    Starts a new game<br />
                    Pauses the current game<br />
                    Rotates the block clockwise
                    Moves the block left<br />
                    Moves the block right<br />
                    Moves the block down<br />
                </text>
            </div>
        </div>
    )
}

export default Controls