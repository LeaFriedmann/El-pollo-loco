class Level {
    //#region properties
    levelConfig = {
        repetition : {
            chicken : 0,
            background : 0,
            clouds : 0
        },
        health : {
            chicken : 0,
            character : 0
        },
        speed : {
            chicken : 0
        }
    };
    levelNumber;
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    level_end_x;
    //#endregion

    // constructor(enemies_, clouds_, backgroundObjects_){
    //     this.enemies = enemies_;
    //     this.clouds = clouds_;
    //     this.backgroundObjects = backgroundObjects_;
    // }
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
        this.levelConfig.repetition.background = this.getBackgrRepeat(this.levelNumber);
        this.levelConfig.repetition.clouds = 6;

        this.levelConfig.health.chicken = 20;
        this.levelConfig.health.character = this.levelNumber + 100;

        this.levelConfig.speed.chicken = this.levelNumber / 10 + Math.random();
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
        this.level_end_x = (this.levelConfig.repetition.background * 719 * 2) -719 - 650;
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
    // push danach noch den endbuss in das arr
    addEnemies() {
        for (let i = 0; i < this.levelConfig.repetition.chicken; i++) {
            this.enemies.push(this.createChicken());
        }
        this.enemies.push(new Endboss(this.level_end_x));
    }

    // gibt instanz von Chicken zurück
    createChicken() {
        // speed und x koordinate übergeben
        return new Chicken(200 + Math.random() * this.level_end_x , this.levelConfig.speed.chicken);
    }

    // pusht je nach level andere anzahl an instanzen von Cloud in property clouds
    addClouds() {
        for (let i = 0; i < this.levelConfig.repetition.clouds; i++) {
            this.clouds.push(this.createCloud());
        }
    }

    // gibt instanz von Cloud zurück
    createCloud() {
        return new Cloud(Math.random() * this.level_end_x);
    }

    // gibt array mit instatnzen von backgroundObjekt zurück, um sie in constructur von Level bei instazierung einzufügen
    // als argument wird die häufigkeit übergeben, wie oft alle layer instanziert werden sollen
    // static addBackground(repeat){
    //     const backgrArr = [];
    //     for (let index = 0; index < repeat; index++) {
    //         ImgHub.BACKGROUND.ALL_LAYERS.forEach((part) => {
    //             const backgrPart = Level.addBackgrPart(part);
    //             backgrArr.push(backgrPart);
    //         })

    //     }

    //     return backgrArr;
    // }

    // gibt instanz von BackgrounfObject zurück, welche als argument das bild des entsprechenden parts nimmt
    // static addBackgrPart(part){
    //     const backgrPart = new BackgroundObject(part);
    //     return backgrPart;
    // }

    // static addEnemies(amount){
    //     const enemyArr = [];
    //     for (let index = 0; index < amount; index++) {
    //         const enemy = new Chicken();
    //         enemyArr.push(enemy);
    //     }
    //     enemyArr.push(new Endboss())

    //     return enemyArr;
    // }

    // static addClouds(amount){
    //     return Level.createObjArr(() => new Cloud(), amount);
    // }

    // static createObjArr(instance, amount){
    //     const objArr = [];
    //     for (let index = 0; index < amount; index++) {

    //         objArr.push(instance());
    //     }

    //     return objArr;
    // }

    //#endregion
}
