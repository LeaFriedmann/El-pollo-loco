import { ImgHub } from "../manager/imgHub.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { CollectableObject } from "./collectable-object.class.js";
import { Endboss } from "./endboss.class.js";
import { NormalChicken } from "./normal-chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";


export class Level {
    //#region properties
    levelConfig = {
        repetition : {
            chicken : 0,
            smallChicken : 0,
            background : 0,
            clouds : 0, 
            coins : 0,
            collectableBottle : 0
        },
        health : {
            chicken : 0,
            character : 0
        },
        speed : {
            chicken : 0, 
            smallChicken : 0, 
            endboss : 0
        }, 
        healthReduction : {
            endboss : 0
        }
    };
    levelNumber;
    clouds = [];
    backgroundObjects = [];
    static enemies = [];
    static endboss;
    static END_X;
    static ThrowableObjects = [];
    static collectableObj = [];

    //#endregion
    
    constructor(levelNumber_) {
        this.levelNumber = levelNumber_;
        this.setLevelConfig();
        this.getLevelEnd();      
        this.addBackground();
        this.addClouds();
        this.addEnemies();
        this.addCollectables();
    }

    //#region methods

    setLevelConfig() {
        this.levelConfig.repetition.chicken = this.levelNumber + 4;
        this.levelConfig.repetition.smallChicken = this.levelNumber + 5;
        this.levelConfig.repetition.background = this.getBackgrRepeat(this.levelNumber);
        this.levelConfig.repetition.clouds = 6;
        this.levelConfig.repetition.collectableBottle = this.collectBottleNr(this.levelNumber);

        this.levelConfig.health.chicken = 20;
        this.levelConfig.health.character = this.levelNumber + 100;

        this.levelConfig.speed.chicken = this.levelNumber / 10 + Math.random();
        this.levelConfig.speed.smallChicken = this.levelNumber / 5 + Math.random();
        this.levelConfig.speed.endboss = this.levelNumber / 10 + Math.random();

        this.levelConfig.healthReduction.endboss = this.healthReductEndboss(this.levelNumber);
    }

    // länge hintergrund anpassung nach level
    getBackgrRepeat(levelNr) {
        if (levelNr < 6) {
            return 2;
        }
        if (levelNr < 11) {
            return 3;
        }
        if (levelNr < 16) {
            return 4;
        }
        if (levelNr < 21) {
            return 5;
        } else {
            return 6;
        }
    }

    collectBottleNr(levelNr){
        if (levelNr < 6) {
            return 11 - levelNr;
        } else if (levelNr < 11) {
            return 22 - levelNr;
        } else if (levelNr < 16) {
            return 26 - levelNr;
        } else if (levelNr < 21) {
            return 30 - levelNr;
        } else {
            return 10;
        }
    }

    healthReductEndboss(levelNr){
        if (levelNr < 6) {
            return 20;
        } else {
            return 10;
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
        const endboss = new Endboss(Level.END_X, this.levelConfig.speed.endboss, this.levelConfig.healthReduction.endboss);
        Level.endboss = endboss;
        Level.enemies.push(endboss);
    }

    // gibt instanz von Chicken zurück
    createChicken() {
        // speed und x koordinate übergeben
        return new NormalChicken(300 + Math.random() * Level.END_X , this.levelConfig.speed.chicken);
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
        return new Cloud();
    }

    // pusht instanzen von sammelbaren flaschen in collectableObj array
    addCollectables(){
        CollectableObject.gap = (Level.END_X - 400) / this.levelConfig.repetition.collectableBottle;
        for (let index = 0; index < this.levelConfig.repetition.collectableBottle; index++) {
            Level.collectableObj.push(this.createBottle());            
        }
    }

    // gibt instanz von CollectableObject zurück, in dem fall für Flaschen
    createBottle(){
        return new CollectableObject(70, 50, ImgHub.BOTTLE.NORMAL[0]);
    }

    //#endregion
}
