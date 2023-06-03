import { Actor, CollisionType, Color, DisplayMode, Engine, Font, ImageSource, Loader, Physics, Sprite, Text, TextAlign, vec } from "excalibur";
import LogoBase64 from "./LogoBase64";
import Resources from "./resources";
import Image from "./image";


const robotImageFile = import('/assets/images/RobotCuerpo.png');
const robotArmImageFile = import('/assets/images/RobotBrazo.png');



class Game extends Engine {

    private selectedResources: any[] = [];
    private robotImage: any;
    private robotArmImage: any;

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

        // const prompts = [{
        //     text: 'Un oso y una hormiga montando \n en moto mientras se comen una manzana',
        //     tags: ['oso', 'moto', 'manzana', 'hormiga']
        // }];

        const prompts = Resources.getPromptList();

        const resources = this.shuffle(await Resources.getResourceList());

        console.log('resources: ', resources)

        // Activate debug drawing
        // this.toggleDebug();
        this.robotImage = new ImageSource((await robotImageFile).default);
        this.robotArmImage = new ImageSource((await robotArmImageFile).default);

        const loader = new Loader(resources.map(r => r.image).concat([this.robotImage, this.robotArmImage]));
        // The loaders button text can simply modified using this
        loader.playButtonText = 'Comezar a xogar';
        // The logo can be changed by inserting a base64 image string here
        loader.logo = LogoBase64;
        loader.logoWidth = 707;
        loader.logoHeight = 283;
        // The background color can be changed like so by supplying a valid CSS color string
        loader.backgroundColor = '#176BAA'

        await this.start(loader);

        this.currentScene.camera.pos = vec(this.halfDrawWidth, this.halfDrawHeight);


        this.initScene(prompts, resources);

    }

    private async putRobot() {
        console.log('putRobot')
        const robotPosition = vec(60, this.drawHeight - 100);

        const robotActor = new Actor({
            pos: robotPosition,
            width: 240,
            height: 300,
            color: Color.Red,
            collisionType: CollisionType.PreventCollision,
            z: 100
        });
        const robotSprite: Sprite = this.robotImage.toSprite();
        robotSprite.scale = vec(0.5, 0.5);
        robotActor.graphics.use(robotSprite);

        console.log(this.currentScene.add(robotActor));


        const robotArmActor = new Actor({
            pos: vec(robotPosition.x, robotPosition.y-10),
            width: 240,
            height: 300,
            color: Color.Red,
            collisionType: CollisionType.PreventCollision,
            z: 110,
            anchor: vec(0.5, 0.45)
        });
        const robotArmSprite: Sprite = this.robotArmImage.toSprite();
        robotArmSprite.scale = vec(0.5, 0.5);
        robotArmActor.graphics.use(robotArmSprite);

        //rotate arm with mouse movement, it has to work outside of the actor limits


        this.input.pointers.primary.on('move', (evt) => {
        // robotArmActor.on('pointermove', (evt) => {
            const mousePos = this.input.pointers.primary.lastWorldPos;
            // const angle = mousePos.y/100
            let x = mousePos.x-robotArmActor.pos.x 
            let y = mousePos.y-robotArmActor.pos.y
            let angle = Math.atan2(y,x)+0.9
            robotArmActor.rotation = angle;
        });


        console.log(this.currentScene.add(robotArmActor));

    }

    private initScene(prompts: any[], resources: any[]) {
        this.currentScene.clear();
        this.selectedResources = [];

        const Caja1 = new Actor({
            pos: vec(this.halfDrawWidth, this.drawHeight),
            width: this.drawWidth,
            height: 100,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja2 = new Actor({
            pos: vec(100, this.halfDrawHeight),
            width: 20,
            height: this.drawHeight,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja3 = new Actor({
            pos: vec(this.drawWidth - 200, this.halfDrawHeight),
            width: 20,
            height: this.drawHeight,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja4 = new Actor({
            pos: vec(this.drawWidth - 100, this.halfDrawHeight),
            width: 200,
            height: 20,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        const Caja5 = new Actor({
            pos: vec(this.drawWidth, this.halfDrawHeight - this.halfDrawHeight / 2),
            width: 20,
            height: this.halfDrawHeight,
            color: Color.DarkGray,
            collisionType: CollisionType.Fixed
        });

        this.currentScene.add(Caja1);
        this.currentScene.add(Caja2);
        this.currentScene.add(Caja3);
        this.currentScene.add(Caja4);
        this.currentScene.add(Caja5);

        this.putRobot();

        // Get Random prompt
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        const promptText = new Text({
            text: prompt.text,
            font: new Font({ size: 25, family: 'Arial', textAlign: TextAlign.Center }),
        })

        const promptActor = new Actor({
            pos: vec(this.halfDrawWidth + 180, 50),
        })

        promptActor.graphics.use(promptText);
        this.currentScene.add(promptActor);

        let timeDelay = 0;
        for (const resource of resources) {
            const grayValue = Math.floor(Math.random() * 50) + 150;
            let color = new Color(grayValue, grayValue, grayValue)
            this.clock.schedule(() => {
                let element: Image = new Image(this.halfDrawWidth + Math.random() * 40 - 20 - 50, -200, 30, color, resource.name);
                // If clicked, check if it's valid and move to the right container
                element.on("pointerdown", () => {
                    console.log('tag: ', element.tag)
                    if (prompt.tags.includes(element.tag)) {
                        this.moveToRightContainer(element);
                        this.selectedResources.push(element);
                        // Si ya están todos los elementos, ganaste
                        if (this.selectedResources.length === prompt.tags.length) {
                            //Esperamos 5 segundos y volvemos a empezar
                            this.clock.schedule(() => {
                                console.log('Ganaste')
                                this.initScene(prompts, resources);
                            }, 5000);
                        }
                    }
                });
                const sprite: Sprite = resource.image.toSprite();
                sprite.scale = vec(0.2, 0.2);
                element.graphics.add(sprite);

                this.currentScene.add(element);
            }, timeDelay++ * 50);

        }
    }
    private moveToRightContainer(element: Actor) {
        element.pos = vec(this.drawWidth - 100 + Math.random() * 40 - 20, -100)
        element.vel = vec(0, 0); // Stop movement
        element.acc = vec(0, 0);
    }

    private shuffle(array: any[]) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}

export const game = new Game();

game.initialize();
