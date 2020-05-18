/*-------------------------------------------------------------------------------	
 * Graphic Toolbox	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		0.9.1
 --------------------------------------------------------------------------------*/

 /**
 * this is the class to define the combination for a line dash
 * 
 * constructor
 *
 * static createSolidLineDash() : LineDash            create solid line dash 
 * static createDottedLineDash() : LineDash           create dotted line dash
 * static createStrokeLineDash() : LineDash           create stroke line dash
 * static createLargeLineDash() : LineDash            create large stroke line dash
 * static createDotStrokeLineDash() : LineDash        create dot stroke line dash 
 * static create3DotStrokeLineDash() : LineDash       create 3 dot stroke line dash 
 * static createMorseLineDash() : LineDash            create morse stroke line dash
 * 
 * public clone(): LineDash                           clone this object
 * public equal(linedash : LineDash): boolean         compare the objects
 */
export class gtLineDash {

    public pattern : Array<number>;                 
}
