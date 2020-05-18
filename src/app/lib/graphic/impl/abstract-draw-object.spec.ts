/*-------------------------------------------------------------------------------	
 * BPMN Designer - Graphic Toolbox	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { gtAbstractDrawObject } from './abstract-draw-object';
import { gtRect } from '../../geometric/impl/rect';
import { IRect } from '../../geometric/irect';

// Test Class
class TestAbstractDrawObjectClass extends gtAbstractDrawObject {
  protected _calcRect(): IRect {
    return new gtRect(1, 2, 3, 4);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
}

/**
 * this is the test functions for the abstractDrawObject
 */
describe('AbstractDrawObject', () => {
  it('should create an instance', () => {
    expect(new TestAbstractDrawObjectClass()).toBeTruthy();
  });
});
