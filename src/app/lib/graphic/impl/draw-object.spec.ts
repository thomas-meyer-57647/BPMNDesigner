/*-------------------------------------------------------------------------------	
 * BPMN Designer	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { gtDrawObject } from "./draw-object";

class TestDrawObject extends gtDrawObject {
  protected _calcRect(): import("../../geometric/irect").IRect {
    throw new Error("Method not implemented.");
  }
}

describe('gtDrawObject', () => {
  it('should create an instance', () => {
    expect(new TestDrawObject()).toBeTruthy();
  });
});
