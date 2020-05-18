/*-------------------------------------------------------------------------------	
 * BPMN Designer	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { IStyle } from './istyle';
import { gtColorStop } from './impl/gradient';

 /**
  * this is the interface for all gradients
  */
export interface IGradient extends IStyle {

    setName( name: string ): void;
    getName(): string;
    
    setID( id: string ): void;
    getID(): string;

    addColorStop( colorstop: gtColorStop ): number;
    getColorStop(index: number): gtColorStop;
    deleteColorStop(index: number): boolean;
    getColorStopCount(): number;

    load(name: string): void;
    save(name: string): void;
    getAllNames(): Array<String>

    draw(ctx: CanvasRenderingContext2D): void 
    
    clone(): IGradient;
    equals(otherGradient: IGradient): boolean

    toSVG(): string;
    toCSS(): string;
    
}
