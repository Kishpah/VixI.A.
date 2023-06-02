import { Actor, CollisionType, Color, Sprite, vec } from "excalibur";

class Image extends Actor {
    public tag: string;
    // public sprite: Sprite;

    constructor(x: number, y: number, radius: number, color: Color, tag: string) {
        super({
            pos: vec(x, y),
            radius: radius,
            color: color,
            collisionType: CollisionType.Active, 
        });
        
        this.tag = tag;
    }
}