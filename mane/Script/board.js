game.board = {
    game: game,
    size: 15,
    cells: [],
    create() {
        this.createCells();
    },
    createCells() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.cells.push(this.createCell(row, col));
            }
        }
    },
    createCell(row, col) {
        const cellSize = this.game.img.cell.width + 1;

        const offsetX = (this.game.width - cellSize * this.size) / 2;
        const offsetY = (this.game.height - cellSize * this.size) / 2;

        return {
            row: row,
            col: col,
            x: offsetX + cellSize * col,
            y: offsetY + cellSize * row
        }
    },
    render() {
        this.cells.forEach((cell) => {
            this.game.ctx.drawImage(this.game.img.cell, cell.x, cell.y);
        });
    }
};