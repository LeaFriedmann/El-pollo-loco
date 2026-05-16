class MyAudio {
    file;
    isLoaded = false;
    isPlaying = false;
    changeVol = 0;

    constructor(file_, playbackRate_, changeVol_) {
        this.file = new Audio(file_);
        this.file.playbackRate = playbackRate_;
        this.changeVol = changeVol_;
    }
}

export class AudioHub {
    //#region properties
    static VOLUME = 0.2;

    static TOGGLE_SOUND = true;

    //#region audios
    static CHARACTER = {
        DAMAGE: new MyAudio("./sounds/character/characterDamage.mp3", 1, 0),
        DEAD: new MyAudio("./sounds/character/characterDead.wav", 1, 0),
        JUMP: new MyAudio("./sounds/character/characterJump.wav", 1, 0),
        RUN: new MyAudio("./sounds/character/characterRun.mp3", 1.5, 0),
        SNORING: new MyAudio("./sounds/character/characterSnoring.mp3", 1, 0),
    };

    static CHICKEN = {
        DEAD: new MyAudio("./sounds/chicken/chickenDead.mp3", 1, 0),
        DEAD2: new MyAudio("./sounds/chicken/chickenDead2.mp3", 1, 0),
    };

    static COLLECT = {
        BOTTLE: new MyAudio("./sounds/collectibles/bottleCollectSound.wav", 1, 0),
        COIN: new MyAudio("./sounds/collectibles/collectSound.wav", 1, 0),
    };

    static ENDBOSS_APPROACH = new MyAudio("./sounds/endboss/endbossApproach.wav", 1, 0.8);

    static GAME_START = new MyAudio("./sounds/game/gameStart.mp3", 1, 0);

    static BOTTLE_BREAK = new MyAudio("./sounds/throwable/bottleBreak.mp3", 1, 0);

    static BACKGROUND_MUSIC = new MyAudio("./sounds/background-music/background-music.mp3", 1, -0.15);

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
        AudioHub.BOTTLE_BREAK,
        this.BACKGROUND_MUSIC,
    ];
    //#endregion
    //#endregion

    //#region methods

    //#region play and stop
    // spielt eine sounddatei ab
    static playOne(sound) {
        sound.isPlaying = true;
        sound.file.currentTime = 0; // Startet ab bestimmter stelle (0= anfang, 5 = 5 sec)

        if (AudioHub.TOGGLE_SOUND) {
            sound.file.volume = AudioHub.VOLUME + sound.changeVol; // setzt Lautstärke auf static wert + extra Lautstärke je nach sound
        } else if (!AudioHub.TOGGLE_SOUND) {
            sound.file.volume = AudioHub.VOLUME;
        }

        if (sound.file.readyState > 0 || sound.isLoaded) {
            sound.isLoaded = true; // für safari notwendeg, daher auch die klasse MyAudio
            sound.file.play(); // spielt übergebenes sound-objekt ab
        }
    }

    static stopAll() {
        AudioHub.allSounds.forEach((sound) => {
            sound.file.pause(); // pausiert alle audios in arrray
            sound.isPlaying = false;
        });
    }

    static stopOne(sound) {
        sound.file.pause(); // Pausiert das übergebene Audio
        sound.isPlaying = false;
    }

    static toggleSound() {
        AudioHub.TOGGLE_SOUND = !AudioHub.TOGGLE_SOUND;
        if (AudioHub.TOGGLE_SOUND) {
            AudioHub.VOLUME = 0.2;

            AudioHub.allSounds.forEach((sound) => {
                sound.file.volume = AudioHub.VOLUME + sound.changeVol;
            });
        } else {
            AudioHub.VOLUME = 0;

            AudioHub.allSounds.forEach((sound) => {
                sound.file.volume = AudioHub.VOLUME;
            });
        }
        AudioHub.toLoclStrg();
    }
    //#endregion

    //#region local storage
    static toLoclStrg() {
        localStorage.setItem("TOGGLE_SOUND", JSON.stringify(AudioHub.TOGGLE_SOUND));
    }

    static getFromLocl() {
        const backFrLocal = JSON.parse(localStorage.getItem("TOGGLE_SOUND"));

        if (backFrLocal != null) {
            AudioHub.TOGGLE_SOUND = backFrLocal;
            console.log("from local");
        } else {
            AudioHub.TOGGLE_SOUND = AudioHub.TOGGLE_SOUND;
            console.log("not");
        }
    }
    //#endregion
    //#endregion
}
