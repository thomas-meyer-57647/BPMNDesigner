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

  /**
  * this is the class for a point
  * geometric/tmPoint
  * 
  * constructor(                                   constructor<br/>
  *          public x : number,
  *          public y : number,
  *  )
  * public setX(x: number): void                   set x
  * public getX(): number                          get x
  * public setY(y: number): void                   set y
  * public getY(): number                          get y
  * public setXY(x: number, y: number): void       set x and y
  * public clone() : IPoint                        clone this Point and return a new Point with this coords
  * public equals(point : IPoint) : boolean        equals?
  */
 export class gtPoint implements IPoint {
     /**
      * default constructor
      * 
      * If x or y null or undefined this constructor throw a TypeError
      * 
      * @param number          x position
      * @param number          y position
      * @throw TypeError
      */
     constructor(
        private x : number,
        private y : number
     ) { 
         if ( isNull(x) || isUndefined(x) || isNull(y) || isUndefined(y)) {
            throw new TypeError("gtPoint:constructor(" + x + ", " + y + "): X or Y must be an number" ); 
         }
     }

     /**
      * set x
      * 
      * If x null or undefined this constructor throw a TypeError
      * 
      * @param x: number
      * @return void
      * @public
      * @throw TypeError
      */
     public setX(x: number): void {
         if ( isNull(x) || isUndefined(x) ) {
            throw new TypeError("gtPoint:setX(" + x + "): X must be an number" ); 
         } 

         this.x = x;
     }

     /**
      * get x
      * 
      * @return number
      * @public
      */
     public getX(): number {
         return this.x;
     }     

     /**
      * set y
      * 
      * If y null or undefined this constructor throw a TypeError
      *
      * @param y: number
      * @return void
      * @public
      * @throws TypeError
      */
     public setY(y: number): void {
         if ( isNull(y) || isUndefined(y) ) {
            throw new TypeError("gtPoint:setY(" + y + "): Y must be an number" ); 
         }   

         this.y = y;
     }

     /**
      * get y
      * 
      * @return number
      * @public
      */
     public getY(): number {
         return this.y;
     }

     /**
      * set x and y
      * 
      * If x or y null or undefined this constructor throw a TypeError
      * 
      * @param x: number
      * @param y: number
      * @return void
      * @public
      * @throw TypeError
      */
     public setXY(x: number, y: number): void {
         if ( isNull(x) || isUndefined(x) || isNull(y) || isUndefined(y) ) {
            throw new TypeError("gtPoint:setXY(" + x + ", " + y + "): X and Y must be an number" ); 
         }   

         this.x = x;
         this.y = y;
     }

     /**
      * clone this point
      * 
      * @return Point
      * @public
      */
     public clone() : IPoint {
         return new gtPoint(this.x, this.y);
     }

     /**
      * compare the given point with this point and returns true, if this equals
      * 
      * Note
      * This did not compare if point the same
      * 
      * @param point : Point             the point to compare
      * @return boolean
      * @public
      */
     public equals(point : IPoint) : boolean {
        return ( point instanceof gtPoint )
            && ( this.x === point.x && this.y === point.y );
     } 

     /**
      * return this point as a string
      * 
      * @return string
      */
     public toString(): string {
         return "Point [x=" + this.x + ", y=" + this.y + "]";
     }
}
