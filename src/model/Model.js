//keeping until I know how I will make moves (maybe don't use arrow?)
export class MoveType{
    constructor(dr, dc){
        this.deltar = dr;
        this.deltac = dc; 
    }

    static parse(s) {
        if ((s === "down")  || (s === "Down"))   { return Down; }
        if ((s === "up")    || (s === "Up"))     { return Up; }
        if ((s === "left")  || (s === "Left"))   { return Left; }
        if ((s === "right") || (s === "Right"))  { return Right; }
        
        return NoMove;
    }
}

export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");  // no move is possible

export class Coordinate{
    constructor(row, column){
        this.row = row; 
        this.column = column; 
    }
}

export class Piece {
    constructor(w, h, label, initial, color) {
        this.width = w;
        this.height = h;
        this.label = label; 
        this.initial = initial; 
        this.color = color; 
        //this.isWinner = isWinner;
        this.row = 0;
        this.column = 0;
        
    }

    place(row, col) {
        this.row = row;
        this.column = col;
    }

    move(direction) {
        this.row += direction.deltar;
        this.column += direction.deltac;
    }

    extendColor(color, direction){
        this.color = color; 
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    copy() {
        let p = new Piece(this.width, this.height, this.label, this.initial, this.color); //changed from iswinner
        p.place(this.row, this.column);
        return p;
    }

    *coordinates() {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                yield new Coordinate(this.row + r, this.column + c);
            } 
        }
    }

    *colors(){
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                yield new Coordinate(this.row + r, this.column + c);
            } 
        }
    }

    // containsWhite(coord){
    //     Piece

    // }
    contains(coord) {
        let cs = [...this.coordinates()];   // javascript one liner.... turn all of those yield into a list.
        for (let c of cs) {
            if (c.row === coord.row && c.column === coord.column) { 
                return true;
                //neighbor = new Piece(this.width, this.height, this.label, this.initial, this.color); 
                
            } 
        }
        
        return false;
    }

    

    // *blocks(){
    //     for (let i=0; i<this.pieces.length; i++){
    //         yield this.pieces[i]
    //     }
    // }
}

export class Puzzle {
    
    constructor(numRows, numColumns, destination, finalMove) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.destination = destination;
        this.finalMove = finalMove;
        this.selected = null;
    }

    initialize(pieces) {
        // make sure to create NEW Piece objects
        this.pieces = pieces.map(p => p.copy());
    }

    select(piece) {
        this.selected = piece;
    }

    isSelected(piece) {
        return piece === this.selected;
    }

    findNeighbor(row, col){
        for(let square in this.puzzle.locations){
            console.log(square)
            if(row === square.row){
                if(col === square.column){
                    console.log(square)
                    return square
                }
            }
        }

    }
    
    isCovered(coord) { //find neighbors for now check if white
        let idx = this.pieces.findIndex(piece => piece.contains(coord));
        // if we found a piece that covers coordinate, return true; otherwise false.
        console.log(idx)
        return idx >= 0; 
    }
    
    availableMoves() {
        let p = this.selected;
        if (p == null) { return []; }
        
        let moves = [];
        let coord = this.selected.location();
        
        // can extend left?
        let available = false;
        if (coord.column > 0) {
            available = true;

            let neighbor = this.puzzle.findNeighbor(p.row, p.column - 1);
            if (neighbor.color === "white"){
                available = true
            }
            else {
                available = false
            }
        }

        if (available) {
            moves.push(Left);
        }
        
        // // can move right?
        // available = false;
        // if (coord.column + p.width < this.numColumns) {
        //     available = true;
        //     for (let r = 0; r < p.height; r++) {
        //         if (this.isCovered(new Coordinate(coord.row + r, coord.column + p.width))) {
        //             available = false;
        //             break;
        //         }
        //     }
        // }
        // if (available) { 
        //     moves.push(Right); 
        // }
        
        // // can move up?
        // available = false;
        // if (coord.row > 0) {
        //     available = true;
        //     for (let c = 0; c < p.width; c++) {
        //         if (this.isCovered(new Coordinate(coord.row - 1, coord.column + c))) {
        //             available = false;
        //             break;
        //         }
        //     }
        //     if (available) { 
        //         moves.push(Up); 
        //     }
        // }
        
        // // can move down?
        // available = false;
        // if (coord.row + p.height < this.numRows) {
        //     available = true;
        //     for (let c = 0; c < p.width; c++) {
        //         if (this.isCovered(new Coordinate(coord.row + p.height, coord.column + c))) {
        //             available = false;
        //             break;
        //         }
        //     }
        //     if (available) { 
        //         moves.push(Down); 
        //     }
        // }
        
        return moves;
    }

    clone() {
        let copy = new Puzzle(this.numRows, this.numColumns, this.destination, this.finalMove);
        copy.pieces = [];
        for (let p of this.pieces) {
            let dup = p.copy();
            copy.pieces.push(dup);
            if (p === this.selected) {
                copy.selected = dup;
            }
        }
        
        return copy;
    }

}

export default class Model {
    // info is going to be JSON-encoded puzzle
    constructor(info) {
        this.initialize(info);
        this.info = info;
    }

    initialize(info){
        let numRows = parseInt(info.board.rows);
        let numColumns = parseInt(info.board.columns);
        let destination = new Coordinate(parseInt(info.board.destination.row), parseInt(info.board.destination.column))
        let finalMove = MoveType.parse(info.board.finalMove);

        var allPieces = [];
        for (let p of info.pieces) {
            allPieces.push(new Piece(parseInt(p.width), parseInt(p.height), p.label, (p.initial === 'true'),p.color )); //changed from is winner
        }

        for (let loc of info.locations) {
            let coord = new Coordinate (parseInt(loc.location.row), parseInt(loc.location.column));
            
            let idx = allPieces.findIndex(piece => (piece.label === loc.piece));
            allPieces[idx].place(coord.row, coord.column);
        }

        this.puzzle = new Puzzle(numRows, numColumns, destination, finalMove)
        this.puzzle.initialize(allPieces);
        this.numMoves = 0; 
        this.victory = false; 
        this.showLabels = false;
    }

    copy(){
        let m = new Model(this.info); 
        m.puzzle = this.puzzle.clone(); 
        m.numMoves = this.numMoves; 
        m.showLabels = this.showLabels;
        m.victory = this.victory; 
        return m; 
    }

    updateMoveCount(delta) {
        this.numMoves += delta;
    }

    numberMoves() {
        return this.numMoves;
    }

    available(direction) {
        // if no piece selected? Then none are available.
        if (!this.puzzle.selected) { return false; }
        if (direction === NoMove) { return false; }
        
        // // HANDLE WINNING CONDITION. MUST BE AVAILABLE!
        // if (this.puzzle.selected.isWinner && 
        //     this.puzzle.selected.row === this.puzzle.destination.row && 
        //     this.puzzle.selected.column === this.puzzle.destination.column && 
        //     this.puzzle.finalMove === direction) {
        //     return true;
        // }

        let allMoves = this.puzzle.availableMoves();
        return allMoves.includes(direction);
    }
        
}