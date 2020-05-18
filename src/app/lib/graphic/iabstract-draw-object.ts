/*-------------------------------------------------------------------------------	
 * BPMN Designer	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { IRect } from '../geometric/irect';

export interface IAbstractDrawObject {
    getRect() : IRect;
    draw(ctx: CanvasRenderingContext2D) : void; 
}
