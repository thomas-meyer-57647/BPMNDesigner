/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     graphic toolbox
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { gtMatrix } from '../../geometric/impl/matrix';
import { isNull } from 'util';

 /**
 * this is the abstract class for <code>Pattern</code> and <code>Image</code>
 * 
 * String newFilename					the filename on the server
 * String originalFilename				the original filename 
 * Matrix matrix						the matrix for the transformation of the pattern
 */
export abstract class Abstractimage {
    private image;
    private newFilename: string;
    private originalFilename: string;
    protected matrix: gtMatrix = new gtMatrix();

    /**
     * initialize constructor
     * 
     * @param abstractImage          - a abstract Image
     */
    constructor (abstractImage?: Abstractimage) {
        if ( !isNull(abstractImage) ) {
            this.image = abstractImage.image;
            this.newFilename = abstractImage.newFilename;
            this.originalFilename = abstractImage.originalFilename;
            this.matrix = new gtMatrix(abstractImage.matrix);
        }
    }

    /**
     * get the new filename
     * 
     * @return string
     */
    public getNewFilename(): string {
        return this.newFilename;
    }

    /**
     * set the new filename
     * 
     * @param string
     * @return void
     */
    public setNewFilename(newFilename: string): void {
        this.newFilename = newFilename;
    }

    /**
     * get the original filename
     * 
     * @return string
     */
    public getOrgFilename(): string {
        return this.originalFilename;
    }

    /**
     * set the orginial filename
     * 
     * @param string
     * @return void
     */
    public setOrgFilename(originalFilename: string): void {
        this.originalFilename= originalFilename;
    }

    /**
     * set the matrix
     * 
     * NOTE 
     * This function create a copy of the given Matrix and use it
     * 
     * @return Matrix
     */
    public setMatrix(matrix: gtMatrix): void {
        this.matrix = new gtMatrix(matrix);    
    }

    /**
     * get the image
     * 
     * @return image
     */
    public getImage() {
        return this.image;
    }

    /**
     * set the image
     * 
     * @param image
     */
    public setImage(image) {
        this.image = image;
    }

    /**
     * flip the image at the horizontal line
     * 
     * @return void 
     */
    public flipX() {
        this.matrix = this.matrix.flipX();
    }

    /**
     * flip the image at the vertical line
     * 
     * @return void 
     */
    public flipY(): void {
        this.matrix = this.matrix.flipY();
    }

    /**
     * reset the matrix
     * 
     * @param abstractImage 
     */
    public resetMatrix(): void {
        this.matrix.reset();
    }

    /**
	 * Rotates current matrix accumulative by angle.
     * 
     * <code>angle</code>
     *          The rotation angle, clockwise in radians. 
     *          For degress use <code>rotateDeg(angle)
     * 
	 * @param {number} angle    - angle in radians
     * @return void 
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
	 */
	public rotate(angle: number): void {
        this.matrix = this.matrix.rotate(angle);
	}

    /**
     * rotate current angel by accumulative angle
     * 
     * @param angle: number     - angle in degrees
     * @return void              
     */
	public rotateDeg(angle: number): void {
		this.matrix = this.matrix.rotateDeg(angle);
    }
    
	/**
	 * Converts a vector given as x and y to angle, and rotates (accumulative).
     * 
	 * @param x
	 * @param y
     * @return void 
	 */
	public rotateFromVector(x: number , y: number): void {
		this.matrix = this.matrix.rotateFromVector(x, y);
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
     * @return void 
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
     */
    public scale(sx: number, sy: number) : void {
        this.matrix = this.matrix.scale(sx, sy);
    }

	/**
	 * Apply shear to the current matrix accumulative.
     * 
	 * @param sx: number - amount of shear for x
	 * @param sy: number - amount of shear for y
     * @return void
	 */
	public shear(sx, sy): void {
        this.matrix = this.matrix.shear(sx, sy);
	}

	/**
	 * Apply shear for x to the current matrix accumulative.
     * 
	 * @param sx: number - amount of shear for x
     * @return void
	 */
	public shearX(sx): void {
        this.matrix = this.matrix.shearX(sx);
    }

    /**
	 * Apply shear for y to the current matrix accumulative.
     * 
	 * @param sy: number - amount of shear for y
     * @return void
	 */
	public shearY(sy): void {
        this.matrix = this.matrix.shearY(sy);
    }

    /**
	 * Apply skew to the current matrix accumulative.
     * 
	 * @param ax: number - angle of skew for x
	 * @param ay: number - angle of skew for y
     * @return void
	 */
	public skew(ax, ay): void {
        this.matrix = this.matrix.shear(Math.tan(ax), Math.tan(ay));
	}

	/**
	 * Apply skew for x to the current matrix accumulative.
     * 
	 * @param ax: number - angle of skew for x
     * @return void
	 */
	public skewX(ax): void {
		this.matrix = this.matrix.shearX(Math.tan(ax));
    }

    /**
	 * Apply skew for y to the current matrix accumulative.
     * 
	 * @param ay: number - angle of skew for y
     * @return void
	 */
	public skewY(ay): void {
		this.matrix = this.matrix.shearY(Math.tan(ay));
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
     * @return void
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
     */
    public translate(tx: number, ty: number): void {
        this.matrix = this.matrix.translate(tx, ty);
    }

    /**
     * Translate current matrix on x axis and return the new matrix
     * 
     * @param tx: number 
     * @return void
     * @see translate 
     */
    public translateX(tx: number): void {
        this.matrix = this.matrix.translateX(tx);
    } 

    /**
     * Translate current matrix on y axis and return the new matrix
     * 
     * @param ty: number 
     * @return void
     * @see translate 
     */
    public translateY(ty: number): void {
        this.matrix = this.matrix.translateY(ty);
    }

    /**
     * is this class equals to the given Matrix
     * 
     * @param matrix: Matrix
     * @return boolean          - true, if this equals
     */
    public equals(abstractImage: Abstractimage): boolean {
        return ( this.newFilename ==  abstractImage.getNewFilename()
            &&   this.originalFilename == abstractImage.getOrgFilename()
//            &&   this.image == abstractImage.image
            &&   this.matrix.equals(abstractImage.matrix) );
    }

    /**
     * get to the svg
     * 
     * @return String
     */
    public abstract toSVG(): String;

    /**
     * get to the JSON
     * 
     * @return String
     */
    public abstract toJSON(): String;

    /**
     * get to the string
     * 
     * @return String
     */
    public toString(): string {
        return "AbstractImage [newFilename=" + this.newFilename + ", originalFilename=" + this.originalFilename 
            + ", matrix=" + this.matrix.toString() + "]";   
    }

    
}
