
function Frog(size, lilyPad, height) {
    this.size = lilyPad.frogSize;
    this.lilyPad = lilyPad;
    this.height = height;
    this.img = FROG_IMAGE;
    this.isQueen = false;
    
    this.draw = function() {
        image(this.img, this.lilyPad.x - this.size/2, 
             this.lilyPad.y - (0.8*this.height+1) * this.size, this.size, this.size);
    } 


    this.makeQueen = function() {
        this.isQueen = true;
        this.img = QUEEN_IMAGE;
    }
}

