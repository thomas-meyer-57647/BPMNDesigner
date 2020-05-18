/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     geometric toolbox
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/

/**
 * the interface for class point
 */
export interface IPoint {
    setX(x: number): void;                   
    getX(): number;                          
    setY(y: number): void;                   
    getY(): number;                          
    setXY(x: number, y: number): void;       
    clone() : IPoint;                         
    equals(point : IPoint) : boolean;           
}
