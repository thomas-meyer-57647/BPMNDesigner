/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     geometric toolbox
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/

import { isNull, isUndefined } from 'util';
import { IPoint } from '../ipoint';
import { gtPoint } from './point';
import { IRect } from '../irect';

/**
 * this class describe a rect
 * 
 * private left: number                                                     left coord of the rect     
 * private top: number                                                      top coord of the rect
 * private width: number                                                    width
 * private height: number                                                   height
 * 
 * constructor()                                                            constructor
 * static public create( left: number, top: number, width: number, height: number) : rect 
 *                                                                          create a rect with x, y, width and height
 * public setLeft(left: number): void                                       set the left coord
 * public getLeft(): number                                                 get the left coord
 * public setTop(top: number): void                                         set the top coord
 * public getTop(): number                                                  get the top coord
 * public setWidth(width: number): void                                     set the width
 * public getWidth(): number                                                get the width
 * public setHeight(height: number): void                                   set the height
 * public getHeight(): number                                               get the height
 * public getRight() : number                                               get the right coord
 * public setRight(right : number) : void                                   set the right coord
 * public getBottom() : number                                              get the bottom coord
 * public setBottom(bottom : number) : void                                 set the bottom coord
 * public getLeftTop() : IPoint                                             get the left top coords as a point class
 * public setLeftTop(point : IPoint)                                        set the left top coords by a given point class 
 * public getRightBottom() : IPoint                                         get the point class from the right bottom coord 
 * public setRightBottom(point : IPoint) : void                             set the right bottom coord by the point class 
 * public getCenter(): IPoint                                               get the center point of the rect
 * public getCenterX(): number                                              get the x coord of the center
 * public getCenterY(): number                                              get the y coord of the center
 * public isInRect(x : number, y : number) : boolean                        check if x and y is in the rect
 * public isPointInRect(point: IPoint) : boolean                            check if the tmPoint is in the rect
 * public isIntersect(rect: IRect): boolean                                 check if this rect intersect with another rect
 * public combined(rect: IRect): IRect                                     combined this rect with the given rect and return the new rect
 * public move(x: number, y: number): void                                  Moves the location of this rectangle by setting its upper left
 * public translate(dx: number, dy: number): void                           Translate the location of this rectangle by the given amounts.
 * public grow(h: number, v: number): void                                  Expands the rectangle by the specified amount.
 * public isEmpty(): boolean                                                check if the rectangle is empty
 * public rotate90(): void                                                  rotate this rect 90°
 * public clone() : IRect                                                    clone this instance
 * public equal(rect: gtRect) : boolean                                       is this instance equals with <rect>
 * public toString(): string                                                get the rect data as string
 */
export class gtRect implements IRect {
     /**
      * the default constructor
      * 
      * If left, top, width or height null or undefined this constructor throw a TypeError
      * 
      * @param left : number
      * @param top : number
      * @param width : number
      * @param height : number
      * @throw TypeError
      */
     constructor(
        private left : number,         
        private top : number,
        private width : number,
        private height : number
      ) { 
        if ( isNull(left) || isUndefined(left) 
          || isNull(top) || isUndefined(top)
          || isNull(width) || isUndefined(width)
          || isNull(height) || isUndefined(height)         
          ) {
            throw new TypeError("gtRect:constructor(" + left + ", " + top + ", " + width + ", " + height +"): left, top, width and height could not be null or undefined" ); 
         }
      }
      
     /**
      * set the left coord
      * 
      * If left null or undefined this function throw a TypeError
      * 
      * @param left: number     left coord
      * @return void
      * @public
      * @throws TypeError
      */
     public setLeft(left: number): void {
        if ( isNull(left) || isUndefined(left)) {
            throw new TypeError("gtRect:setLeft(" + left + "): left could not be null or undefined" ); 
         }

        this.left = left;
    }
 
     /**
      * get the left coord
      * 
      * @return number     left coord
      * @public
      */
     public getLeft(): number {
         return this.left;
     }
 
     /**
      * set the top coord
      * 
      * If top null or undefined this function throw a TypeError
      * 
      * @param top: number     top coord
      * @return void
      * @public
      * @throws TypeError
      */
     public setTop(top: number): void {
        if ( isNull(top) || isUndefined(top)) {
            throw new TypeError("gtRect:setTop(" + top + "): top could not be null or undefined" ); 
         }

        this.top = top;
    }
 
     /**
      * get the top coord
      * 
      * @return number          top coord
      * @public
      */
     public getTop(): number {
         return this.top;
     }
 
     /**
      * set the width
      * 
      * If width null or undefined this function throw a TypeError
      * 
      * @param width: number     width
      * @return void
      * @public
      * @throw TypeError
      */
     public setWidth(width: number): void {
        if ( isNull(width) || isUndefined(width)) {
            throw new TypeError("gtRect:setTop(" + width + "): width could not be null or undefined" ); 
         }

        this.width = width;
    }
 
     /**
      * get the width
      * 
      * @return number          width
      * @public
      */
     public getWidth(): number {
         return this.width;
     }
 
     /**
      * set the height
      * 
      * @param height: number     height
      * @return void
      * @public
      */
     public setHeight(height: number): void {
        if ( isNull(height) || isUndefined(height)) {
            throw new TypeError("gtRect:setHeight(" + height + "): height could not be null or undefined" ); 
        }

        this.height = height;
    }
 
     /**
      * get the height
      * 
      * @return number              height
      * @public
      */
     public getHeight(): number {
         return this.height;
     }      

     /**
      * get the right coord
      * 
      * @return number right     right coord
      * @public
      */
     public getRight() : number {
        return this.getLeft() + this.width;
    }

    /**
     * set the right coord
     *
     * If right null or undefined this function throw a TypeError
     * 
     * @param number            right coord
     * @return void             right coord
     * @public
     * @throw TypeError
     */
    public setRight(right : number) : void {
        if ( isNull(right) || isUndefined(right)) {
            throw new TypeError("gtRect:setRight(" + right + "): right could not be null or undefined" ); 
        }

        this.width = right - this.left;
    }

    /**
     * get the bottom coord
     * 
     * @return number            bottom coord
     * @public
     */
    public getBottom() : number {
        return this.top + this.height;
    }

    /**
     * set the bottom coord
     * 
     * If bottom null or undefined this function throw a TypeError
     * 
     * @param number            bottom coord
     * @return void
     * @public
     * @throws TypeError
     */
    public setBottom( bottom : number ) : void {
        if ( isNull(bottom) || isUndefined(bottom)) {
            throw new TypeError("gtRect:setBottom(" + bottom + "): bottom could not be null or undefined" ); 
        }

        this.height = bottom - this.top;
    }  
    
    /**
     * get the left(x) top(y) coords as a point class
     * 
     * @return Point             the left top coords
     * @public
     */
    public getLeftTop() : IPoint {
        return new gtPoint(this.left, this.top);
    }
    
    /**
     * set the left(x) top(y) coords by a given point class
     * 
     * @parent point: IPoint             the left top coords
     * @return void
     * @public
     */
    public setLeftTop(lefttop : IPoint) {
        this.left = lefttop.getX();
        this.top = lefttop.getY();
    }
    
    /**
     * get the right bottom coords as a point class
     * 
     * @return  tmPoint            the left top coords
     * @public
     */
    public getRightBottom() : IPoint {
        return new gtPoint(this.getRight(), this.getBottom());
    }
    
    /**
     * set the left top coords by a given point class
     * 
     * @param tmPoint           the left top coords
     * @return void
     * @public
     */
    public setRightBottom(rightbottom: IPoint) : void {
        this.setRight(rightbottom.getX());
        this.setBottom(rightbottom.getY());
    }   
    
    /**
     * get x coord of the center
     * 
     * @return x: number
     * @public
     */
    public getCenterX() {
        return this.left + (this.width / 2); 
    }

    /**
     * get y coord of the center
     * 
     * @return y: number
     * @public
     */
    public getCenterY() {
        return this.top + (this.height / 2);
    }    

    /**
     * get the center
     * 
     * @return tmPoint
     * @public
     */
     public getCenter(): IPoint {
        return new gtPoint(
            this.getCenterX(),
            this.getCenterY()
        );
    }
    
    /**
     * is point in rect
     * 
     * @param point: IPoint    the point to check
     * @return boolean         true, if the point in the rect
     * @public
     */  
    public isPointInRect(point: IPoint) : boolean {
        return point.getX() >= this.left && point.getX() <= this.getRight() && point.getY() >= this.top && point.getY() <= this.getBottom();
    } 

    /**
     * is X and Y in rect
     * 
     * If bottom null or undefined this function throw a TypeError
     * 
     * @param point: IPoint    the point to check
     * @return boolean         true, if the point in the rect
     * @public
     * @throw TypeError
     */  
    public isXYInRect(x: number, y: number) : boolean {
        return this.isPointInRect(new gtPoint(x, y));
    } 

    /**
     * check if this rect inside the given rect
     * 
     * If rect null or undefined this function throw a TypeError
     * 
     * @param rect: IRect                     the bound rect
     * @return boolean                        true, if the point in the rect
     * @public
     * @throws TypeError
     */  
    public isInside(rect: IRect): boolean {
        if ( isNull(rect) || isUndefined(rect)) {
            throw new TypeError("gtRect:isInside(" + rect + "): rect could not be null or undefined" ); 
        }

        return (  this.getLeft() <= rect.getLeft()
            &&    this.getTop() <= rect.getTop()
            &&    this.getRight() >= rect.getRight()
            &&    this.getBottom() >= rect.getBottom() );
    }

    /**
     * Tests whether or not the specified rectangle intersects this rectangle.
     * This means the two rectangles share at least one internal point.
     * 
     * If rect null or undefined this function throw a TypeError
     * 
     * @param rect: IRect                 the other rect
     * @return boolean                     true, if intersect
     * @public
     * @throws TypeError
     */
    public isIntersect(rect: IRect): boolean {
        if ( isNull(rect) || isUndefined(rect)) {
            throw new TypeError("gtRect:isIntersect(" + rect + "): rect could not be null or undefined" ); 
        }

        return rect.getWidth() > 0 && rect.getHeight() > 0 && this.getWidth() > 0 && this.getHeight() > 0
            && rect.getLeft() < this.getLeft() + this.getWidth() && rect.getLeft() + rect.getWidth() > this.getLeft()
            && rect.getTop() < this.getTop() + this.getHeight() && rect.getTop() + rect.getHeight() > this.getTop();
    }

     /**
      * combined this rect with the given rect and return the new rect
      * 
      * If rect null or undefined this function returns a copy of this rect
      * 
      * @param rect: IRect                                         the rect
      * @return void
      * @public
      */
     public combined(rect: IRect): IRect {
        if ( isNull(rect) || isUndefined(rect)) {
            return this.clone();
        }

        let left: number = Math.min(this.getLeft(), rect.getLeft());                
        let top: number = Math.min(this.getTop(), rect.getTop());                   
        let right: number = Math.max(this.getRight(), rect.getRight());              
        let bottom: number = Math.max(this.getBottom(), rect.getBottom());          

        return new gtRect(left, top, right - left, bottom - top);                             
     }

    /**
     * Moves the location of this rectangle by setting its upper left corner to the
     * specified coordinates.
     *
     * If x or y is null or undefined this function throw a TypeError
     *     
     * @param x: number                    the new X coordinate for this rectangle
     * @param y: number                    the new Y coordinate for this rectangle
     * @return void
     * @public
     * @throws TypeError
     */
    public move(x: number, y: number): void {
        if ( isNull(x) || isUndefined(x)
         ||  isNull(y) || isUndefined(y) ) {
            throw new TypeError("gtRect:move(" + x + ", " + y + "): x or y could not be null or undefined" ); 
        }
        
        this.left = x;
        this.top = y;
    }

    /**
     * Translate the location of this rectangle by the given amounts.
     *
     * If dx or dy is null or undefined this function throw a TypeError
     * 
     * @param dx: number                    the x distance to move by
     * @param dy: number                    the y distance to move by
     * @return void
     * @public
     * @throws TypeError
     */
    public translate(dx: number, dy: number): void {
        if ( isNull(dx) || isUndefined(dx)
        ||  isNull(dy) || isUndefined(dy) ) {
           throw new TypeError("gtRect:translate(" + dx + ", " + dy + "): dx or dy could not be null or undefined" ); 
        }

        this.left += dx;
        this.top += dy;
    }

    /**
     * Expands the rectangle by the specified amount.  The horizontal and vertical
     * expansion values are applied both to the X,Y coordinate of this rectangle, 
     * and its width and height. Thus the width and height will increase by 2h and
     * 2v accordingly.
     *
     * If h or v is null or undefined this function throw a TypeError
     *
     * @param h: number                 the horizontal expansion value
     * @param v: number                 the vertical expansion value
     * @return void
     * @public
     * @throw TypeError 
     */
     public grow(h: number, v: number): void {
        if ( isNull(h) || isUndefined(h)
        ||  isNull(v) || isUndefined(v) ) {
           throw new TypeError("gtRect:grow(" + h + ", " + v + "): h or v could not be null or undefined" ); 
        }

        this.left -= h;
        this.top -= v;
        this.width += h + h;
        this.height += v + v;
     }

    /**
     * Tests whether or not this rectangle is empty.  An empty rectangle
     * has a non-positive width or height.
     *
     * @return boolean                         true if the rectangle is empty
     * @public
     */
    public isEmpty(): boolean {
        return this.width <= 0 || this.height <= 0;
    }

    /**
     * rotate the rect at 90°
     * 
     * @return void
     * @public
     */
    public rotate90(): void {
        var tmp: number = this.getWidth();          

        this.setWidth( this.getHeight() );          
        this.setHeight( tmp );                      
    }   

    /**
     * clone this instance
     * 
     * @return rect
     */
    public clone() : IRect {
        return new gtRect(this.left, this.top, this.width, this.height);
    }

    /**
     * equals?
     * 
     * @param rect : gtRect
     * @return boolean
     */
    public equal(rect: IRect) : boolean {
       return ( (rect instanceof gtRect)
          && (this.left == rect.left)
          && (this.top == rect.top)
          && (this.width == rect.width)
          && (this.height == rect.height) );
    }

    /**
     * get the class as string
     * 
     */
    public toString(): string {
        return "gtRect [left=" + this.left + ", top=" + this.top + ", width=" + this.width + ", height=" + this.height + "]";
    }
}
