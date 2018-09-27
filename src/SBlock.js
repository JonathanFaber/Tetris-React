import Shape from './Shape'

class SBlock extends Shape {
    constructor() {
        super();
        this.rotations = [[{x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 1, y: 2}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0}],
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}],
        [{x: 0, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 0}]]
        this.tiles = this.rotations[this.rotation];
    }
}

export default SBlock;