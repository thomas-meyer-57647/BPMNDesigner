/*-------------------------------------------------------------------------------	
 * BPMN Designer	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { IRect } from '../../geometric/irect';
import { IAbstractDrawObject } from '../iabstract-draw-object';

/**
 * this is the base class for every draw object
 * 
 * private bound_rect : Rect                                        the bound rect   
 * protected _dirty: boolean = true                                 calc the bound rect new?
 * 
 * constructor()
 *
 * protected _calcRect() : Rect                                     calc the Rect
 * protected _dirty(): void                                         set dirty from outside
 * protected _isDirty() : boolean                                   check if the bound rect dirty
 * public getRect() : Rect                                          check if the rect is dirty and call if dirty, the protected function _calcRect() : Rect
 * 
 * abstract draw() : void                                           the draw method  
 */
export abstract class gtAbstractDrawObject implements IAbstractDrawObject {
    private bound_rect : IRect;   
    private dirty: boolean = true;

    /**
     * the default constructor
     */
    constructor() {
    }
 
    /**
     * This function will be called from getRect() : Rect if the rect is dirty.
     * This function must be defined for calc the rect.
     * 
     * @return Rect                   the calced Rect
     * @protected
     */
    protected abstract _calcRect(): IRect;

    /**
     * set dirty
     * 
     * @return void
     * @public
     */
    protected _dirty(): void {
      this.dirty = true;
    }

    /**
     * check if the bound rect dirty+
     * 
     * @return boolean
     * @public
     */
    protected _isDirty() : boolean {
      return this.dirty;
    }

    /**
     * get the Rect. This function call the protected function _calcRect(), if the rect is diry
     * 
     * @return Rect
     * @public
     */
    public getRect(): IRect {
      if (this._dirty) {
        this.bound_rect = this._calcRect();
        this.dirty = false;
      }

      return this.bound_rect;
    }

    /**
     * the draw method
     * 
     * @param ctx: CanvasRenderingContext2D                 the context
     * @return void
     * @public
     */
    public abstract draw(ctx: CanvasRenderingContext2D): void;
}
