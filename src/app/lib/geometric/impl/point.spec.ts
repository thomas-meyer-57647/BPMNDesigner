/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     geometric toolbox
 * @version		  1.0.0
 * @since		    1.0.0
 --------------------------------------------------------------------------------*/
import { gtPoint } from './point';
import { IPoint } from '../ipoint';

/**
 * this is the test class for lib\geometric\impl\point
 * 
 * constructor(1,1): should create an instance
 * constructor(null, 1): should throw an exception
 * constructor(undefined, 1): should throw an exception
 * constructor(1, null): should throw an exception
 * constructor(1, undefined): should throw an exception
 * 
 * setX(null): should throw an exception
 * setX(undefined): should throw an exception
 * setX(2): should work
 * getX(): should return value
 * 
 * setY(null): should throw an exception
 * setY(undefined): should throw an exception
 * setY(2): should work
 * getY(): should return a value
 * 
 * setXY(null, 1): should throw an exception
 * setXY(1, null): should throw an exception
 * setXY(undefined, 1): should throw an exception
 * setXY(1, undefined): should throw an exception
 * setXY(2, 2): should work
 * 
 * clone(): should work
 * 
 * equals(null): equals with null point should return false
 * equals(unknown): equals with undefined point should return false
 * equals(this): equals with same point
 * equals(): equals with x and y if the same value
 * equals(): not equals with x if not the same value
 * equals(): not equals with y if not the same value
 * 
 */
describe('gtPoint', () => {                     // Testsuite zur Gruppierung von Tests

  beforeEach(() => {                          // Set-up-Routinen vor jedem einzelnen Test
  });

  /**
   * test to create an instance
   */
  it('constructor(1,1): should create an instance', () => {     
    expect(new gtPoint(1, 1)).toBeTruthy();
  });

  /**
   * test to create an instance with x = null
   */
  it('constructor(null, 1): should throw an exception', () => {     
    expect(function() {
      new gtPoint(null, 1);
    }).toThrow();
  });

  /**
   * test to create an instance with x = undefined
   */
  it('constructor(undefined, 1): should throw an exception', () => {
    expect(function() {
      var x: number;
      var y: number = 1;

      new gtPoint(x, y);
    }).toThrow();
  });

  /**
   * test to create an instance with y = null
   */
  it('constructor(1, null): should throw an exception', () => {     
    expect(function() {
      new gtPoint(1, null);
    }).toThrow();
  });

  /**
   * test to create an instance with y = undefined 
   */
  it('constructor(1, undefined): should throw an exception', () => {     
    expect(function() {
      var x=1, y;

      new gtPoint(x, y);
    }).toThrow();
  });

  /**
   * test to set x = null
   */
  it('setX(null): should throw an exception', () => {     
    expect(function() {
      var point = new gtPoint(1, 1);

      point.setX(null);
    }).toThrow();
  });

  /**
   * test to set x = undefined 
   */
  it('setX(undefined): should throw an exception', () => {     
    expect(function() {
      var point: gtPoint = new gtPoint(1, 1);
      var x;

      point.setX(x);
    }).toThrow();
  });

  /**
   * setX(2): should work 
   */
  it('setX(2): should work', () => {     
    var point: gtPoint = new gtPoint(1, 1);
    var x = 2;

    point.setX(x);

    expect(point.getX()).toEqual(2);
  });

  /**
   * test to get x
   */
  it('getX(): should return value', () => {     
    var point = new gtPoint(1, 1);
    var x = point.getX();

    expect(x).toEqual(1);
  });

  /**
   * test to set y = null
   */
  it('setY(null): should throw an exception', () => {     
    expect(function() {
      var point = new gtPoint(1, 1);
      
      point.setY(null);
    }).toThrow();
  });

  /**
   * test to set y = undefined 
   */
  it('setY(undefined): should throw an exception', () => {     
    expect(function() {
      var point: gtPoint = new gtPoint(1, 1);
      var y;

      point.setY(y);
    }).toThrow();
  });

  /**
   * test to set y = 2 
   */
  it('setY(2): should throw an exception', () => {     
    var point: gtPoint = new gtPoint(1, 1);
    var y;

    point.setY(2);

    expect(point.getY()).toEqual(2);
  });

  /**
   * test to get y
   */
  it('getY(): should return a value', () => {     
    var point = new gtPoint(1, 1);
    var y = point.getY();

    expect(y).toEqual(1);
  });

  /**
   * setXY(null, 1): test to set x and y. with x = null
   */
  it('setXY(null, 1): should throw an exception', () => {     
    expect(function() {
      var point = new gtPoint(1, 1);
      let x = null, y = 1;

      point.setXY(x, y);
    }).toThrow();
  });

  /**
   * test to set x and y. with y = null
   */
  it('setXY(1, null): should throw an exception', () => {     
    expect(function() {
      var point = new gtPoint(1, 1);
      let x=1, y=null;
      
      point.setXY(x, y);
    }).toThrow();
  });

  /**
   * test to set x and y. with x = undefined
   */
  it('setXY(undefined, 1): should throw an exception', () => {     
    expect(function() {
      var point = new gtPoint(1, 1);
      let x, y = 1;

      point.setXY(x, y);
    }).toThrow();
  });

  /**
   * test to set x and y. with y = undefined
   */
  it('setXY(1, undefined): should throw an exception', () => {     
    expect(function() {
      var point: gtPoint = new gtPoint(1, 1);
      var y;

      point.setY(y);
    }).toThrow();
  });

  /**
   * test to set x and y
   */
  it('setXY(2, 2): should work', () => {     
    var point: gtPoint = new gtPoint(1, 1);

    point.setXY(2, 2);

    expect( point.getX() ).toEqual(2);
    expect( point.getY() ).toEqual(2);
  });

  /**
   * test to clone a point
   */
  it('clone(): should work', () => {     
    var point: gtPoint = new gtPoint(-1, 1);
    var clonePoint: IPoint = point.clone();

    expect(clonePoint.getX()).toEqual(-1);
    expect(clonePoint.getY()).toEqual(1);
    expect(clonePoint !== point).toEqual(true);
  });

  /**
   * test to equals with null point
   */
  it('equals(null): equals with null point should return false', () => {     
    var point1: gtPoint = new gtPoint(-1, 1);
    var point2: gtPoint = null;
    
    expect(point1.equals(point2)).toEqual(false);
  });

  /**
   * test to equals with undefined point
   */
  it('equals(unknown): equals with undefined point should return false', () => {     
    var point1: gtPoint = new gtPoint(-1, 1);
    var point2: gtPoint;
    
    expect(point1.equals(point2)).toEqual(false);
  });
  
  /**
   * test the same points
   */
  it('equals(this): equals with same point', () => {     
    var point1: gtPoint = new gtPoint(-1, 1);
    var point2: gtPoint;
    
    expect(point1.equals(point2)).toEqual(false);
  });

  /**
   * test to equals with x and y if the same value
   */
  it('equals(): equals with x and y if the same value', () => {     
    var point1: gtPoint = new gtPoint(-1, 1);
    var point2: gtPoint = new gtPoint(-1, 1);
    
    expect(point1.equals(point2)).toEqual(true);
  });

  /**
   * test to equals with x if not the same value
   */
  it('equals(): not equals with x if not the same value', () => {     
    var point1: gtPoint = new gtPoint(-1, 1);
    var point2: gtPoint = new gtPoint(1, 1);
    
    expect(point1.equals(point2)).toEqual(false);
  });

  /**
   * test to equals with y if not the same value
   */
  it('equals(): not equals with y if not the same value', () => {     
    var point1: gtPoint = new gtPoint(-1, 1);
    var point2: gtPoint = new gtPoint(-1, -1);
    
    expect(point1.equals(point2)).toEqual(false);
  });

});
