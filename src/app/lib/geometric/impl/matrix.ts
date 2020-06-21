/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     graphic toolbox
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/

import { isNull } from 'util';

/**
 * this file includes the <code>matrix</code> where was used from the graphic toolbox
 * 
 * the matrix is build by:
 * 
 *      a | c | e
 *      b | d | f
 *      0 | 0 | 1
 * 
 * a (m11)				Horizontal scaling. A value of 1 results in no scaling.
 * b (m12)				Vertical skewing.
 * c (m21)				Horizontal skewing.
 * d (m22)				Vertical scaling. A value of 1 results in no scaling.
 * e (dx)				Horizontal translation (moving).
 * f (dy)				Vertical translation (moving).
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
 * 
 * This class based on
 * @see https://github.com/deoxxa/transformation-matrix-js/blob/master/src/matrix.js
 * @see https://github.com/pawlufelice/transformation-matrix-js
 * @see https://github.com/pawlufelice/transformation-matrix-js/blob/master/src/matrix.js
 */
export class gtMatrix {
    private a : number = 1;
    private b : number = 0;
    private c : number = 0;
    private d : number = 1;
    private e : number = 0;
    private f : number = 0;

    /**
     * the default constructor
     */
    constructor(matrix?: gtMatrix) {
        if ( !isNull(matrix) ) {
            this.a = matrix.a;
            this.b = matrix.b;
            this.c = matrix.c;
            this.d = matrix.d;
            this.e = matrix.e;
            this.f = matrix.f;
        }         
    }

    /**
     * If context is defined, the current matrix is ​​applied to the context to synchronize it
     * 
     * @return gtMatrix
     */
/*    
    private synchronize() : gtMatrix {
		if (this.context)
            this.context.setTransform(
                this.a, 
                this.b, 
                this.c, 
                this.d, 
                this.e, 
                this.f);
            
		return this;
    }
*/

    /**
     * create a matrix by his segments
     *
     * @param context               the CanvasRenderingContext2D 
     * @param a: number             
     * @param b: number 
     * @param c: number
     * @param d: number
     * @param e: number
     * @param f: number
     * 
     * @return gtMatrix 
     */
    public static creategtMatrix(
        a : number,
        b : number,
        c : number,
        d : number,
        e : number,
        f : number) : gtMatrix {
        var newgtMatrix: gtMatrix = new gtMatrix();

        newgtMatrix.setA(a);
        newgtMatrix.setB(b);
        newgtMatrix.setC(c);
        newgtMatrix.setD(d);
        newgtMatrix.setE(e);
        newgtMatrix.setF(f);
                
        return newgtMatrix;
    } 

    /**
     * get the value for matrix segment a
     * 
     * @preturn number
     */
    public getA() : number {
        return this.a;
    }

    /**
     * set the value for matrix segment a.  This function did not the synchronize it to the
     * context canvas
     * 
     * @param a: number
     * @return void
     */
    public setA(a: number) : void {
        this.a = a;
    }

    /**
     * get the value for matrix segment b
     * 
     * @preturn number
     */
    public getB() : number {
        return this.b;
    }

    /**
     * set the value for matrix segment b. This function did not the synchronize it to the
     * context canvas
     * 
     * @param b: number
     * @return void
     */
    public setB(b: number) : void {
        this.b = b;
    }

    /**
     * get the value for matrix segment c
     * 
     * @preturn number
     */
    public getC() : number {
        return this.c;
    }

    /**
     * set the value for matrix segment c. This function did not the synchronize it to the
     * context canvas
     * 
     * @param c: number
     * @return void
     */
    public setC(c: number) : void {
        this.c = c;
    }

    /**
     * get the value for matrix segment d
     * 
     * @preturn number
     */
    public getD() : number {
        return this.d;
    }

    /**
     * set the value for matrix segment d. This function did not the synchronize it to the
     * context canvas
     * 
     * @param d: number
     * @return void
     */
    public setD(d: number) : void {
        this.d = d;
    }

    /**
     * get the value for matrix segment e. 
     * 
     * @preturn number
     */
    public getE() : number {
        return this.e;
    }

    /**
     * set the value for matrix segment f. This function did not the synchronize it to the
     * context canvas
     * 
     * @param e: number
     * @return void
     */
    public setE(e: number) : void {
        this.e = e;
    }

    /**
     * get the value for matrix segment f
     * 
     * @preturn number
     */
    public getF() : number {
        return this.f;
    }

    /**
     * set the value for matrix segment f
     * 
     * @param f: number
     * @return void
     */
    public setF(f: number) : void {
        this.f = f;
    }

    /**
     * flip at the horizontal line
     * 
     * @return gtMatrix
     */
    public flipX(): gtMatrix {
        return this.transform(-1, 0, 0, 1, 0, 0); 
    }

	/**
	 * Flips the vertical values.
     * 
     * @return gtMatrix
	 */
	public flipY(): gtMatrix {
		return this.transform(1, 0, 0, -1, 0, 0);
    }

	/**
	 * reset the current matrix accumulative.
     * 
     * @return gtMatrix
	 */
    public reset() {
        return this.setTransform(1, 0, 0, 1, 0, 0);
    }
   
	/**
	 * Apply shear to the current matrix accumulative.
     * 
	 * @param sx: number - amount of shear for x
	 * @param sy: number - amount of shear for y
     * @return gtMatrix
	 */
	public shear(sx, sy): gtMatrix {
		return this.transform(1, sy, sx, 1, 0, 0);
	}

	/**
	 * Apply shear for x to the current matrix accumulative.
     * 
	 * @param sx: number - amount of shear for x
     * @return gtMatrix
	 */
	public shearX(sx): gtMatrix {
		return this.transform(1, 0, sx, 1, 0, 0);
    }

    /**
	 * Apply shear for y to the current matrix accumulative.
     * 
	 * @param sy: number - amount of shear for y
     * @return gtMatrix
	 */
	public shearY(sy): gtMatrix {
		return this.transform(1, sy, 0, 1, 0, 0);
    }
        
    /**
	 * Apply skew to the current matrix accumulative.
     * 
	 * @param ax: number - angle of skew for x
	 * @param ay: number - angle of skew for y
     * @return gtMatrix
	 */
	public skew(ax, ay): gtMatrix {
		return this.shear(Math.tan(ax), Math.tan(ay));
	}

	/**
	 * Apply skew for x to the current matrix accumulative.
     * 
	 * @param ax: number - angle of skew for x
     * @return gtMatrix
	 */
	public skewX(ax): gtMatrix {
		return this.shearX(Math.tan(ax));
    }

    /**
	 * Apply skew for y to the current matrix accumulative.
     * 
	 * @param ay: number - angle of skew for y
     * @return gtMatrix
	 */
	public skewY(ay): gtMatrix {
		return this.shearY(Math.tan(ay));
    }
    
	/**
	 * Rotates current matrix accumulative by angle.
     * 
     * <code>angle</code>
     *          The rotation angle, clockwise in radians. 
     *          For degress use <code>rotateDeg(angle)
     * 
	 * @param {number} angle    - angle in radians
     * @return gtMatrix           - the accumulated matrix 
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
	 */
	public rotate(angle: number): gtMatrix {
		var cos = Math.cos(angle);
        var	sin = Math.sin(angle);
        
		return this.transform(cos, sin, -sin, cos, 0, 0);
	}

    /**
     * rotate current angel by accumulative angle
     * 
     * @param angle: number     - angle in degrees
     * @return gtMatrix           - the accumulated matrix 
     */
	public rotateDeg(angle: number): gtMatrix {
		return this.rotate(angle * Math.PI / 180);
    }
    
	/**
	 * Converts a vector given as x and y to angle, and rotates (accumulative).
     * 
	 * @param x
	 * @param y
     * @return gtMatrix           - the accumulated matrix 
	 */
	public rotateFromVector(x: number , y: number): gtMatrix {
		return this.rotate( Math.atan2(y, x) );
    }
    
    /**
     * Scales current matrix accumulative.
     * 
     * By default, one unit on the canvas is exactly one pixel. A scaling transformation modifies
     * this behavior. For instance, a scaling factor of 0.5 results in a unit size of 0.5 pixels; 
     * shapes are thus drawn at half the normal size. Similarly, a scaling factor of 2.0 increases
     * the unit size so that one unit becomes two pixels; shapes are thus drawn at twice the normal
     * size.
     * 
     *      sx      Scaling factor in the horizontal direction. A negative value flips pixels across
     *              the vertical axis. A value of 1 results in no horizontal scaling.
     *      sy      Scaling factor in the vertical direction. A negative value flips pixels across
     *              the horizontal axis. A value of 1 results in no vertical scaling.
     * 
	 * @param sx: number       - scale factor x (1 does nothing)
	 * @param sy: number       - scale factor y (1 does nothing)     
     * @return gtMatrix           - the accumulated matrix 
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
     */
    public scale(sx: number, sy: number) : gtMatrix {
        return this.transform(sx, 0, 0, sy, 0, 0);
    }

    /**
     * translate
     * 
     * adds a translation transformation to the current matrix and returns the new matrix
     * 
     *      tx      Distance to move in the horizontal direction. Positive values are to the right, 
     *              and negative to the left.
     *      ty      Distance to move in the vertical direction. Positive values are down, and
     *              negative are up.
     *
     * @param tx: number
     * @param ty: number
     * @return gtMatrix - the new matrix
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
     */
    public translate(tx: number, ty: number): gtMatrix {
        return this.transform(1, 0, 0, 1, tx, ty);
    }

    /**
     * Translate current matrix on x axis and return the new matrix
     * 
     * @param tx: number 
     * @return gtMatrix - the new matrix
     * @see translate 
     */
    public translateX(tx: number): gtMatrix {
        return this.transform(1, 0, 0, 1, tx, 0);
    } 

    /**
     * Translate current matrix on y axis and return the new matrix
     * 
     * @param ty: number 
     * @return gtMatrix - the new matrix
     * @see translate 
     */
    public translateY(ty: number): gtMatrix {
        return this.transform(1, 0, 0, 1, 0, ty);
    }

	/**
	 * Set values to this matrix, synchronize it and return this matrix
     * 
	 * @param a: number - scale x
	 * @param b: number - shear y
	 * @param c: number - shear x
	 * @param d: number - scale y
	 * @param e: number - translate x
	 * @param f: number - translate y
	 */
	setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {

		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.e = e;
        this.f = f;
        
    }
    
    /**
	 * Multiplies current matrix with new matrix values
     * 
	 * @param a: number - scale x
	 * @param b: number - shear y
	 * @param c: number - shear x
	 * @param d: number - scale y
	 * @param e: number - translate x
	 * @param f: number - translate y
     * @return gtMatrix
	 */
    public transform(a: number, b: number, c: number, d: number, e: number, f: number) : gtMatrix {
        var matrix: gtMatrix = new gtMatrix();

		matrix.setA(this.a * a + this.c * b);
		matrix.setB(this.b * a + this.d * b);
		matrix.setC(this.a * c + this.c * d);
		matrix.setD(this.b * c + this.d * d);
		matrix.setE(this.a * e + this.c * f + this.e);
		matrix.setF(this.b * e + this.d * f + this.f);

        return matrix; // .synchronize();
    }    

    /**
	 * Multiplies current matrix with new matrix
     * 
	 * @param matrix: gtMatrix - the new matrix
     * @return gtMatrix
	 */
    public transformgtMatrix(matrix: gtMatrix): gtMatrix {
        return this.transform(matrix.getA(), matrix.getB(), matrix.getC(), matrix.getD(), matrix.getE(), matrix.getF());
    }
    
    /**
	 * if the matrix equals to the given matrix?
     * 
	 * @param matrix: gtMatrix - the compare matrix
     * @return boolean
	 */
    public equals(matrix: gtMatrix): boolean {
        return ( this.a === matrix.a
            &&   this.b === matrix.b
            &&   this.c === matrix.c
            &&   this.d === matrix.d
            &&   this.e === matrix.e
            &&   this.f === matrix.f)
    }

	/**
	 * Returns an array with current matrix values.
     * 
	 * @returns {Array}
	 */
	public toArray(): {a: Number, b: Number, c: Number, d: Number, e: Number, f: Number } {
        return {
            a: this.a, 
            b: this.b, 
            c: this.c, 
            d: this.d, 
            e: this.e, 
            f: this.f
        };
    }

    /**
     * return the matrix as a svg matrix
     * 
     * @return string
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
     */
    public toSVG() : string {
        return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " 
                    + this.e + ", " + this.f + ")";
    }

    /**
     * return the matrix as a SVGgtMatrix
     * 
     * @return string
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
     * 
     * Browser compatibility
     * 
     *      Chrome:                     yes
     *      Edge:                       12
     *      Firefox:                    yes
     *      Internet Explorer:          9
     *      Opera:                      yes
     *      Safari:                     yes
     *      Android:                    yes
     *      Chrome for Android:         yes
     *      Firefox for Android:        yes
     *      Opera for Android:          ?
     *      Safari on iOS:              ?
     *      Samsung Internet:           yes
     */
    public toSVGMatrix(): SVGMatrix {
        var svggtMatrix: SVGMatrix = new SVGMatrix();

        svggtMatrix.a = this.a;
        svggtMatrix.b = this.b;
        svggtMatrix.c = this.c;
        svggtMatrix.d = this.d;
        svggtMatrix.e = this.e;
        svggtMatrix.f = this.f;

        return svggtMatrix;
    }

    /**
     * return the matrix as a json string
     * 
     * @return string
     */
    public toJSON() : string {
        return '"gtMatrix": { "a": ' + this.a + ', "b": ' + this.b + ', "c": ' + this.c 
                    + ', "d": ' + this.d + ', "e": ' + this.e + ', "f": ' + this.f + '}';
    }

    /**
     * to string
     * 
     * @return string
     */
    public toString() : string {
        return "gtMatrix [a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d 
                    + ", e=" + this.e + ", f=" + this.f + "]";
    }

}
