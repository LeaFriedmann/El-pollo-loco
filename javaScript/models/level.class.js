import { ImgHub } from "../manager/imgHub.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { Endboss } from "./endboss.class.js";
import { SmallChicken } from "./small-chicken.class.js";

export class Level {
    //#region properties
    levelConfig = {
        repetition : {
            chicken : 0,
            smallChicken : 0,
            background : 0,
            clouds : 0
        },
        health : {
            chicken : 0,
            character : 0
        },
        speed : {
            chicken : 0, 
            smallChicken : 0
        }
    };
    levelNumber;
    clouds = [];
    backgroundObjects = [];
    static enemies = [];
    static endboss;
    static END_X;
    static ThrowableObjects = [];

    //#endregion
    
    constructor(levelNumber_) {
        this.levelNumber = levelNumber_;
        this.setLevelConfig();
        this.getLevelEnd();
        console.log(this.levelConfig.repetition.background)
        console.log(this.levelConfig);
        
        this.addBackground();
        this.addClouds();
        this.addEnemies();
    }

    //#region methods

    setLevelConfig() {
        this.levelConfig.repetition.chicken = this.levelNumber + 4;
        this.levelConfig.repetition.smallChicken = this.levelNumber + 5;
        this.levelConfig.repetition.background = this.getBackgrRepeat(this.levelNumber);
        this.levelConfig.repetition.clouds = 6;

        this.levelConfig.health.chicken = 20;
        this.levelConfig.health.character = this.levelNumber + 100;

        this.levelConfig.speed.chicken = this.levelNumber / 10 + Math.random();
        this.levelConfig.speed.smallChicken = this.levelNumber / 5 + Math.random();
    }

    // länge hintergrund anpassung nach level
    getBackgrRepeat(levelNr) {
        if (levelNr < 4) {
            return 2;
        }
        if (levelNr < 10) {
            return 3;
        }
        if (levelNr < 15) {
            return 4;
        }
        if (levelNr < 20) {
            return 5;
        } else {
            return 6;
        }
    }

    // weist x koordinate zu, bis zu welcher character laufen kann
    getLevelEnd(){
        Level.END_X = (this.levelConfig.repetition.background * 719 * 2) -719 - 650;
    }

    // iteriert durch arr mit allen hintergrund layern und pusht instanzen von BackgroundObject
    // in property backgroundObjects 
    addBackground() {
        for (let index = 0; index < this.levelConfig.repetition.background; index++) {
            ImgHub.BACKGROUND.ALL_LAYERS.forEach((part) => {
                this.backgroundObjects.push(this.addBackgrPart(part));
            });
        }
    }

    // gibt instanz von Backgroundobject zurück, welcher ein teil des Hintergrunds übergeben wird
    addBackgrPart(part) {
        return new BackgroundObject(part);
    }

    // pusht je nach level andere anzahl an instanzen von Chicken in property enemies
    // instanziert Endboss und weist instanz property endboss zu
    addEnemies() {
        for (let i = 0; i < this.levelConfig.repetition.chicken; i++) {
            Level.enemies.push(this.createChicken());
        };
        for (let i = 0; i < this.levelConfig.repetition.smallChicken; i++) {
            Level.enemies.push(this.createSmallChicken());
        }
        const endboss = new Endboss(Level.END_X);
        Level.endboss = endboss;
        Level.enemies.push(endboss);
    }

    // gibt instanz von Chicken zurück
    createChicken() {
        // speed und x koordinate übergeben
        return new Chicken(300 + Math.random() * Level.END_X , this.levelConfig.speed.chicken);
    }

    createSmallChicken(){
        return new SmallChicken(300 + Math.random() * Level.END_X, this.levelConfig.speed.smallChicken)
    }

    // pusht je nach level andere anzahl an instanzen von Cloud in property clouds
    addClouds() {
        for (let i = 0; i < this.levelConfig.repetition.clouds; i++) {
            this.clouds.push(this.createCloud());
        }
    }

    // gibt instanz von Cloud zurück
    createCloud() {
        return new Cloud(Math.random() * Level.END_X);
    }

    //#endregion
}
