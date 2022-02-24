export default class Boundary {
    constructor(x, y, width, height) {
        this.left = x;
        this.top = y;
        this.right = x + width;
        this.bottom = y + height;
    }

    intersects(boundary2) {
        return this.right >= boundary2.left && this.left <= boundary2.right && this.top <= boundary2.bottom && this.bottom >= boundary2.top;
    }
}