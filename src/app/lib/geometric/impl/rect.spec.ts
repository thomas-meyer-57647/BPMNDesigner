/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     geometric toolbox
 * @version		  1.0.0
 * @since		    1.0.0
 --------------------------------------------------------------------------------*/
import { gtRect } from './rect';
import { IPoint } from '../ipoint';
import { gtPoint } from './point';
import { IRect } from '../irect';

/**
 * this is the test class for lib\geometric\impl\rect
 * 
 * constructor(null, 2, 4, 5): should throw an exception
 * constructor(1, null, 4, 5): should throw an exception
 * constructor(1, 2, null, 5): should throw an exception
 * constructor(1, 2, 4, null): should throw an exception
 * constructor(undefined, 2, 4, 5): should throw an exception
 * constructor(1, undefined, 4, 5): should throw an exception
 * constructor(1, 2, undefined, 5): should throw an exception
 * constructor(1, 2, 4, undefined): should throw an exception
 * constructor(1, 2, 4, 5): should create an instance
 * 
 * setLeft(null): should throw an exception
 * setLeft(undefined): should throw an exception
 * setLeft(5): should work
 * getLeft(): should return a value
 * 
 * setTop(null): should throw an exception
 * setTop(undefined): should throw an exception
 * setTop(5): should work
 * getTop(): should return a value
 * 
 * setHeight(null): should throw an exception
 * setHeight(undefined): should throw an exception
 * setHeight(5): should work
 * getHeight(): should return a value
 * 
 * setWidth(null): should throw an exception
 * setWidth(undefined): should throw an exception
 * setWidth(5): should work
 * getWidth(): should return a value
 * 
 * setRight(null): should throw an exception
 * setRight(undefined): should throw an exception
 * setRight(8): should be set right width left < right
 * setRight(0): should be set right width left > right
 * getRight(): should return a value
 * 
 * setBottom(null): should throw an exception
 * setRight(undefined): should throw an exception
 * setBottom(8): should be set bottom width top < bottom
 * setBottom(0): should be set bottom width top > bottom
 * getBottom(): should return a value
 * 
 * getLeftTop(): should return a value
 * getLeftTop( Point(4, 5) ): should be set left and top by point
 * 
 * getRightBottom(): should return a value
 * setRightBottom( Point(4, 5) ): should be set bottom and right by point
 * 
 * getCenterX(): should return a value
 * getCenterY(): should return a value
 * getCenter(): should return a value
 * 
 * isPointInRect(left / top): point out of rect should return false
 * isPointInRect(right / bottom): point out of rect should return false
 * isPointInRect(point): point in rect should be true
 * isPointInRect(point): Point in rect should be return true
 * 
 * isInside(null): should be throw an exception
 * isInside(undefined): should be throw an exception
 * isInside: should be return false if the rectangle passed overcomes on the left
 * isInside(differend rect): should be return false if the rectangle passed overcomes on the top
 * isInside(otherRect): should be return false if the rectangle passed overcomes on the top
 * isInside(otherRect): should be return false if the rectangle passed overcomes on the right
 * isInside(otherRect): should be return false if the rectangle passed overcomes on the bottom
 * isInside(otherRect): should be return true if the rectangles equals
 * 
 * isIntersect(otherRect): should be isIntersect(null) throw a Exception
 * isIntersect(otherRect): should be isIntersect(undefined) throw a Exception
 * isIntersect(otherRect): should be return false if the rectangle passed overcomes on the left
 * isIntersect(otherRect): should be return true if the rectangle inside on the left
 * isIntersect(otherRect): should be return false if the rectangle passed overcomes on the top
 * isIntersect(otherRect): should be return true if the rectangle inside on the top
 * isIntersect(otherRect): should be return false if the rectangle passed overcomes on the right
 * isIntersect(otherRect): should be return true if the rectangle passed inside right
 * isIntersect(otherRect): should be return false if the rectangle passed outside on the bottom
 * isIntersect(otherRect): should be return true if the rectangle passed inside bottom
 * 
 * combined(null): should be return a copy of this rect
 * combined(undefined): should be return a copy of this rect
 * combined: should be combined two rects
 * 
 * Move(null, 1): should be throw an exception because x could not be null
 * Move(undefined, 1): should be throw an exception because x could not be undefined
 * Move(1, null): should be throw an exception because y could not be null
 * Move(1, undefined): should be throw an exception because y could not be undefined
 * Move(1, 1): should be moved 1, 1
 * 
 * Translate(null, 1): should be throw an exception because dx could not be null
 * Translate(undefined, 1): should be throw an exception because dx could not be undefined
 * Translate(1, null): should be throw an exception because dy could not be null
 * Translate(1, undefined): should be throw an exception because dy could not be undefined
 * Translate(1, 1): should be translate 1, 1
 * 
 * grow(null, 1): should be throw an exception because h could not be null
 * grow(undefined, 1): should be throw an exception because h could not be undefined
 * grow(1, null): should be throw an exception because v could not be null
 * grow(1, undefined): should be throw an exception because v could not be undefined
 * grow(1, 1): should be grow 1, 1
 * 
 * isEmpty: should be false if width and height > 0
 * isEmpty: should be true if width <= 0
 * isEmpty: should be true if height <= 0
 * 
 * rotate90: should be rotate
 * 
 * clone: should be return a copy of this rect
 * 
 * equal(null): should be return false
 * equal(undefined): should be return false
 * equal(): with left not the same should be return false
 * equal(): with top not the same should be return false
 * equal(): with width not the same should be return false
 * equal(): with height not the same should be return false
 * equal(): with same data should be return true
 * 
 * toString(): should be possible to get the rect as string
 */
describe('gtRect', () => {

  beforeEach(() => {                          // Set-up-Routinen vor jedem einzelnen Test
  });

  /**
   * test to create an rect instance with left = null
   */
  it('gtRect(null, 2, 4, 5): should throw an exception', () => {     
    expect(function() {
      new gtRect(null, 2, 4, 5);
    }).toThrow();
  });

  /**
   * test to create an rect instance with top = null
   */
  it('gtRect(1, null, 4, 5): should throw an exception', () => {     
    expect(function() {
      new gtRect(1, null, 4, 5);
    }).toThrow();
  });
  
  /**
   * test to create an rect instance with width = null
   */
  it('gtRect(1, 2, null, 5): should throw an exception', () => {     
    expect(function() {
      new gtRect(1, 2, null, 5);
    }).toThrow();
  });
  
  /**
   * test to create an rect instance with height = null
   */
  it('gtRect(1, 2, 4, null): should throw an exception', () => {     
    expect(function() {
      new gtRect(1, 2, 4, null);
    }).toThrow();
  });

  /**
   * test to create an rect instance with left = undefined
   */
  it('gtRect(undefined, 2, 4, 5): should throw an exception', () => {
    expect(function() {
      var left;

      new gtRect(left, 2, 4, 5);
    }).toThrow();
  });

  /**
   * test to create an rect instance with top = undefined
   */
  it('gtRect(1, undefined, 4, 5): should throw an exception', () => {
    expect(function() {
      var top;

      new gtRect(1, top, 4, 5);
    }).toThrow();
  });

  /**
   * test to create an rect instance with width = undefined
   */
  it('gtRect(1, 2, undefined, 5): should throw an exception', () => {
    expect(function() {
      var width;

      new gtRect(1, 2, width, 5);
    }).toThrow();
  });

  /**
   * test to create an rect instance with height = undefined
   */
  it('gtRect(1, 2, 4, undefined): should throw an exception', () => {
    expect(function() {
      var height;

      new gtRect(1, 2, 4, height);
    }).toThrow();
  });

  /**
   * create a instance
   */
  it('constructor(1, 2, 4, 5): should create an instance', () => {
    expect(new gtRect(1, 2, 4, 5)).toBeTruthy();
  });

  /**
   * test to set left = null
   */
  it('setLeft(null): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);

      rect.setLeft(null);
    }).toThrow();
  });

  /**
   * test to set left = undefined 
   */
  it('setLeft(undefined): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var left;

      rect.setLeft(left);
    }).toThrow();
  });

  /**
   * test to get  
   */
  it('setLeft(5): should work', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);

    rect.setLeft(5);

    expect(rect.getLeft()).toEqual(5);
  });

  /**
   * test to get  
   */
  it('getLeft(): should return a value', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);

    expect(rect.getLeft()).toEqual(1);
  });

  /**
   * test to set top = null
   */
  it('setTop(null): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);

      rect.setTop(null);
    }).toThrow();
  });

  /**
   * test to set top = undefined 
   */
  it('setTop(undefined): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var top;

      rect.setTop(top);
    }).toThrow();
  });

  /**
   * setTop(5): should work  
   */
  it('setTop(5): should work', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    rect.setTop(5);

    expect(rect.getTop()).toEqual(5);
  });
  
  /**
   * test to get top  
   */
  it('getTop(): should return a value', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);

    expect(rect.getTop()).toEqual(2);
  });

  /**
   * test to set height = null
   */
  it('setHeight(null): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);

      rect.setHeight(null);
    }).toThrow();
  });

  /**
   * test to set height = undefined 
   */
  it('setHeight(undefined): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var height;

      rect.setHeight(height);
    }).toThrow();
  });
  
  /**
   * setHeight(5): should work  
   */
  it('setHeight(5): should work', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    rect.setHeight(5);

    expect(rect.getHeight()).toEqual(5);
  });

  /**
   * test to get height  
   */
  it('getHeight(): should return a value', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);

    expect(rect.getHeight()).toEqual(4);
  });

  /**
   * test to set width = null
   */
  it('setWidth(null): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);

      rect.setWidth(null);
    }).toThrow();
  });

  /**
   * test to set width = undefined 
   */
  it('setWidth(undefined): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var width;

      rect.setWidth(width);
    }).toThrow();
  });

  /**
   * setWidth(5): should work  
   */
  it('setWidth(5): should work', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    rect.setWidth(5);

    expect(rect.getWidth()).toEqual(5);
  });

  /**
   * test to get width  
   */
  it('getWidth(): should return a value', () => { 
    var rect: gtRect = new gtRect(1, 2, 3, 4);

    expect(rect.getWidth()).toEqual(3);
  });

  /**
   * test to get right 
   */
  it('getRight(): should return a value', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    
    expect(rect.getRight()).toEqual(4);
  });  

  /**
   * test to set right with null 
   */
  it('setRight(null): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);

      rect.setRight(null);
    }).toThrow();    
  });  

  /**
   * test to set right to undefined 
   */
  it('setRight(undefined): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var right;

      rect.setRight(right);
    }).toThrow();    
  });  

  /**
   * test to set right with left < right 
   */
  it('setRight(8): should be set right width left < right', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    
    rect.setRight(8);

    expect(rect.getLeft()).toEqual(1);
    expect(rect.getWidth()).toEqual(7);
  });  

  /**
   * test to set right with left > right 
   */
  it('setRight(0): should be set right width left > right', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    
    rect.setRight(0);

    expect(rect.getLeft()).toEqual(1);
    expect(rect.getWidth()).toEqual(-1);
    expect(rect.getRight()).toEqual(0);

    expect(rect.getTop()).toEqual(2);
    expect(rect.getHeight()).toEqual(4);
    expect(rect.getBottom()).toEqual(6);

  });

  /**
   * test to get bottom 
   */
  it('getBottom(): should return a value', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    
    expect(rect.getBottom()).toEqual(6);
  }); 

  /**
   * test to set bottom with null 
   */
  it('setBottom(null): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);

      rect.setBottom(null);
    }).toThrow();    
  });  

  /**
   * test to set bottom to undefined 
   */
  it('setRight(undefined): should throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var bottom;

      rect.setRight(bottom);
    }).toThrow();    
  });  

  /**
   * test to set bottom with top < bottom 
   */
  it('setBottom(8): should be set bottom width top < bottom', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    
    rect.setBottom(8);

    expect(rect.getLeft()).toEqual(1);
    expect(rect.getRight()).toEqual(4);
    expect(rect.getWidth()).toEqual(3);

    expect(rect.getTop()).toEqual(2);
    expect(rect.getBottom()).toEqual(8);
    expect(rect.getHeight()).toEqual(6);
  });  

  /**
   * test to set bottom with top > bottom 
   */
  it('setBottom(0): should be set bottom width top > bottom', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    
    rect.setBottom(0);

    expect(rect.getLeft()).toEqual(1);
    expect(rect.getRight()).toEqual(4);
    expect(rect.getWidth()).toEqual(3);

    expect(rect.getTop()).toEqual(2);
    expect(rect.getBottom()).toEqual(0);
    expect(rect.getHeight()).toEqual(-2);
  });

  /**
   * test to get left and top 
   */
  it('getLeftTop(): should return a value', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: IPoint = rect.getLeftTop();

    expect(point.getX()).toEqual(1);
    expect(point.getY()).toEqual(2);
  });

  /**
   * test to set left and top 
   */
  it('getLeftTop( Point(4, 5) ): should be set left and top by point', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: gtPoint = new gtPoint(4, 5);

    rect.setLeftTop( point );

    expect(rect.getLeft()).toEqual(4);
    expect(rect.getTop()).toEqual(5);
  }); 

  /**
   * test to get bottom and right 
   */
  it('getRightBottom(): should return a value', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: IPoint = rect.getRightBottom();

    expect(point.getX()).toEqual(4);
    expect(point.getY()).toEqual(6);
  });

  /**
   * test to set bottom and right
   */
  it('setRightBottom( Point(4, 5) ): should be set bottom and right by point', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: gtPoint = new gtPoint(4, 5);

    rect.setRightBottom( point );

    expect(rect.getLeft()).toEqual(1);
    expect(rect.getRight()).toEqual(4);
    expect(rect.getWidth()).toEqual(3);

    expect(rect.getTop()).toEqual(2);
    expect(rect.getBottom()).toEqual(5);
    expect(rect.getHeight()).toEqual(3);
  }); 

  /**
   * test to get center X
   */
  it('getCenterX(): should return a value', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);

    expect(rect.getCenterX()).toEqual(2.5);
  }); 

  /**
   * test to get center Y
   */
  it('getCenterY(): should return a value', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);

    expect(rect.getCenterY()).toEqual(4);
  }); 
  
  /**
   * test to get center
   */
  it('getCenter(): should return a value', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: IPoint = rect.getCenter();

    expect(point.getX()).toEqual(2.5);
    expect(point.getY()).toEqual(4);
  }); 

  /**
   * test point out of rect (left / top)
   */
  it('isPointInRect(left / top): point out of rect should return false', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: gtPoint = new gtPoint(0, 1);

    expect(rect.isPointInRect(point)).toEqual(false);
  }); 

  /**
   * test point out of rect (right / bottom)
   */
  it('isPointInRect(right / bottom): point out of rect should return false', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: gtPoint = new gtPoint(5, 7);

    expect(rect.isPointInRect(point)).toEqual(false);
  }); 

  /**
   * test point is on left top point
   */
  it('isPointInRect(point): point in rect should be true', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: gtPoint = new gtPoint(1, 2);

    expect(rect.isPointInRect(point)).toEqual(true);
  }); 

  /**
   * test point is on right bottom edge
   */
  it('isPointInRect(point): Point in rect should be return true', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var point: gtPoint = new gtPoint(4, 6);

    expect(rect.isPointInRect(point)).toEqual(true);
  });

  /**
   * test isInside with rect = null
   */
  it('isInside(null): should be throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var otherRect: gtRect = null;
  
      rect.isInside(otherRect);
    }).toThrow();  
  });

  /**
   * test isInside with rect = undefined
   */
  it('isInside(undefined): should be throw an exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var otherRect: gtRect;
  
      rect.isInside(otherRect);
    }).toThrow();  
  });

  /**
   * test isInside outside left
   */
  it('isInside: should be return false if the rectangle passed overcomes on the left', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var otherRect: gtRect = new gtRect(0, 2, 3, 4);

    expect(rect.isInside(otherRect)).toEqual(false);  
  });

  /**
   * test isInside outside top
   */
  it('isInside(differend rect): should be return false if the rectangle passed overcomes on the top', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var otherRect: gtRect = new gtRect(1, 1, 3, 4);

    expect(rect.isInside(otherRect)).toEqual(false);  
  });

  /**
   * test isInside outside top
   */
  it('isInside(otherRect): should be return false if the rectangle passed overcomes on the top', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var otherRect: gtRect = new gtRect(1, 1, 3, 4);

    expect(rect.isInside(otherRect)).toEqual(false);  
  });

  /**
   * test isInside outside right
   */
  it('isInside(otherRect): should be return false if the rectangle passed overcomes on the right', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var otherRect: gtRect = new gtRect(1, 2, 4, 4);

    expect(rect.isInside(otherRect)).toEqual(false);  
  });

  /**
   * test isInside outside bottom
   */
  it('isInside(otherRect): should be return false if the rectangle passed overcomes on the bottom', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var otherRect: gtRect = new gtRect(1, 2, 3, 5);

    expect(rect.isInside(otherRect)).toEqual(false);  
  });

  /**
   * test isInside is inside
   */
  it('isInside(otherRect): should be return true if the rectangles equals', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var otherRect: gtRect = new gtRect(1, 2, 3, 4);

    expect(rect.isInside(otherRect)).toEqual(true);  
  });

  /**
   * test isIntersect with rect = null
   */
  it('isIntersect(otherRect): should be isIntersect(null) throw a Exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var otherRect: gtRect = null;
  
      rect.isIntersect(otherRect);
    }).toThrow();  
  });

  /**
   * test isIntersect with rect = undefined
   */
  it('isIntersect(otherRect): should be isIntersect(undefined) throw a Exception', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var otherRect: gtRect;
  
      rect.isIntersect(otherRect);
    }).toThrow();  
  });

  /**
   * test isIntersect outside left
   */
  it('isIntersect(otherRect): should be return false if the rectangle passed overcomes on the left', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(1, 5, 1, 7);

    expect(rect.isIntersect(otherRect)).toEqual(false);  
  });

  /**
   * test isIntersect inside left
   */
  it('isIntersect(otherRect): should be return true if the rectangle inside on the left', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(1, 5, 4, 7);

    expect(rect.isIntersect(otherRect)).toEqual(true);  
  });

  /**
   * test isIntersect outside top
   */
  it('isIntersect(otherRect): should be return false if the rectangle passed overcomes on the top', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 1, 6, 1);

    expect(rect.isIntersect(otherRect)).toEqual(false);  
  });

  /**
   * test isIntersect inside top
   */
  it('isIntersect(otherRect): should be return true if the rectangle inside on the top', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 1, 6, 5);

    expect(rect.isIntersect(otherRect)).toEqual(true);  
  });

  /**
   * test isIntersect outside right
   */
  it('isIntersect(otherRect): should be return false if the rectangle passed overcomes on the right', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(11, 5, 6, 7);

    expect(rect.isIntersect(otherRect)).toEqual(false);  
  });

  /**
   * test isIntersect inside right
   */
  it('isIntersect(otherRect): should be return true if the rectangle passed inside right', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(9, 5, 6, 7);

    expect(rect.isIntersect(otherRect)).toEqual(true);  
  });

  /**
   * test isInside outside bottom
   */
  it('isIntersect(otherRect): should be return false if the rectangle passed outside on the bottom', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 13, 6, 7);

    expect(rect.isIntersect(otherRect)).toEqual(false);  
  });

  /**
   * test isInside inside bottom
   */
  it('isIntersect(otherRect): should be return true if the rectangle passed inside bottom', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 12, 6, 7);

    expect(rect.isIntersect(otherRect)).toEqual(false);  
  });

  /**
   * test combined
   */
  it('combined(null): should be return a copy of this rect', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = null;
    var combinedRect: IRect = rect.combined(otherRect);

    expect(combinedRect.getLeft()).toEqual(4);  
    expect(combinedRect.getTop()).toEqual(5);         
    expect(combinedRect.getWidth()).toEqual(6);
    expect(combinedRect.getHeight()).toEqual(7); 
  });

  /**
   * test combined
   */
  it('combined(undefined): should be return a copy of this rect', () => {
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect;
    var combinedRect: IRect = rect.combined(otherRect);

    expect(combinedRect.getLeft()).toEqual(4);  
    expect(combinedRect.getTop()).toEqual(5);         
    expect(combinedRect.getWidth()).toEqual(6);
    expect(combinedRect.getHeight()).toEqual(7); 
  });  

  /**
   * test combined
   */
  it('combined: should be combined two rects', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(7, 6, 5, 4);
    var combinedRect: IRect = rect.combined(otherRect);

    expect(combinedRect.getLeft()).toEqual(4);      
    expect(combinedRect.getTop()).toEqual(5);       
    expect(combinedRect.getWidth()).toEqual(8);      
    expect(combinedRect.getHeight()).toEqual(7);    
  });

  /**
   * test move with x = null
   */
  it('Move(null, 1): should be throw an exception because x could not be null', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var x: number = null;
      var y: number = 1;

      rect.move(x, y);
    }).toThrow();  
  });

  /**
   * test move with x = undefined
   */
  it('Move(undefined, 1): should be throw an exception because x could not be undefined', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var x: number;
      var y: number = 1;

      rect.move(x, y);
    }).toThrow();  
  });

  /**
   * test move with y = null
   */
  it('Move(1, null): should be throw an exception because y could not be null', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var x: number = 1;
      var y: number = null;

      rect.move(x, y);
    }).toThrow();  
  });

  /**
   * test move with y = undefined
   */
  it('Move(1, undefined): should be throw an exception because y could not be undefined', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var x: number = 1;
      var y: number;

      rect.move(x, y);
    }).toThrow();  
  });

  /**
   * test move with dx=1 and dy=1
   */
  it('Move(1, 1): should be moved 1, 1', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var x: number = 1;
    var y: number = 1;

    rect.move(1, 1);

    expect(rect.getLeft()).toEqual(1);  
    expect(rect.getTop()).toEqual(1);  
  });

 /**
   * test translate with dx = null
   */
  it('Translate(null, 1): should be throw an exception because dx could not be null', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var dx: number = null;
      var dy: number = 1;

      rect.translate(dx, dy);
    }).toThrow();  
  });

  /**
   * test translate with dx = undefined
   */
  it('Translate(undefined, 1): should be throw an exception because dx could not be undefined', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var dx: number;
      var dy: number = 1;

      rect.translate(dx, dy);
    }).toThrow();  
  });

  /**
   * test translate with dy = null
   */
  it('Translate(1, null): should be throw an exception because dy could not be null', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var dx: number = 1;
      var dy: number = null;

      rect.translate(dx, dy);
    }).toThrow();  
  });

  /**
   * test translate with dy = undefined
   */
  it('Translate(1, undefined): should be throw an exception because dy could not be undefined', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var dx: number = 1;
      var dy: number;

      rect.translate(dx, dy);
    }).toThrow();  
  });

  /**
   * test translate with dx=1 and dy=1
   */
  it('Translate(1, 1): should be translate 1, 1', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var dx: number = 1;
    var dy: number = 1;

    rect.translate(dx, dy);

    expect(rect.getLeft()).toEqual(5);  
    expect(rect.getTop()).toEqual(6);  
  });

  /**
   * test grow with h = null
   */
  it('grow(null, 1): should be throw an exception because h could not be null', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var h: number = null;
      var v: number = 1;

      rect.grow(h, v);
    }).toThrow();  
  });

  /**
   * test translate with dx = undefined
   */
  it('grow(undefined, 1): should be throw an exception because h could not be undefined', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var h: number;
      var v: number = 1;

      rect.grow(h, v);
    }).toThrow();  
  });

  /**
   * test grow with v = null
   */
  it('grow(1, null): should be throw an exception because v could not be null', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var h: number = 1;
      var v: number = null;

      rect.grow(h, v);
    }).toThrow();  
  });

  /**
   * test grow with v = undefined
   */
  it('grow(1, undefined): should be throw an exception because v could not be undefined', () => {     
    expect(function() {
      var rect: gtRect = new gtRect(1, 2, 3, 4);
      var h: number = 1;
      var v: number;

      rect.grow(h, v);
    }).toThrow();  
  });

  /**
   * test grow with h=1 and v=1
   */
  it('grow(1, 1): should be grow 1, 1', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var h: number = 1;
    var v: number = 1;

    rect.grow(h, v);

    expect(rect.getLeft()).toEqual(3);          // this.left -= h   
    expect(rect.getTop()).toEqual(4);           // this.top -= v 
    expect(rect.getWidth()).toEqual(8);         // this.width += h + h  
    expect(rect.getHeight()).toEqual(9);        // this.height += v + v       
  });

  /**
   * test isEmpty
   */
  it('isEmpty: should be false if width and height > 0', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);

    expect(rect.isEmpty()).toEqual(false);       
  });

  /**
   * test isEmpty with width = 0
   */
  it('isEmpty: should be true if width <= 0', () => {     
    var rect: gtRect = new gtRect(4, 5, 0, 7);

    expect(rect.isEmpty()).toEqual(true);       
  });

  /**
   * test isEmpty with width = 0
   */
  it('isEmpty: should be true if height <= 0', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 0);

    expect(rect.isEmpty()).toEqual(true);       
  });

  /**
   * test rotate 90°
   */
  it('rotate90: should be rotate', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    rect.rotate90();

    expect(rect.getLeft()).toEqual(4);       
    expect(rect.getTop()).toEqual(5);       
    expect(rect.getWidth()).toEqual(7);       
    expect(rect.getHeight()).toEqual(6);       
  });

  /**
   * clone this rect
   */
  it('clone: should be return a copy of this rect', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var clonedRect: IRect = rect.clone();

    expect(rect !== clonedRect).toEqual(true);  
    expect(clonedRect.getLeft()).toEqual(4);  
    expect(clonedRect.getTop()).toEqual(5);         
    expect(clonedRect.getWidth()).toEqual(6);
    expect(clonedRect.getHeight()).toEqual(7); 
  });

  /**
   * equal(null): should be return false
   */
  it('equal(null): should be return false', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);

    expect(rect.equal(null)).toEqual(false);  
  });

  /**
   * equal(undefined): should be return false
   */
  it('equal(undefined): should be return false', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect;

    expect(rect.equal(otherRect)).toEqual(false);  
  });

  /**
   * equal(): with left not the same should be return false
   */
  it('equal(): with left not the same should be return false', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(0, 5, 6, 7);

    expect(rect.equal(otherRect)).toEqual(false);  
  });

  /**
   * equal(): with top not the same should be return false
   */
  it('equal(): with top not the same should be return false', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 0, 6, 7);

    expect(rect.equal(otherRect)).toEqual(false);  
  });

  /**
   * equal(): with width not the same should be return false
   */
  it('equal(): with width not the same should be return false', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 5, 0, 7);

    expect(rect.equal(otherRect)).toEqual(false);  
  });

  /**
   * equal(): with height not the same should be return false
   */
  it('equal(): with height not the same should be return false', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 5, 6, 0);

    expect(rect.equal(otherRect)).toEqual(false);  
  });

  /**
   * equal(): with same data should be return true
   */
  it('equal(): with same data should be return true', () => {     
    var rect: gtRect = new gtRect(4, 5, 6, 7);
    var otherRect: gtRect = new gtRect(4, 5, 6, 7);

    expect(rect.equal(otherRect)).toEqual(true);  
  });

  /**
   * test toString
   */
  it('toString(): should be possible to get the rect as string', () => {     
    var rect: gtRect = new gtRect(1, 2, 3, 4);
    var str: string = rect.toString();

    expect(str).toEqual("gtRect [left=" + rect.getLeft() + ", top=" + rect.getTop() + ", width=" + rect.getWidth() + ", height=" + rect.getHeight() + "]");
  });

});
