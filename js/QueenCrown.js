
function QueenCrown() {
    this.img = CROWN_IMAGE;
    this.size = 50;
    this.x = 0;
    this.y = HEIGHT - this.size;
    this.highlight = false;
    
    this.draw = function() {
        if (this.highlight) {
            push();
            fill(255, 255, 0);
            noStroke();
            rect(this.x, this.y, this.size, this.size, 5);
            pop();
        }
        image(this.img, this.x, this.y, this.size, this.size);

    } 


    this.clicked = function() {
        if (this.x < mouseX && mouseX < this.x + this.size &&
            this.y < mouseY && mouseY < this.y + this.size) {
           this.highlight = true; 
        } else  
            this.highlight = false
    }
}
