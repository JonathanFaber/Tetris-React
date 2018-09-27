import Shape from "./Shape";

class SquareBlock extends Shape {
    constructor() {
        super();
        this.rotations = [[{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
        [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}]]
        this.tiles = this.rotations[this.rotation];
    }
}

export default SquareBlock;