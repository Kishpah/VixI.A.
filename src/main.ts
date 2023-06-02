import { Actor, CollisionType, Color, DisplayMode, Engine, ImageSource, Loader, Physics, Sprite, vec } from "excalibur";
import Resources from "./resources";
import Image from "./image";

import imagefile from '/assets/images/hormiga.png';

class Game extends Engine {
    constructor() {
        super({
            width: 800,
            height: 600,
            displayMode: DisplayMode.FitScreen
        });
    }

    public async initialize() {
        Physics.useRealisticPhysics();
        //Physics.useArcadePhysics();
        Physics.acc = vec(0, 300);
        Physics.checkForFastBodies = true
        Physics.positionIterations = 3
        Physics.velocityIterations = 8

        const Caja1 = new Actor({
            pos: vec(game.halfDrawWidth, game.drawHeight),
            width: game.drawWidth,
            height: 100,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja2 = new Actor({
            pos: vec(100, game.halfDrawHeight),
            width: 20,
            height: game.drawHeight,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja3 = new Actor({
            pos: vec(game.drawWidth - 200, game.halfDrawHeight),
            width: 20,
            height: game.drawHeight,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja4 = new Actor({
            pos: vec(game.drawWidth - 100, game.halfDrawHeight),
            width: 200,
            height: 20,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja5 = new Actor({
            pos: vec(game.drawWidth, game.halfDrawHeight - game.halfDrawHeight / 2),
            width: 20,
            height: game.halfDrawHeight,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        // const imagefile = new ImageSource(hormiga);

        // console.log('imagefile: ', imagefile)
        // game.toggleDebug();
        const prompt = ['manzana', 'avión', 'árbol', 'hormiga']
        const resources = await Resources.getResourceList();

        console.log('resources: ', resources
        )
        const loader = new Loader(resources.map(r => r.image));
        await game.start(loader);

        game.currentScene.add(Caja1);
        game.currentScene.add(Caja2);
        game.currentScene.add(Caja3);
        game.currentScene.add(Caja4);
        game.currentScene.add(Caja5);

        game.currentScene.camera.pos = vec(game.halfDrawWidth, game.halfDrawHeight);


        let timeDelay = 0;
        for (const resource of resources) {
            // let color: Color;
            // if (prompt.includes(resource.name)) {
            //     color = new Color(250, 0, 0)
            // } else {
            //     color = new Color(0, 250, 0)
            // }
            let color = new Color(0, 250, 0)
            game.clock.schedule(() => {
                let element: Image = new Image(game.halfDrawWidth + Math.random() * 40 - 20 - 50, -200, 30, color, resource.name);
                // If clicked, check if it's valid and move to the right container
                element.on("pointerdown", () => {
                    console.log('tag: ', element.tag)
                    if (prompt.includes(element.tag)) {
                        moveToRightContainer(element);
                    }
                });

                this.currentScene.add(element);
            }, timeDelay++ * 50);

        }

        const sprite = imagefile.toSprite();
        let a: Actor = new Actor({
            pos: vec(game.halfDrawWidth, game.halfDrawHeight),
            radius: 30,
            color: Color.Yellow,
            collisionType: CollisionType.Active,
        });
        a.body.bounciness = 0.1;
        a.collider.useCircleCollider(30);
        sprite.scale = vec(0.2, 0.2);
        a.graphics.add(sprite);
        this.currentScene.add(a);

        function moveToRightContainer(element: Actor) {
            element.pos = vec(game.drawWidth - 100 + Math.random() * 40 - 20, -100)
            element.vel = vec(0, 0); // Stop movement
            element.acc = vec(0, 0);
        }
    }
}

export const game = new Game();

game.initialize();

/*
async function main() {
    Physics.useRealisticPhysics();
    //Physics.useArcadePhysics();
    Physics.acc = vec(0, 300);
    Physics.checkForFastBodies = true
    Physics.positionIterations = 3
    Physics.velocityIterations = 8

    const game = new Engine({
        width: 800,
        height: 600,
        displayMode: DisplayMode.FitScreen
    });

    game.showDebug(true);

    // Caja is an actor made from three boxes, one for the ground and another two, one for each side
    const Caja1 = new Actor({
        pos: vec(game.halfDrawWidth, game.drawHeight),
        width: game.drawWidth,
        height: 100,
        color: Color.DarkGray,
        collisionType: CollisionType.Fixed
    });

    const Caja2 = new Actor({
        pos: vec(100, game.halfDrawHeight),
        width: 20,
        height: game.drawHeight,
        color: Color.DarkGray,
        collisionType: CollisionType.Fixed
    });

    const Caja3 = new Actor({
        pos: vec(game.drawWidth - 200, game.halfDrawHeight),
        width: 20,
        height: game.drawHeight,
        color: Color.DarkGray,
        collisionType: CollisionType.Fixed
    });

    const Caja4 = new Actor({
        pos: vec(game.drawWidth - 100, game.halfDrawHeight),
        width: 200,
        height: 20,
        color: Color.DarkGray,
        collisionType: CollisionType.Fixed
    });

    const Caja5 = new Actor({
        pos: vec(game.drawWidth, game.halfDrawHeight - game.halfDrawHeight / 2),
        width: 20,
        height: game.halfDrawHeight,
        color: Color.DarkGray,
        collisionType: CollisionType.Fixed
    });

    // console.log(document.baseURI)
    // const imagefile = new ImageSource('./hormiga.png');
    // console.log('imagefile: ', imagefile)
    // game.toggleDebug();
    // const loader = new Loader([imagefile]);

    // start-snippet{collision}
    await game.start()
    // console.log('imageFile: ', imagefile)

    //.then(() => {

    game.currentScene.add(Caja1);
    game.currentScene.add(Caja2);
    game.currentScene.add(Caja3);
    game.currentScene.add(Caja4);
    game.currentScene.add(Caja5);

    game.currentScene.camera.pos = vec(game.halfDrawWidth, game.halfDrawHeight);

    const prompt = ['manzana', 'avión', 'árbol', 'hormiga']
    const resources = Resources.getResourceList();

    console.log('Resources: ', resources)
    console.log('Prompt: ', prompt)

    let timeDelay = 0;
    for (const resource of resources) {
        let color: Color;
        if (prompt.includes(resource.name)) {
            color = new Color(250, 0, 0)
        } else {
            color = new Color(0, 250, 0)
        }
        game.clock.schedule(() => {
            let element: Image = new Image(game.halfDrawWidth + Math.random() * 40 - 20 - 50, -200, 30, color, resource.name);
            // If clicked, check if it's valid and move to the right container
            element.on("pointerdown", () => {
                console.log('tag: ', element.tag)
                if (prompt.includes(element.tag)) {
                    moveToRightContainer(element);
                }
            });

            game.currentScene.add(element);
        }, timeDelay++ * 50);

    }
    // const imagefile = new ImageSource('./assets/images/vaca.png');
    // const sprite = imagefile.toSprite();

    // let a: Actor = new Actor({
    //     pos: vec(game.halfDrawWidth, game.halfDrawHeight),
    //     radius: 100,
    //     color: Color.Yellow,
    //     collisionType: CollisionType.Active,
    //     anchor: vec(0.5, 0.5),
    // });
    // a.body.bounciness = 0.1;
    // a.collider.useCircleCollider(30);
    // sprite.scale = vec(0.01, 0.01);
    // a.graphics.add(sprite);
    // // a.graphics.add(sprite);

    // game.currentScene.add(a);

    // });

    function circle(color: Color) {
        return new Actor({
            pos: vec(game.halfDrawWidth + Math.random() * 40 - 20 - 50, -200),
            radius: 30,
            color: color, //Color.Yellow,
            collisionType: CollisionType.Active,
        });
    }

    function moveToRightContainer(element: Actor) {
        element.pos = vec(game.drawWidth - 100 + Math.random() * 40 - 20, -100)
        element.vel = vec(0, 0); // Stop movement
        element.acc = vec(0, 0);
    }
}

main();

*/