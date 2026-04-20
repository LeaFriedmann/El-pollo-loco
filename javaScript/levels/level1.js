const level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    [new Cloud()],
    [
        new BackgroundObject(ImgHub.BACKGROUND.AIR, -719),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[1], -719),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[1], -719),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[1], -719),

        new BackgroundObject(ImgHub.BACKGROUND.AIR, 0),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[0], 0),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[0], 0),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[0], 0),

        new BackgroundObject(ImgHub.BACKGROUND.AIR, 719),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[1], 719),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[1], 719),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[1], 719),

        new BackgroundObject(ImgHub.BACKGROUND.AIR, 719 * 2),
        new BackgroundObject(ImgHub.BACKGROUND.THIRD_LAYER[0], 719 * 2),
        new BackgroundObject(ImgHub.BACKGROUND.SECOND_LAYER[0], 719 * 2),
        new BackgroundObject(ImgHub.BACKGROUND.FIRST_LAYER[0], 719 * 2),
    ]
);