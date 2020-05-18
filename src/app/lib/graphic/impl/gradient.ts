/*-------------------------------------------------------------------------------	
 * Graphic Toolbox	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		0.9.1
 --------------------------------------------------------------------------------*/
import { gtColor } from './color';
import { isNull, isUndefined } from 'util';
import { IGradient } from '../igradient';

/**
 * this file includes the bothe class <code>gtColorStop</code> for a colorstop of an <code>gtLinearGradient</code>
 * and the <code>gtLinearGradient</code> for a gradient
 * 
 * e.g.
 * <code>
 *      var c = document.getElementById("myCanvas");
 *      var ctx = c.getContext("2d");
 * 
 *      // Create gradient
 *      var grd = ctx.createLinearGradient(0, 0, 200, 0);
 *      grd.addColorStop(0, "red");
 *      grd.addColorStop(1, "white");
 * 
 *      // Fill with gradient
 *      ctx.fillStyle = grd;
 *      ctx.fillRect(10, 10, 150, 80);
 * </code>
 * 
 * There are two types of gradients
 *          createLinearGradient(x,y,x1,y1) - creates a linear gradient
 *          createRadialGradient(x,y,r,x1,y1,r1) - creates a radial/circular gradient
 */

/**
 * the color stops for a gradient
 * 
 * constructor( position: number, color: gtColor )                  create a <code>gtColorStop</stop>
 * 
 * setStop(position: number): void                                  set the stop position
 * getStop(): number                                                get the stop position
 * 
 * setColor(color: gtColor): void                                   set the color
 * getColor(): gtColor                                              get the color
 * 
 * draw( gradient ): void                                           use the color stap for a <code>gradient<code>
 * 
 * clone(): gtColorStop                                             clone a color stop
 * equals(otherColorStop: gtColorStop): boolean                     compare two color stops
 * 
 * toSVG(): string                                                  convert this <code>gtColorStop</code> to an svg string    
 */
export class gtColorStop {
    private stop: number;
    private color: gtColor;

    /**
     * create a <code>gtColorStop</stop>
     * 
     * The <code>position</code> must between 0 and 1
     * 
     * if <code>position</code> null or undefined this function throw an type error exception
     * if <code>position</code> <0 or >1 this function throw an range error exception
     * if <code>color</code> null or undefined this function throw an type error exception
     * 
     * @param position: number                     the color stop position
     * @param color:  gtColor                      the color
     * @return void
     * @public
     * @throw TypeError
     *        RangeError
     * 
     */
    constructor( position: number, color: gtColor ) {
        this.setStop(position);
        this.setColor(color);
    }    

    /**
     * set the stop position. The <code>position</code> must between 0 and 1
     * 
     * if <code>position</code> null or undefined this function throw an type error exception
     * if <code>position</code> <0 or >1 this function throw an range error exception
     * 
     * @param position: number                     the color stop position
     * @return void
     * @public
     * @throw TypeError
     *        RangeError
     */
    public setStop(position: number): void {
        if (isNull(position) || isUndefined(position) ) {
            throw new TypeError('gtColorStop::setStop(' + position + '): could not be null or undefined');
        }

        if (position < 0 || position > 1) {
            throw new RangeError('gtColorStop::setStop(' + position + '): Bad position value! Postition must be an float value between >=0 and <=1');
        }

        this.stop = position;
    } 

    /**
     * get the stop position. 
     * 
     * @return number
     * @public
     * @throw TypeError
     *        RangeError
     */
    public getStop(): number {
        return this.stop;
    }
    
    /**
     * set the color 
     * 
     * if <code>color</code> null or undefined this function throw an type error exception
     * 
     * @param color: gtColor
     * @return void
     * @public
     * @throw TypeError
     *        RangeError
     */
    public setColor(color: gtColor): void {
        if (isNull(color) || isUndefined(color) ) {
            throw new TypeError('gtColorStop::setColor(' + gtColor + '): could not be null or undefined');
        }

        this.color = color;
    } 

    /**
     * get the color 
     * 
     * @return gtColor
     * @public
     * @throw TypeError
     *        RangeError
     */
    public getColor(): gtColor {
        return this.color;
    } 

    /**
     * draw
     * 
     * @return boolean
     * @public
     */    
    public draw( gradient ): void {
        gradient.addColorStop(this.stop, this.color.toRGBA());
    }

    /**
     * clone this color stop 
     * 
     * @return gtColor
     * @public
     */
    public clone(): gtColorStop {
        return new gtColorStop(this.stop, this.color.clone());
    }

    /**
     * equals
     * 
     * if <code>otherColorStop</code> null or undefined this function will be false
     * if <code>otherColorStop</code> this <code>gtColorStop</code> this function will be return true
     * if color and position from <code>otherColorStop</code> equals with the color and position from
     * this <code>gtColorStop</code> it will be return true, otherwise false
     *    
     * @params otherColorStop: gtColorStop                          the <code>gtColorStop</code> to compare with 
     * @return boolean
     * @public
     */
    public equals(otherColorStop: gtColorStop): boolean {
        if ( isNull(otherColorStop) || isUndefined(otherColorStop) )
            return false;

        if ( this == otherColorStop ) 
            return true;

        return ( this.stop == otherColorStop.stop && this.color.equals( otherColorStop.getColor() ))
    }

    /**
     * convert this <code>gtColorStop</code> to an svg string
     * 
     * @params otherColorStop: gtColorStop                          the <code>gtColorStop</code> to compare with 
     * @return boolean
     * @public
     */    
    public toSVG(): string {
        return '<stop offset="' + this.stop + '" style="stop-color: ' + this.color.toRGBA() + '" />';        
    }
}

//============================================  gradient ============================================
/**
 * the abstract gradient
 * 
 * constructor()                                            create a <code>gtAbstractGradient</stop>
 * 
 * setName( name: string ): void                            set the name of the gradient
 * getName(): string                                        get the name of the gradient
 * 
 * addColorStop( colorstop: gtColorStop ): number           add a color stop to gradient. 
 * getColorStop(index: number): gtColorStop                 get the <code>index</code> colorstop
 * deleteColorStop(index: number): void                     delete the <code>index</code> colorstop
 * getColorStopCount(): number                              get count of <code>gtColorStop</code> colorstop
 *
 * load(name: string): void                                 load this gradient
 * save(name: string): void                                 save this gradient
 * static getAllNames(): Array<String>                      get all gradient names
 * 
 * draw(ctx): void                                          use the gradient
 * 
 * clone(): gtLinearGradient                                clone this gradient
 * equals(otherGradient: gtLinearGradient): boolean         equal?
 * 
 * toSVG(): string                                          get the gradient to svg
 * toCSS(): string                                          get the gradient to css
 * 
 */
export abstract class gtAbstractGradient implements IGradient {
    private colorstops: Array<gtColorStop> = new Array<gtColorStop>();
    private name: string
    private id: string;

    /**
     * create a <code>gtLinearGradient</stop>
     * 
     *if <code>colorstop</code> null or undefined this function throw an TypeError exception
     *
     * @param name: number                   (optional) the name of the gradient                     
     * @return void
     * @public
     * 
     */
    constructor( colorstop: gtColorStop, name?: string ) {
        this.addColorStop(colorstop);
        this.setName(name);
    }

    /**
     * set the name of the gradient
     * 
     * @param name: string                      the name
     * @return void
     * @public
     **/  
    public setName( name: string ): void {
        this.name = name;        
    }    

    /**
     * get the name of the gradient
     * 
     * @return string
     * @public
     **/    
    public getName(): string {
        return this.name;        
    }

    /**
     * set the id of the gradient
     * 
     * if <code>id</code> null, undefined, empty or blank screen this function throws an
     * TypeError Exception
     * 
     * @param name: string                      the name
     * @return void
     * @public
     * @throw TypeError
     **/  
    public setID( id: string ): void {
        this.id = id;        
    }    

    /**
     * get the id of the gradient
     * 
     * @return string
     * @public
     **/    
    public getID(): string {
        return this.id;        
    }

    /**
     * add a color stop to gradient. This function return after added the new count of elements
     * 
     * if <code>colorstop</code> null or undefined this function throw an TypeError exception
     * 
     * @param colorstop: gtColorStop                    the color stop to added
     * @return number
     * @throw TypeError
     * @public
     **/
    public addColorStop( colorstop: gtColorStop ): number {
        if ( isNull(colorstop) || isUndefined(colorstop) ) {
            throw new TypeError('gtAbstractGradient::addColorStop(' + colorstop + '): could not be null or undefined');
        }

        return this.colorstops.push( colorstop );
    }

    /**
     * get the <code>index</code> colorstop
     * 
     * if <code>index</code> null or undefined this function throw an TypeError exception
     * if <code>index</code> <0 or >max count this function throw an RangeError exception
     * 
     * @param index: number                         the index
     * @return gtColorStop
     * @throw TypeError
     *        RangeError
     * @public
     **/
    public getColorStop(index: number): gtColorStop {
        if ( isNull(index) || isUndefined(index) ) {
            throw new TypeError('gtAbstractGradient::getColorStop(' + index + '): index could not be null or undefined');
        }

        if (index < 0 || index > this.colorstops.length-1) {
            throw new RangeError('gtAbstractGradient::getColorStop(' + index + '): Bad index value! Index must be an between >=0 and <=max count');
        }
       
        return this.colorstops[index];
    }

    /**
     * delete the <code>index</code> colorstop
     * 
     * if <code>index</code> null or undefined this function throw an TypeError exception
     * if <code>index</code> <0 or >max count this function throw an RangeError exception
     * if the count of colorstop == 1 this function return false
     * 
     * @param index: number                         the index
     * @return gtColorStop
     * @throw TypeError
     *        RangeError
     * @public
     **/
    public deleteColorStop(index: number): boolean {
        if ( this.colorstops.length <= 1 ) {
            return false;
        }

        if ( isNull(index) || isUndefined(index) ) {
            throw new TypeError('gtGradient::deleteColorStop(' + index + '): index could not be null or undefined');
        }

        if (index < 0 || index >= this.colorstops.length) {
            throw new RangeError('gtGradient::deleteColorStop(' + index + '): Bad index value! Index must be an between >=0 and <=max count');
        }
    
        this.colorstops.splice(index, 1); 
        return true;
    }
    
    /**
     * get count of <code>gtColorStop</code> colorstop
     * 
     * @return number
     * @public
     **/    
    public getColorStopCount(): number {
        return this.colorstops.length;    
    }

    setStyle(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    getAllNames(): String[] {
        throw new Error("Method not implemented.");
    }






    /**
     * load this gradient
     * 
     * @return number
     * @public
     **/    
    public load(name: string): void {
        if ( isNull(name) || isUndefined(name) ) {
            throw new RangeError('gtGradient::load(' + name + '): Bad name! Value must be between 0 and colorlist.length-1');
        }

        var gradname = name.trim();

        if ( gradname.length == 0 ) {
            throw new RangeError('gtGradient::load("' + name + '"): The name could not be blank or empty');
        }

        // TODO
        console.log("load a gradient from server with name '" + name + "'");        
        throw Error("gtGradient::load(): Not implemented yet");
    }

    /**
     * save this gradient
     * 
     * @return number
     * @public
     **/    
    public save(name: string): void {
        if ( isNull(name) || isUndefined(name) ) {
            throw new RangeError('gtGradient::save(' + name + '): Bad name! Name must be between 0 and colorlist.length-1');
        }

        var gradname = name.trim();

        if ( gradname.length == 0 ) {
            throw new RangeError('gtGradient::save("' + name + '"): The name could not be blank or empty');
        }

        // TODO
        console.log("save a gradient to server with name '" + name + "'");
        throw Error("gtGradient::save(): Not implemented yet");
    }

    /**
     * get all gradient names
     * 
     * TODO
     * 
     * @return Array<String> 
     * @public
     */
    public static getAllNames(): Array<String> {
        throw Error("gtGradient::getAllNames(): Not implemented yet");
    }

    public abstract draw(ctx): void 

    public abstract clone(): gtAbstractGradient;

    /**
     * equal
     * 
     * @param otherGradient: gtLinearGradient
     * @return boolean 
     * @public
     */
    public equals(otherGradient: IGradient): boolean {
        if ( isNull(otherGradient) || isUndefined(otherGradient) )
            return false;

        if ( this == otherGradient ) 
            return true;

        if ( this.name != otherGradient.getName() 
          || this.colorstops.length != otherGradient.getColorStopCount() ) {
            return false;
        }

        for(let index=0; index<this.colorstops.length; index++) {
            if ( !this.colorstops[index].equals( otherGradient.getColorStop(index) ) )
                return false;            
        }

        return true;
    }

    public abstract toSVG(): string;
    public abstract toCSS(): string;
}

//============================================= linear gradient =============================================
/**
 * the linear gradient
 * 
 * CSS:
 * 
 *      linear-gradient(
 *           [ <angle> | to <side-or-corner> ,]? <color-stop-list> )
 *          \---------------------------------/ \----------------------------/
 *            Definition of the gradient line        List of color stops  
 *
 *          where <side-or-corner> = [ left | right ] || [ top | bottom ]
 *            and <color-stop-list> = [ <linear-color-stop> [, <color-hint> ]? ]#, <linear-color-stop>
 *            and <linear-color-stop> = <color> [ <color-stop-length> ]?
 *            and <color-stop-length> = [ <percentage> | <length> ]{1,2}
 *            and <color-hint> = [ <percentage> | <length> ]
 * 
 *      @see https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient
 * 
 * 
 * Javascript:
 *      
 *      var canvas = document.getElementById('canvas');
 *      var ctx = canvas.getContext('2d');
 * 
 *      // Create a linear gradient
 *      // The start gradient point is at x=20, y=0
 *      // The end gradient point is at x=220, y=0
 *      var gradient = ctx.createLinearGradient(20,0, 220,0);
 * 
 *      // Add three color stops
 *      gradient.addColorStop(0, 'green');
 *      gradient.addColorStop(.5, 'cyan');
 *      gradient.addColorStop(1, 'green');
 * 
 *      // Set the fill style and draw a rectangle
 *      ctx.fillStyle = gradient;
 *      ctx.fillRect(20, 20, 200, 100);
 * 
 *      Parameter	Description
 *      x0	        The x-coordinate of the starting of the gradient
 *      y0	        The y-coordinate of the starting of the gradient
 *      x1	        The x-coordinate of the ending of the gradient
 *      y1	        The y-coordinate of the ending of the gradient
 * 
 *      @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
 * 
 * 
 * SVG:
 * 
 *      <linearGradient id="Gradient1">
 *          <stop id="stop1" offset="0%"/>
 *          <stop id="stop2" offset="50%"/>
 *          <stop id="stop3" offset="100%"/>
 *      </linearGradient>
 *      <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1"
 *                  xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Gradient1"/>
 * 
 *      Parameter	Description
 *      x0	        The x-coordinate of the starting of the gradient
 *      y0	        The y-coordinate of the starting of the gradient
 *      x1	        The x-coordinate of the ending of the gradient
 *      y1	        The y-coordinate of the ending of the gradient
 * 
 *      @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients
 * 
 * 
 * 
 * constructor( x1: number, y1: number, r1: number, x2: number, y2: number, r2: number, name?: string )
 *                                                          create a <code>gtRadialGradient</code>
 * constructor( x1: number, y1: number, x2: number, y2: number, name?: string )
 *                                                          create a <code>gtLinearGradient</stop>
 * 
 * setX1( x: number ): void                                 set x1 - the start position x for the gradient 
 * getX1(): number                                          get the x start position of the gradient
 * setY1( y: number ): void                                 set y1 - the start position y for the gradient 
 * getY1(): number                                          get the y start position of the gradient
 * setX2( x: number ): void                                 set x2 - the end position x for the gradient
 * getX2(): number                                          get the end position x of the gradient
 * setY2( y: number ): void                                 set y2 - the end position y for the gradient
 * getY2(): number                                          get y2 - the end position y for the gradient
 * 
 * draw(ctx): void                                          use the gradient
 * 
 * clone(): gtGradient                                      clone this gradient
 * equals(otherGradient: gtGradient): boolean               equal?
 * 
 * toSVG(): string                                          get the gradient to svg
 * toCSS(): string                                          get the gradient to css
 * 
 */
export class gtLinearGradient extends gtAbstractGradient  {
    public clone(): gtAbstractGradient {
        throw new Error("Method not implemented.");
    }
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;

    /**
     * create a <code>gtLinearGradient</stop>
     * 
     * The <code>position</code> must between 0 and 1
     * 
     * if <code>x1</code>, <code>y1</code>, <code>x2</code> or <code>y2</code> null or undefined this 
     * function throw an type error exception
     * 
     * @param x1: number                     the start position x for the gradient calculation
     * @param y1: number                     the start position y for the gradient calculation
     * @param x2: number                     the end position x for the gradient calculation
     * @param y2: number                     the end position y for the gradient calculation
     * @param name: number                   (optional) the name of the gradient                     
     * @return void
     * @public
     * @throw TypeError
     * 
     */
    constructor( x1: number, y1: number, x2: number, y2: number, name?: string ) {
        super(new gtColorStop(0.5, new gtColor(1)));

        this.setX1(x1);
        this.setY1(y1);
        this.setX2(x2);
        this.setY2(y2);
    }

    /**
     * set x1 - the start position x for the gradient
     * 
     * if <code>x</code> null or undefined this function throw an TypeError exception
     * 
     * @param x: number                      the x start position
     * @return void
     * @throw TypeError
     * @public
     **/
    public setX1( x: number ): void {
        if ( isNull(x) || isUndefined(x) ) {
            throw new TypeError('gtLinearGradient::setX1(' + x + '): could not be null or undefined');
        }

        this.x1 = x;        
    }    

    /**
     * get the x start position of the gradient
     * 
     * @return number
     **/
    public getX1(): number {
        return this.x1;        
    }    

    /**
     * set y1 - the start position y for the gradient
     * 
     * if <code>y</code> null or undefined this function throw an TypeError exception
     * 
     * @param y: number                      the y position 
     * @return void
     * @throw TypeError
     * @public
     **/
    public setY1( y: number ): void {
        if ( isNull(y) || isUndefined(y) ) {
            throw new TypeError('gtLinearGradient::setY1(' + y + '): could not be null or undefined');
        }

        this.y1 = y;        
    }    

    /**
     * get the y start position of the gradient
     * 
     * @return number
     * @public
     **/
    public getY1(): number {
        return this.y1;        
    }    

    /**
     * set x2 - the end position x for the gradient
     * 
     * if <code>x</code> null or undefined this function throw an TypeError exception
     * 
     * @param x: number                     x position
     * @return void
     * @throw TypeError
     * @public
     **/
    public setX2( x: number ): void {
        if ( isNull(x) || isUndefined(x) ) {
            throw new TypeError('gtLinearGradient::setX2(' + x + '): could not be null or undefined');
        }

        this.x2 = x;        
    }    

    /**
     * get the end position x of the gradient
     * 
     * @return number
     * @public
     **/
    public getX2(): number {
        return this.x2;        
    }    

    /**
     * set y2 - the end position y for the gradient
     * 
     * if <code>y</code> null or undefined this function throw an TypeError exception
     * 
     * @param name: string                      the name
     * @return void
     * @throw TypeError
     * @public
     **/
    public setY2( y: number ): void {
        if ( isNull(y) || isUndefined(y) ) {
            throw new TypeError('gtLinearGradient::setY1(' + y + '): could not be null or undefined');
        }

        this.y2 = y;        
    }    

    /**
     * get y2 - the end position y for the gradient
     * 
     * @return string
     * @public
     **/
    public getY2(): number {
        return this.y2;        
    }

    /**
     * create the linear gradient
     * 
     * @param ctx                                   the draw context 
     * @return void 
     * @public
     */
    protected createGradient( ctx ): void {
        return ctx.createLinearGradient(this.x1, this.y1, this.x2, this.y2);
    }

    /**
     * use the gradient
     * 
     * @param ctx                                   the draw context 
     * @return void 
     * @public
     */
    public draw(ctx): void {
        let gradient = this.createGradient( ctx );

        for(let index=0; index<this.getColorStopCount(); index++) {
            this.getColorStop(index).draw(gradient);
        }            
        
    }

    /**
     * clone this gradient
     * 
     * @return gtLinearGradient 
     * @public
     */
/*    
    public clone(): IGradient {
        let gradient: gtLinearGradient = new gtLinearGradient(this.x1, this.y1, this.x2, this.y2, this.name);

        for (let index=0; index<this.getColorStopCount(); index++) {
            var colorstop: gtColorStop = this.getColorStop(index).clone();
            gradient.addColorStop(colorstop);
        }

        return gradient;        
    }
*/
    /**
     * equal
     * 
     * @param otherGradient: gtLinearGradient
     * @return boolean 
     * @public
     */
    public equals(otherGradient: gtLinearGradient): boolean {
//        if (!super.equals(otherGradient))
//           return false;
        
        if ( this.x1 != otherGradient.x1
          || this.y1 != otherGradient.y1
          || this.x2 != otherGradient.x2
          || this.y2 != otherGradient.y2) {
            return false;
        }

        return true;
    }

    /**
     * get the linear gradient to svg
     * 
     * e.g. 
     *      <linearGradient id="test2" x1="1" y1="1" x2="100" y2="20">
     *          <stop offset="0.25" style="stop-color: rgb(0, 0, 1)" />
     *          <stop offset="0.5" style="stop-color: rgb(0, 0, 2)" />
     *          <stop offset="0.75" style="stop-color: rgb(0, 0, 3)" />
     *      </linearGradient>
     * 
     * @return string 
     * @public
     */
    public toSVG(): string {   
/*        
        let id: String = ( isNull(this.getName()) || isUndefined(this.getName()) ) ? "" : this.getName();

        id = id.replace(/\s/g, "");
            
        if ( id.length ) {
           id  = 'id="' + id + '" ';  
        }

        var str: string = '<linearGradient ' + id + 'x1="' + this.x1 + '" y1="' + this.y1 + '" x2="' + this.x2 + '" y2="' + this.y2 + '">';

        for(let index=0; index<this.getColorStopCount(); index++) {
            str = str.concat( this.getColorStop(index).toSVG() );
        }

        str += "</linearGradient>";

        return str;
*/        
        return "";
    }

    /**
     * get the linear gradient to css
     * 
     * e.g. linear-gradient(45deg, rgba(255,0,0,0) 25%, rgba(255,0,0,1) 50%); 
     * 
     * @return string 
     * @public
     */
    public toCSS(): string {
/*        
        var angelDeg: number = tmMath.angelDeg(this.x1, this.y1, this.x2, this.y2);
        var str: string = "linear-gradient(" + angelDeg + "deg";
        
        for(let index=0; index<this.getColorStopCount(); index++) {
           var colorstop: gtColorStop = this.getColorStop(index);
           str += ", " + colorstop.getColor().toRGBA() + " " + (colorstop.getStop() * 100) + "%";
        }

        return str + ");"; 
*/
        return "";        
    }
    
}

//============================================== radial gradient ============================================
/**
 * the radial gradient
 *
 * CSS:
 *      radial-gradient(
 *              [ [ circle || <length> ]                         [ at <position> ]? , |
 *                [ ellipse || [ <length> | <percentage> ]{2} ]  [ at <position> ]? , |
 *                [ [ circle | ellipse ] || <extent-keyword> ] [at <position> ]? , | at <position> ,
 *              ]?
 *          <color-stop-list> [ , <color-stop-list> ]+
 *      )
 * 
 *      where <extent-keyword> = closest-corner | closest-side | farthest-corner | farthest-side
 *      and <color-stop-list> = [ <linear-color-stop> [, <color-hint>? ]? ]#, <linear-color-stop>
 *      and <linear-color-stop> = <color> [ <color-stop-length> ]?
 *      and <color-stop-length> = [ <percentage> | <length> ]{1,2}
 *      and <color-hint> = [ <percentage> | <length> ]
 * 
 *      @see https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient
 * 
 * 
 * Javascript:
 *      
 *      var c = document.getElementById("myCanvas");
 *      var ctx = c.getContext("2d");
 * 
 *      var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
 *      grd.addColorStop(0, "red");
 *      grd.addColorStop(1, "white");
 * 
 *      // Fill with gradient
 *      ctx.fillStyle = grd;
 *      ctx.fillRect(10, 10, 150, 100);
 *  
 * 
 *      Parameter	Description
 *      x0	        The x-coordinate of the starting circle of the gradient
 *      y0	        The y-coordinate of the starting circle of the gradient
 *      r0	        The radius of the starting circle
 *      x1	        The x-coordinate of the ending circle of the gradient
 *      y1	        The y-coordinate of the ending circle of the gradient
 *      r1	        The radius of the ending circle
 * 
 *      @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
 * 
 * 
 * SVG:
 * 
 *      <radialGradient id="c1" cx="0.5" cy="0.5" r="0.5">
 *          <stop offset="0" stop-color="hsl(0,0%,100%)" stop-opacity="0.7"/>
 *          <stop offset="0.8" stop-color="hsl(0,0%,100%)" stop-opacity="0" />
 *      </radialGradient>
 *      <circle cx="100" cy="100" r="100" fill="hsl(10,80%,70%)" />
 *      <circle cx="76" cy="84" r="70" fill="url(#c1)" />
 * 
 *      Parameter	Description
 *      cx	        The x-coordinate distance to the center
 *      cy	        The y-coordinate distance to the center
 *      r	        The radius of from the Point cx / cy
 * 
 *      @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients
 * 
 * constructor( x1: number, y1: number, r1: number, x2: number, y2: number, r2: number, name?: string )
 *                                                          create a <code>gtRadialGradient</code>
 * 
 */
export class gtRadialGradient extends gtLinearGradient {
    public clone(): gtAbstractGradient {
        throw new Error("Method not implemented.");
    }
    private r1: number;
    private r2: number;

    /**
     * create a <code>gtRadialGradient</stop>
     * 
     * if <code>x1</code>, <code>y1</code>, <code>r1</code>, <code>x2</code>, <code>y2</code> or <code>r2</code>
     * null or undefined this function throw an type error exception
     * 
     * @param x1: number                     the start position x for the gradient calculation
     * @param y1: number                     the start position y for the gradient calculation
     * @param r1: number                     The radius of the starting circle
     * @param x2: number                     the end position x for the gradient calculation
     * @param y2: number                     the end position y for the gradient calculation
     * @param r2: number                     The radius of the ending circle
     * @param name: number                   (optional) the name of the gradient                     
     * @return void
     * @public
     * @throw TypeError
     * 
     */
    constructor( x1: number, y1: number, r1: number, x2: number, y2: number, r2: number, name?: string ) {
        super(x1, y1, x2, y2, name);
        this.setR1(r1);
        this.setR2(r2);
    }

    /**
     * set r1 - The radius of the starting circle
     * 
     * if <code>x</code> null or undefined this function throw an TypeError exception
     * 
     * @param x: number                      the x start position
     * @return void
     * @throw TypeError
     * @public
     **/
    public setR1( r: number ): void {
        if ( isNull(r) || isUndefined(r) ) {
            throw new TypeError('gtRadialGradient::setR1(' + r + '): could not be null or undefined');
        }

        this.r1 = r;        
    }    

    /**
     * get The radius of the starting circle
     * 
     * @return number
     **/
    public getR1(): number {
        return this.r1;        
    } 

    /**
     * set r2 - The radius of the ending circle
     * 
     * if <code>x</code> null or undefined this function throw an TypeError exception
     * 
     * @param x: number                      the x start position
     * @return void
     * @throw TypeError
     * @public
     **/
    public setR2( r: number ): void {
        if ( isNull(r) || isUndefined(r) ) {
            throw new TypeError('gtRadialGradient::setR2(' + r + '): could not be null or undefined');
        }

        this.r2 = r;        
    }    

    /**
     * get The radius of the ending circle
     * 
     * @return number
     **/
    public getR2(): number {
        return this.r2;        
    } 

    /**
     * create the raidal gradient
     * 
     * @param ctx                                   the draw context 
     * @return void 
     * @public
     */
    protected createGradient( ctx ): void {
        ctx.createRadialGradient(this.getX1(), this.getY1(), this.r1, this.getX2(), this.getY2, this.r2)
    }

    /**
     * get the radial gradient to svg
     * 
     * e.g. 
     *      <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
     *          <stop offset="0%" style="stop-color:rgb(255,255,255); stop-opacity:0" />
     *          <stop offset="100%" style="stop-color:rgb(0,0,255); stop-opacity:1" />
     *      </radialGradient>
     *  
     * @return string 
     * @public
     */
    public toSVG(): string {   
/*        
        let id: String = ( isNull(this.name) || isUndefined(this.name) ) ? "" : this.name;

        id = id.replace(/\s/g, "");
            
        if ( id.length ) {
           id  = 'id="' + id + '" ';  
        }

        var str: string = '<linearGradient ' + id + 'x1="' + this.x1 + '" y1="' + this.y1 + '" x2="' + this.x2 + '" y2="' + this.y2 + '">';

        for(let index=0; index<this.colorstops.length; index++) {
            str = str.concat( this.colorstops[index].toSVG() );
        }

        str += "</linearGradient>";

        return str;
*/
        return "";        
    }

    /**
     * get the radial gradient to css
     * 
     * e.g. linear-gradient(45deg, rgba(255,0,0,0) 25%, rgba(255,0,0,1) 50%); 
     * 
     * @return string 
     * @public
     */
    public toCSS(): string {
/*        
        var angelDeg: number = tmMath.angelDeg(this.x1, this.y1, this.x2, this.y2);
        var str: string = "linear-gradient(" + angelDeg + "deg";
        
        for(let index=0; index<this.colorstops.length; index++) {
           var colorstop: gtColorStop = this.colorstops[index];
           str += ", " + colorstop.getColor().toRGBA() + " " + (colorstop.getStop() * 100) + "%";
        }

        return str + ");"; 
*/
        return "";         
    }

}
