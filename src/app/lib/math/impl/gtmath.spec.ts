/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     graphic toolbox
 * @version		  
 * @since		    
 --------------------------------------------------------------------------------*/
import { gtMath } from "./gtmath";
import { gtPoint } from '../../geometric/impl/point';

/**
 * test function for gtMath
 *
 * constructor: should create an instance
 * 
 * angleDeg(null, 2, 3, 4): should throw an exception
 * angleDeg(1, null, 3, 4): should throw an exception
 * angleDeg(1, 2, null, 4): should throw an exception
 * angleDeg(1, 2, 3, null): should throw an exception
 * angleDeg(undefined, 2, 3, 4): should throw an exception
 * angleDeg(1, undefined, 3, 4): should throw an exception
 * angleDeg(1, 2, undefined, 4): should throw an exception
 * angleDeg(1, 2, 3, undefined): should throw an exception
 * angleDeg(1, 1, 100, 100): should work
 * 
 * angleDegPoint(null, point2): should throw an exception
 * angleDegPoint(point1, null): should throw an exception
 * angleDegPoint(undefined, point2): should throw an exception
 * angleDegPoint(point1, undefined): should throw an exception
 * angleDegPoint(point1, point2): should work
 */
describe('gtMath', () => {
  it('constructor: should create an instance', () => {
    expect(new gtMath()).toBeTruthy();
  });

  /**
   * angleDeg(null, 2, 3, 4): should throw an exception
   */
  it('angleDeg(null, 2, 3, 4): should throw an exception', () => {
    expect(function() {
      var x1 = null;
      var y1 = 2;
      var x2 = 3;
      var y2 = 4;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(1, null, 3, 4): should throw an exception
   */
  it('angleDeg(1, null, 3, 4): should throw an exception', () => {
    expect(function() {
      var x1 = 1;
      var y1 = null;
      var x2 = 3;
      var y2 = 4;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(1, 2, null, 4): should throw an exception
   */
  it('angleDeg(1, 2, null, 4): should throw an exception', () => {
    expect(function() {
      var x1 = 1;
      var y1 = 2;
      var x2 = null;
      var y2 = 4;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(1, 2, 3, null): should throw an exception
   */
  it('angleDeg(1, 2, 3, null): should throw an exception', () => {
    expect(function() {
      var x1 = 1;
      var y1 = 2;
      var x2 = 3;
      var y2 = null;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(undefined, 2, 3, 4): should throw an exception
   */
  it('angleDeg(undefined, 2, 3, 4): should throw an exception', () => {
    expect(function() {
      var x1;
      var y1 = 2;
      var x2 = 3;
      var y2 = 4;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(1, undefined, 3, 4): should throw an exception
   */
  it('angleDeg(1, undefined, 3, 4): should throw an exception', () => {
    expect(function() {
      var x1 = 1;
      var y1;
      var x2 = 3;
      var y2 = 4;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(1, 2, undefined, 4): should throw an exception
   */
  it('angleDeg(1, 2, undefined, 4): should throw an exception', () => {
    expect(function() {
      var x1 = 1;
      var y1 = 2;
      var x2;
      var y2 = 4;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(1, 2, 3, undefined): should throw an exception
   */
  it('angleDeg(1, 2, 3, undefined): should throw an exception', () => {
    expect(function() {
      var x1 = 1;
      var y1 = 2;
      var x2 = 3;
      var y2;
  
      gtMath.angleDeg(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * angleDeg(1, 1, 100, 100): should work
   */
  it('angleDeg(1, 1, 100, 100): should work', () => {
    var x1 = 1;
    var y1 = 1;
    var x2 = 100;
    var y2 = 100;

    expect( gtMath.angleDeg(x1, y1, x2, y2) ).toEqual( 45 );
  });

  /*
   * angleDegPoint(null, point2): should throw an exception
   */   
  it('angleDegPoint(null, point2): should throw an exception', () => {
    expect(function() {
      var p1: gtPoint = null;
      var p2: gtPoint = new gtPoint(100, 100);

      gtMath.angleDegPoint(p1, p2);
    }).toThrow();
  });
  
  /*
   * angleDegPoint(point1, null): should throw an exception
   */   
  it('angleDegPoint(point1, null): should throw an exception', () => {
    expect(function() {
      var p1: gtPoint = new gtPoint(1, 1);
      var p2: gtPoint = null;

      gtMath.angleDegPoint(p1, p2);
    }).toThrow();
  });

  /*
   * angleDegPoint(undefined, point2): should throw an exception
   */   
  it('angleDegPoint(undefined, point2): should throw an exception', () => {
    expect(function() {
      var p1: gtPoint;
      var p2: gtPoint = new gtPoint(100, 100);

      gtMath.angleDegPoint(p1, p2);
    }).toThrow();
  });

  /*
   * angleDegPoint(point1, undefined): should throw an exception
   */   
  it('angleDegPoint(point1, undefined): should throw an exception', () => {
    expect(function() {
      var p1: gtPoint = new gtPoint(1, 1);
      var p2: gtPoint;

      gtMath.angleDegPoint(p1, p2);
    }).toThrow();
  });

  /*
   * angleDegPoint(point1, point2): should work
   */   
  it('angleDegPoint(point1, point2): should work', () => {
    var p1: gtPoint = new gtPoint(1, 1);
    var p2: gtPoint = new gtPoint(100, 100);

    expect( gtMath.angleDegPoint(p1, p2) ).toEqual( 45 );
  });
 
});
