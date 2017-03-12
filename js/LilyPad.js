
function LilyPad(index, groupObject, x, y, width, height, fillColor) {
    this.index = index;
    this.groupObject = groupObject;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.frogs = []
    this.frogSize = FROG_SIZE;
    this.selected = false;

    this.setFrogs = function(n) {
        for (var i = 0; i < n; i++) {
            this.frogs.push(new Frog(this.frogSize, this, i)); 
        }
    }

    this.draw = function() {
        push();
        fill((this.selected) ? color(100, 255, 100) : this.fillColor);
        ellipse(this.x, this.y, this.width, this.height);
        for (var i = 0; i < this.frogs.length; i++) {
            this.frogs[i].draw();
        }
        pop();
    }

    this.legalJump = function(other) {
        return  other.frogs.length > 0 &&
                !(other.frogs[other.frogs.length-1].isQueen) &&
                !(this.frogs[0].isLazy) &&
                Math.abs(this.index - other.index) == this.frogs.length;
    }

    this.clickedOn = function() {
        var d = dist(this.x, this.y, mouseX, mouseY);
        return 2 * d <= Math.max(this.width, this.height)
    }

    this.clicked = function() {
        if (this.clickedOn()) {
            var fromLily = this.groupObject.selected;
            if (fromLily && fromLily != this && fromLily.legalJump(this)) {
                for (var i = 0; i < fromLily.frogs.length; i++) {
                    var frog = fromLily.frogs[i];
                    frog.lilyPad = this;
                    frog.height = this.frogs.length;
                    this.frogs.push(frog);
                }
                fromLily.frogs = [];
                fromLily.selected = false;
                this.groupObject.selected = null;
            } else {
                this.selected = this.selected != true;
                if (this.groupObject.selected) this.groupObject.selected.selected = false;
                this.groupObject.selected = this.selected ? this : null;
            }
        }
    }

    this.makeQueenIfClicked = function() {
       if (this.clickedOn()) {
            this.frogs[this.frogs.length-1].makeQueen();
       } 
    }

    this.makeLazyIfClicked = function() {
       if (this.clickedOn()) {
            this.frogs[this.frogs.length-1].makeLazy();
       } 
    }

}
