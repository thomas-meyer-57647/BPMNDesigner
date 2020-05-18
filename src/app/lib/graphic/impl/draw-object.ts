/*-------------------------------------------------------------------------------	
 * BPMN Designer - Graphic Toolbox	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
 import { gtAbstractDrawObject } from './abstract-draw-object';
import { gtLineDash } from './linedash';
import { IStyle } from '../istyle';
import { gtColor } from './color';
import { IDrawObject } from '../idraw-object';

 
 /**
  * this is the abstract base class for every concret draw object
  * 
  * private bound_rect : Rect                                          the bound rect
  * private lineDash : LineDash                                        the line dash
  * private lineWidth: number = 1;                                     the line width 
  * private strokeStyle: any = 'black';                                the color | gradient | pattern 
  * 
  * constructor()
  *
  * public getRect() : Rect                                            get the bound rect
  * 
  * public setLineDash(dash: LineDash) : void                          set the line dash
  * public getLineDash(): LineDash                                     get the line dash
  * public getLineWidth() : number                                     get the line width
  * public setLineWidth(lineWidth: number) : boolean                   set the line width (1-12)   
  * public setStrokeStyle(color: any): void                            set the stroke style
  * public getStrokeStyle(): any                                       get the stroke style
  *
  * abstract hovered() : void                                          the abstract function which was called if hovering
  * public isHovering() : boolean                                      check if the mouse position in the area
  * abstract hovered() : void                                          the abstract function which was called if hovering
  * public doHovering() : void                                         Checks if x and y in the rect then this function will call the function hovered  
  * public doDraw() : void                                             the do draw method. This function call at first doHovering and than the draw() function  
  */
 export abstract class gtDrawObject extends gtAbstractDrawObject implements IDrawObject {
     private lineDash : gtLineDash;
     private lineWidth: number = 1;
     private strokeStyle: IStyle = new gtColor(0);
 
     /**
      * default constructor
      */
     constructor() {
         super();
     }
 
     /**
      * set the line dash
      * 
      * @param dash: LineDash 
      * @return void 
      */
     public setLineDash(dash: gtLineDash) {
         this.lineDash = dash;
       }
   
       /**
        * get the line dash
        * 
        * @return LineDash 
        */
       public getLineDash(): gtLineDash {
         return this.lineDash;
       }
   
       /**
        * get the line width
        * 
        * @return number              the line width
        */
       public getLineWidth() : number {
         return this.lineWidth;
       }
   
       /**
        * set the line width
        * 
        * @param width: number         the line width (1-12)
        * @return boolean              true if set otherwise false
        */
       public setLineWidth(lineWidth: number) : boolean {
         if (lineWidth >= 1 && lineWidth <= 12) {
           this.lineWidth = lineWidth;
           return true;
         }
   
         return false;
       }
   
       /**
        * set the stroke style
        * 
        * @param color: number              the color
        * @return void
        */
       public setStrokeStyle(color: any): void {
         this.strokeStyle = color;
       } 
   
       /**
        * get the stroke style
        * 
        * @return any
        */
       public getStrokeStyle(): any {
         return this.strokeStyle;
       }
       
       /**
        * draw the object
        * 
        * @return void
        * @public
        */
       public draw(): void {        
       }
 }