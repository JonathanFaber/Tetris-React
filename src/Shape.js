class Shape {
    tiles;
    pos;
    frozen;
    rotations;

    constructor() {
        this.pos = {x: 4, y: 20};
        this.frozen = false;
        this.rotation = 0;
    }

    moveLeft(n = 1) {
        this.pos.x -= n;
    }

    moveRight(n = 1) {
        this.pos.x += n;
    }

    fall() {
        if (!this.frozen) {
            this.pos.y -= 1;
        }
    }

    getTilePos() {
        return this.tiles.map((tile) => ({x: tile.x + this.pos.x, y: tile.y + this.pos.y}))
    }

    rotateRight() {
        if (!this.frozen) {
            this.rotation++;
            this.tiles = this.rotations[this.rotation % 4]
        }
    }

    rotateLeft() {
        if (!this.frozen) {
            this.rotation--
            this.tiles = this.rotations[this.rotation % 4]
        }
    }
}

export default Shape;