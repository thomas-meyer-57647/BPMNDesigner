/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     graphic toolbox
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { gtPoint } from '../../geometric/impl/point';
import { isNull, isUndefined } from 'util';

/**
 * this class extends the javascript math functions
 */
export class gtMath {

    /**
     * calc the angle of two points
     * 
     * if <code>x1</code>, <code>y1</code>, <code>x2</code>, <code>y2</code> null or undefined
     * this function throw an TypeError exception
     * 
     * @param x1: number        x coord of point 1
     * @param y1: number        y coord of point 1
     * @param x2: number        x coord of point 2
     * @param y2: number        y coord of point 2
     * @return number
     * @static
     */
    public static angleDeg(x1: number, y1: number, x2: number, y2: number): number {
        if ( isNull(x1) || isUndefined(x1)
          || isNull(y1) || isUndefined(y1)
          || isNull(x2) || isUndefined(x2)
          || isNull(y2) || isUndefined(y2) ) {
            throw new TypeError("gtMath:angleDeg(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + "): params could not be null or undefined ");
        }

        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }

    /**
     * calc the angle of two points
     * 
     * if <code>p1</code> or <code>p2</code> null or undefined this function throw an TypeError exception
     * 
     * @param p1: number        point 1
     * @param p2: number        point 2
     * @return number
     * @static
     */
    public static angleDegPoint(p1: gtPoint, p2: gtPoint): number {
        if ( isNull(p1) || isUndefined(p1)
          || isNull(p2) || isUndefined(p2) ) {
            throw new TypeError("gtMath:angleDeg(" + p1.toString() + ", " + p2.toString() + "): params could not be null or undefined ");
        }

        return gtMath.angleDeg(p1.getX(), p1.getY(), p2.getX(), p2.getY());
    }
}
