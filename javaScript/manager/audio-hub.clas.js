class MyAudio {
    file;
    isLoaded = false;

    constructor(file_) {
        this.file = new Audio(file_);
    }
}

export class AudioHub {
    //#region properties
    static VOLUME = 0.2;

    static TOGGLE_SOUND = false;

    //#region audios
    static CHARACTER = {
        DAMAGE: new MyAudio("./sounds/character/characterDamage.mp3"),
        DEAD: new MyAudio("./sounds/character/characterDead.wav"),
        JUMP: new MyAudio("./sounds/character/characterJump.wav"),
        RUN: new MyAudio("./sounds/character/characterRun.mp3"),
        SNORING: new MyAudio("./sounds/character/characterSnoring.mp3"),
    };

    static CHICKEN = {
        DEAD: new MyAudio("./sounds/chicken/chickenDead.mp3"),
        DEAD2: new MyAudio("./sounds/chicken/chickenDead2.mp3"),
    };

    static COLLECT = {
        BOTTLE: new MyAudio("./sounds/collectibles/bottleCollectSound.wav"),
        COIN: new MyAudio("./sounds/collectibles/collectSound.wav"),
    };

    static ENDBOSS_APPROACH = new MyAudio("./sounds/endboss/endbossApproach.wav");

    static GAME_START = new MyAudio("./sounds/game/gameStart.mp3");

    static BOTTLE_BREAK = new MyAudio("./sounds/throwable/bottleBreak.mp3");

    static allSounds = [
        AudioHub.CHARACTER.DAMAGE,
        AudioHub.CHARACTER.DEAD,
        AudioHub.CHARACTER.JUMP,
        AudioHub.CHARACTER.RUN,
        AudioHub.CHARACTER.SNORING,
        AudioHub.CHICKEN.DEAD, 
        AudioHub.CHICKEN.DEAD2, 
        AudioHub.COLLECT.COIN, 
        AudioHub.COLLECT.BOTTLE, 
        AudioHub.ENDBOSS_APPROACH, 
        AudioHub.GAME_START, 
        AudioHub.BOTTLE_BREAK
    ];
    //#endregion
    //#endregion

    //#region methods

    // spielt eine sounddatei ab
    static playOne(sound) {
        sound.file.volume = AudioHub.VOLUME; // setzt Lautstärke auf static wert
        sound.file.currentTime = 0; // Startet ab bestimmter stelle (0= anfang, 5 = 5 sec)

        if (sound.file.readyState > 0 || sound.isLoaded) {
            sound.isLoaded = true; // für safari notwendeg, daher auch die klasse MyAudio
            sound.file.play(); // spielt übergebenes sound-objekt ab
        }
    }

    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause(); // pausiert alle audios in arrray
        });
        // TODO html element für lautstärke regler
        // document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2
    }

    // TODO in stop all nutzen
    static stopOne(sound) {
        sound.file.pause(); // Pausiert das übergebene Audio
    }

    static toggleSound() {
        AudioHub.TOGGLE_SOUND = !AudioHub.TOGGLE_SOUND;
        if (AudioHub.TOGGLE_SOUND) {
            AudioHub.VOLUME = 0.2;
        } else {
            AudioHub.VOLUME = 0;
        }
        AudioHub.allSounds.forEach((sound) => {
            sound.file.volume = AudioHub.VOLUME;
        });
    }
    //#endregion
}
