import { Actor, CollisionType, Color, DisplayMode, Engine, Physics, vec } from "excalibur";
import Resources from "./resources";

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

// start-snippet{collision}
game.start().then(() => {
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
    for(const resource of resources) {
        let color: Color;
        if(prompt.includes(resource.name)){
            color = new Color(250,0,0)
        }        else{
            color = new Color(0,250,0)
        }
        game.clock.schedule(() => {
            // New Circle
            let element: Actor = circle(color);
            // Low bounciness
            element.body.bounciness = 0.1;
            element.collider.useCircleCollider(30);

            // If clicked, check if it's valid and move to the right container
            element.on("pointerdown", () => {
                moveToRightContainer(element);
            });

            game.currentScene.add(element);
        }, timeDelay++ * 50);
    }

    // Add 20 circles, one every 1th of a second
    // for (let i = 0; i < 50; i++) {
    //     game.clock.schedule(() => {
    //         // New Circle
    //         let element: Actor = circle(new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255));
    //         // Low bounciness
    //         element.body.bounciness = 0.1;
    //         element.collider.useCircleCollider(30);

    //         // If clicked, check if it's valid and move to the right container
    //         element.on("pointerdown", () => {
    //             moveToRightContainer(element);
    //         });

    //         game.currentScene.add(element);
    //     }, i * 50);
    // }

});

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