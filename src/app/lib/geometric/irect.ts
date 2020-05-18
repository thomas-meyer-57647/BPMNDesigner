/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     geometric toolbox
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { IPoint } from './ipoint';

/**
 * this is the interface for the rect class
 */
export interface IRect {    
    setLeft(left: number): void;
    getLeft(): number;
    setTop(top: number): void;
    getTop(): number;
    setWidth(width: number): void;
    getWidth(): number;
    setHeight(height: number): void
    getHeight(): number;
    getRight() : number;
    setRight(right : number) : void;
    getBottom() : number;
    setBottom( bottom : number );
    getLeftTop() : IPoint;
    setLeftTop(lefttop : IPoint)
    getRightBottom() : IPoint;
    setRightBottom(rightbottom: IPoint) : void;
    getCenterX(): number;
    getCenterY(): number;
    getCenter(): IPoint;
    isPointInRect(point: IPoint) : boolean;
    isXYInRect(x: number, y: number) : boolean;
    isInside(rect: IRect): boolean;
    isIntersect(rect: IRect): boolean;
    combined(rect: IRect): IRect;
    move(x: number, y: number): void;
    translate(dx: number, dy: number): void;
    grow(h: number, v: number): void;
    isEmpty(): boolean;
    rotate90(): void;
    clone() : IRect;
    equal(rect: IRect) : boolean    
    toString(): string;
}
