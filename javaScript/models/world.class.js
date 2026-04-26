class World {
    //#region properties
    character = new Character();
    level = level1;
    canvas;
    ctx;
    statusbar = new StatusBar();
    static CAMERA_X = 0;

    //#endregion

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
        IntervalHub.startInterval(this.checkCollisions, 200);
    }

    //#region methods

    // checkt für jeden enemy ob kollision mit character
    checkCollisions = () => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy)
                console.log(this.character.energy);
            }
        });
    };

    draw() {
        // canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // erster wert x achse, zweiter wert y achse
        this.ctx.translate(World.CAMERA_X, 0);

        // objekte hinzufügen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-World.CAMERA_X, 0);
        this.addToMap(this.statusbar);
        this.ctx.translate(World.CAMERA_X, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-World.CAMERA_X, 0);

        requestAnimationFrame(() => this.draw()); // draw wird immer wieder aufgerufen
    }

    // for each durch array von img der objekte
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    // zeigt objekte auf canvas an
    // dreht objekt bei laufen in andere richtung
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        // gemeint ist draw methode in movable object class
        mo.draw(this.ctx);

        // mo.drawFrame(this.ctx);

        
            // mo.getFrameValues();
        
        // mo.drawRealFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    //#endregion
}
