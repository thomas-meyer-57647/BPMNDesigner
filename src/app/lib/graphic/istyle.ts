/*-------------------------------------------------------------------------------	
 * BPMN Designer	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/

/**
 * this is the interface for all stroke styles
 */
export interface IStyle {
    setStyle(ctx: CanvasRenderingContext2D): void;
}
