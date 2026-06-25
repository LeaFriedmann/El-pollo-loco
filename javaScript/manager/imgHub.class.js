/**
 * Provides a centralized registry of all image asset paths used in the game.
 */
export class ImgHub {
    static PEPE = {
        IDLE: [
            "./img/character-fox/idle/idle 1.png",
            "./img/character-fox/idle/idle 2.png",
            "./img/character-fox/idle/idle 3.png",
            "./img/character-fox/idle/idle 4.png",
            "./img/character-fox/idle/idle 5.png",
            "./img/character-fox/idle/idle 6.png",
            "./img/character-fox/idle/idle 7.png",
            "./img/character-fox/idle/idle 8.png",
            "./img/character-fox/idle/idle 9.png",
            "./img/character-fox/idle/idle 10.png",
        ],
        SLEEPING: [
            "./img/character-fox/sleep/sleep 1.png",
            "./img/character-fox/sleep/sleep 2.png",
            "./img/character-fox/sleep/sleep 3.png",
            "./img/character-fox/sleep/sleep 4.png",
            "./img/character-fox/sleep/sleep 5.png",
            "./img/character-fox/sleep/sleep 6.png",
            "./img/character-fox/sleep/sleep 7.png",
            "./img/character-fox/sleep/sleep 8.png",
            "./img/character-fox/sleep/sleep 9.png",
            "./img/character-fox/sleep/sleep 10.png",
        ],
        WALK: [
            "./img/character-fox/walk/Run 1.png",
            "./img/character-fox/walk/Run 2.png",
            "./img/character-fox/walk/Run 3.png",
            "./img/character-fox/walk/Run 4.png",
            "./img/character-fox/walk/Run 5.png",
            "./img/character-fox/walk/Run 6.png",
            "./img/character-fox/walk/Run 7.png",
            "./img/character-fox/walk/Run 8.png",
            "./img/character-fox/walk/Run 9.png",
            "./img/character-fox/walk/Run 10.png",
            "./img/character-fox/walk/Run 11.png",
            "./img/character-fox/walk/Run 12.png",
            "./img/character-fox/walk/Run 13.png",
            "./img/character-fox/walk/Run 14.png",
            "./img/character-fox/walk/Run 15.png",
            "./img/character-fox/walk/Run 16.png",
        ],
        JUMP: [
            "./img/character-fox/jump/Jump 1.png",
            "./img/character-fox/jump/Jump 2.png",
            "./img/character-fox/jump/Jump 3.png",
            "./img/character-fox/jump/Jump 4.png",
            "./img/character-fox/jump/Jump 5.png",
            "./img/character-fox/jump/Jump 6.png",
            "./img/character-fox/jump/Jump 7.png",
            "./img/character-fox/jump/Jump 8.png",
            "./img/character-fox/jump/Jump 9.png",
        ],
        HURT: ["./img/character-fox/hurt/hurt 1.png", "./img/character-fox/hurt/hurt 2.png", "./img/character-fox/hurt/hurt 3.png"],
        DEAD: [
            "./img/character-fox/dead/dead 1.png",
            "./img/character-fox/dead/dead 2.png",
            "./img/character-fox/dead/dead 3.png",
            "./img/character-fox/dead/dead 4.png",
            "./img/character-fox/dead/dead 5.png",
            "./img/character-fox/dead/dead 6.png",
        ],
    };

    static ENEMIES = {
        CHICKEN_NORMAL: {
            WALK: [
                "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
                "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
                "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
            ],
            DEAD: ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"],
        },
        CHICKEN_SMALL: {
            WALK: [
                "./img/enemies_mushrooms/mushroom/walk/mushroom-walk-1.png",
                "./img/enemies_mushrooms/mushroom/walk/mushroom-walk-2.png",
            ],
            DEAD: ["./img/enemies_mushrooms/dead/dead 1.png", "./img/enemies_mushrooms/dead/dead 2.png"],
        },
        ENDBOSS: {
            WALK: [
                "./img/4_enemie_boss_chicken/1_walk/G1.png",
                "./img/4_enemie_boss_chicken/1_walk/G2.png",
                "./img/4_enemie_boss_chicken/1_walk/G3.png",
                "./img/4_enemie_boss_chicken/1_walk/G4.png",
            ],
            ALERT: [
                "./img/4_enemie_boss_chicken/2_alert/G5.png",
                "./img/4_enemie_boss_chicken/2_alert/G6.png",
                "./img/4_enemie_boss_chicken/2_alert/G7.png",
                "./img/4_enemie_boss_chicken/2_alert/G8.png",
                "./img/4_enemie_boss_chicken/2_alert/G9.png",
                "./img/4_enemie_boss_chicken/2_alert/G10.png",
                "./img/4_enemie_boss_chicken/2_alert/G11.png",
                "./img/4_enemie_boss_chicken/2_alert/G12.png",
            ],
            ATTACK: [
                "./img/4_enemie_boss_chicken/3_attack/G13.png",
                "./img/4_enemie_boss_chicken/3_attack/G14.png",
                "./img/4_enemie_boss_chicken/3_attack/G15.png",
                "./img/4_enemie_boss_chicken/3_attack/G16.png",
                "./img/4_enemie_boss_chicken/3_attack/G17.png",
                "./img/4_enemie_boss_chicken/3_attack/G18.png",
                "./img/4_enemie_boss_chicken/3_attack/G19.png",
                "./img/4_enemie_boss_chicken/3_attack/G20.png",
            ],
            HURT: [
                "./img/4_enemie_boss_chicken/4_hurt/G21.png",
                "./img/4_enemie_boss_chicken/4_hurt/G22.png",
                "./img/4_enemie_boss_chicken/4_hurt/G23.png",
            ],
            DEAD: [
                "./img/4_enemie_boss_chicken/5_dead/G24.png",
                "./img/4_enemie_boss_chicken/5_dead/G25.png",
                "./img/4_enemie_boss_chicken/5_dead/G26.png",
            ],
        },
    };

    static BACKGROUND = {
        FIRST_LAYER: ["./img/5_background/layers/1_first_layer/1.png", "./img/5_background/layers/1_first_layer/2.png"],
        SECOND_LAYER: ["./img/5_background/layers/2_second_layer/1.png", "./img/5_background/layers/2_second_layer/2.png"],
        THIRD_LAYER: ["./img/5_background/layers/3_third_layer/1.png", "./img/5_background/layers/3_third_layer/2.png"],
        AIR: ["./img/5_background/layers/air.png"],
        CLOUDS: ["./img/5_background/layers/4_clouds/1.png", "./img/5_background/layers/4_clouds/2.png"],
        ALL_LAYERS: [
            "./img/5_background/layers/air.png",
            "./img/5_background/layers/3_third_layer/2.png",
            "./img/5_background/layers/2_second_layer/2.png",
            "./img/5_background/layers/1_first_layer/2.png",
            "./img/5_background/layers/air.png",
            "./img/5_background/layers/3_third_layer/1.png",
            "./img/5_background/layers/2_second_layer/1.png",
            "./img/5_background/layers/1_first_layer/1.png",
        ],
        START: [
            "./img/background/start/background-1.png",
            "./img/background/start/background-2.png",
            "./img/background/start/background-3.png",
            "./img/background/start/background-4.png",
            "./img/background/start/background-5.png",
            "./img/background/start/background-6.png",
            "./img/background/start/background-7.png",
            "./img/background/start/background-8.png",
        ],
        EXTENSION: [
            "./img/background/extension/backgr-extension-1.png",
            "./img/background/extension/backgr-extension-2.png",
            "./img/background/extension/backgr-extension-3.png",
            "./img/background/extension/backgr-extension-4.png",
            "./img/background/extension/backgr-extension-5.png",
            "./img/background/extension/backgr-extension-6.png",
        ],
    };

    static BOTTLE = {
        ROTATION: [
            "./img/acorn/rotation/rotate 1.png",
            "./img/acorn/rotation/rotate 2.png",
            "./img/acorn/rotation/rotate 3.png",
            "./img/acorn/rotation/rotate 4.png",
        ],
        SPLASH: [
            "./img/acorn/explosion/explode 1.png",
            "./img/acorn/explosion/explode 2.png",
            "./img/acorn/explosion/explode 3.png",
            "./img/acorn/explosion/explode 4.png",
            "./img/acorn/explosion/explode 5.png",
            "./img/acorn/explosion/explode 6.png",
        ],
        ON_GROUND: ["./img/acorn/acorn.png"],
        NORMAL: ["./img/6_salsa_bottle/salsa_bottle.png"],
    };

    static STATUSBAR = {
        COIN: [
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/10.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/30.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/50.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/70.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/90.png",
            "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
        ],
        HEALTH: [
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/10.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/30.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/50.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/70.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/90.png",
            "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
        ],
        BOTTLE: [
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/10.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/30.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/50.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/70.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/90.png",
            "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
        ],
        ENEMY: [
            "./img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue10.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue30.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue50.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue70.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue90.png",
            "./img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
        ],
    };

    static COIN = [
        "./img/firefly/firefly 1.png",
        "./img/firefly/firefly 2.png",
        "./img/firefly/firefly 3.png",
        "./img/firefly/firefly 4.png",
        "./img/firefly/firefly 5.png",
        "./img/firefly/firefly 6.png",
        "./img/firefly/firefly 7.png",
        "./img/firefly/firefly 8.png",
        "./img/firefly/firefly 9.png",
        "./img/firefly/firefly 10.png",
        "./img/firefly/firefly 11.png",
    ];

    static STARTSCREEN = ["./img/9_intro_outro_screens/start/startscreen_1.png"];

    static RESULT = {
        W0N: ["./img/You won, you lost/You Win A.png", "./img/You won, you lost/You win B.png"],
        LOST: ["./img/You won, you lost/Game over A.png", "./img/You won, you lost/You lost b.png"],
    };
}
