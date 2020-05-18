/*-------------------------------------------------------------------------------	
 * Graphic Toolbox
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		  0.9.1
 --------------------------------------------------------------------------------*/
import { gtLinearGradient, gtColorStop, gtAbstractGradient } from './gradient';
import { gtColor } from './color';
import { IGradient } from '../igradient';

/**
 * test functions for the <code>gtColorStop</code>, <code>gtLinearGradient</code> and 
 * <code>gtRadialGradient</code> 
 * 
 * gtColorStop
 *        constructor(1, "LightSlateGray"): should create an instance
 * 
 *        setStop(null): should throw TypeError Exception
 *        setStop(undefined): should throw a TypeError Exception
 *        setStop(-0.1): should throw a RangeError Exception
 *        setStop(0): should work
 *        setStop(1): should work
 *        setStop(1.1) should throw a RangeError
 *        getStop() should work
 * 
 *        setColor(null) should throw an exception
 *        setColor(undefined) should throw a TypeError Exception
 *        setColor(color) should work
 *        getColor() should work
 * 
 *        clone() should work
 *  
 *        equal(null) should return false
 *        equal(unknown) should return false
 *        equal(this): should return true
 *        equal(other stop): should return false
 *        equal(other color) should return false
 *        equal(equal colorstop): should return true
 * 
 *        toSVG(): should work
 * 
 * 
 * gtAbstractGradient
 *    
 *        setName("test") / getName(): should work
 * 
 *        setID("test") / getID(): should work
 * 
 *        addColorStop( null ): should throw Exception
 *        addColorStop( undefined ): should throw Exception
 *        addColorStop( colorstop ): should work
 * 
 *        getColorStop(null): should throw Exception
 *        getColorStop( undefined ): should throw Exception
 *        getColorStop( -1 ): should throw Exception
 *        getColorStop( 0 ): should work
 *        getColorStop( maxcount ): should work
 *        getColorStop( >maxcount ): should throw exception
 *        
 *        deleteColorStop(null): should throw Exception
 *        deleteColorStop(undefined): should throw Exception
 *        deleteColorStop(-1): should throw Exception
 *        deleteColorStop(0): should work
 *        deleteColorStop(maxcount): should work
 *        deleteColorStop(>maxcount): should throw Exception
 *        deleteColorStop(by 1 color): should throw false
 * 
 *        getColorStopCount(): should work with 0 colorstops
 *        getColorStopCount(): should work with 3 colorstops
 */
describe('gtColorStop', () => {
  it('constructor(1, "LightSlateGray"): should create an instance', () => {
    expect(new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"))).toBeTruthy();
  });

  /**
   * setStop(null): should throw an exception
   */
  it('setStop(null): should throw TypeError Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
      var position: number = null;
  
      colorstop.setStop(position);
    }).toThrow();
  });

  /**
   * setStop(undefined): should throw a TypeError Exception
   */
  it('setStop(undefined): should throw TypeError Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
      var position: number;
  
      colorstop.setStop(position);
    }).toThrow();
  });

  /**
   * setStop(-0.1): should throw a RangeError Exception
   */
  it('setStop(-0.1): should throw RangeError Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
      var position: number = -0.1;
  
      colorstop.setStop(position);
    }).toThrow();
  });

  /**
   * setStop(0): should work
   */
  it('setStop(0): should work', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var position: number = 0;

    colorstop.setStop(position);

    expect( colorstop.getStop() ).toEqual(position);  
  });

  /**
   * setStop(1): should work
   */
  it('setStop(1): should work', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var position: number = 1;

    colorstop.setStop(position);

    expect( colorstop.getStop() ).toEqual(position);  
  });

  /**
   * setStop(1.1) should throw a RangeError
   */
  it('setStop(1.1) should throw a RangeError', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
      var position: number = 1.1;
  
      colorstop.setStop(position);
    }).toThrow();
  });

  /**
   * getStop() should work
   */
  it('getStop() should work', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var position: number = 0.5;
  
    colorstop.setStop(position);

    expect( colorstop.getStop() ).toEqual(position);  
  });

  /**
   * setColor(null) should throw an exception
   */
  it('setColor(null) should throw TypeError Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
      var color: gtColor = null;

      colorstop.setColor(color);
    }).toThrow();
  });

  /**
   * setColor(undefined) should throw a TypeError Exception
   */
  it('setColor(undefined): should throw TypeError Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
      var color: gtColor;
  
      colorstop.setColor(color);
    }).toThrow();
  });

  /**
   * setColor(color) should work
   */
  it('setColor(color) should work', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var color: gtColor = new gtColor(12);

    colorstop.setColor(color);

    expect( colorstop.getColor() ).toEqual( color );  
  });

  /**
   * getColor() should work
   */
  it('getColor() should work', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var color: gtColor = new gtColor(12);

    colorstop.setColor(color);

    expect( colorstop.getColor() ).toEqual( color );  
  });

  /**
   * clone() should work
   */
  it('clone(): should work', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var clonedColorStop: gtColorStop = colorstop.clone();

    expect( colorstop != clonedColorStop ).toEqual( true );  
    expect( colorstop.getColor() != clonedColorStop.getColor() ).toEqual( true );  
    expect( colorstop.getStop() == clonedColorStop.getStop() ).toEqual( true );  
    expect( colorstop.getColor().getColorValue() == clonedColorStop.getColor().getColorValue() ).toEqual( true );  
  });

  /**
   * equal(null) should return false
   */
  it('equal(null): should return false', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var otherColorStop: gtColorStop = null;

    expect( colorstop.equals(otherColorStop) ).toEqual( false );  
  });

  /**
   * equal(unknown) should return false
   */
  it('equal(unknown): should return false', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var otherColorStop: gtColorStop;

    expect( colorstop.equals(otherColorStop) ).toEqual( false );  
  });

  /**
   * equal(this): should return true
   */
  it('equal(this): should return true', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));

    expect( colorstop.equals(colorstop) ).toEqual( true );  
  });


  /**
   * equal(other stop): should return false
   */
  it('equal(other stop): should return false', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var otherColorStop: gtColorStop = colorstop.clone();

    otherColorStop.setStop(0);

    expect( colorstop.equals(otherColorStop) ).toEqual( false );  
  });

  /**
   * equal(other color) should return false
   */
  it('equal(other stop): should return false', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var otherColorStop: gtColorStop = colorstop.clone();

    otherColorStop.getColor().setColorValue(0);
    
    expect( colorstop.equals(otherColorStop) ).toEqual( false );  
  });

  /**
   * equal(equal colorstop) should return true
   */
  it('equal(equal colorstop): should return true', () => {
    var colorstop: gtColorStop = new gtColorStop(1, gtColor.createColorByHTMLName("LightSlateGray"));
    var otherColorStop: gtColorStop = colorstop.clone();

    expect( colorstop.equals(colorstop) ).toEqual( true );  
  });

  /**
   * toSVG(): should work
   */
  it('toSVG(): should work', () => {
    var stop: number = 0.5;
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;
    var transparency: number = 0.5;

    var colorstop: gtColorStop = new gtColorStop(stop, gtColor.createColorByRGB(red, green, blue, transparency));
    var svg: String = colorstop.toSVG();

    expect( svg ).toEqual( '<stop offset="0.5" style="stop-color: rgba(64, 128, 255, 0.5)" />' );
  });  
});

//=================================== gtGradient ======================================================
/**
 * this is the concret test KLasse for gtAbstractGradient
 */
class TestAbstractGradient extends gtAbstractGradient {
  public draw(ctx: any): void {
    throw new Error("Method not implemented.");
  }
  public clone(): gtAbstractGradient {
    throw new Error("Method not implemented.");
  }
  public toSVG(): string {
    throw new Error("Method not implemented.");
  }
  public toCSS(): string {
    throw new Error("Method not implemented.");
  }

}
/**
 * the test function for gtAbstractGradient
 */
describe('gtAbstractGradient', () => {

  /**
   * setName("test") / getName(): should work
   */
  it('setName("test") / getName(): should work', () => {
    var name: string = "test";
    var colorstop: gtColorStop = new gtColorStop(0.5, new gtColor(1));
    var gradient: IGradient = new TestAbstractGradient(colorstop);
    
    gradient.setName( name );
    expect( gradient.getName() ).toEqual(name);
  });

  /**
   * setID("test") / getID(): should work
   */
  it('setID("test") / getID(): should work', () => {
    var id: string = "test";
    var colorstop: gtColorStop = new gtColorStop(0.5, new gtColor(1));
    var gradient: IGradient = new TestAbstractGradient(colorstop);
    
    gradient.setID( id );
    expect( gradient.getID() ).toEqual(id);
  });

  /**
   * addColorStop( null ): should throw Exception
   */
  it('addColorStop( null ): should throw Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = null;
      var gradient: IGradient = new TestAbstractGradient(new gtColorStop(0.5, new gtColor(1)));

      gradient.addColorStop(colorstop);
    }).toThrow();
  });

  /**
   * addColorStop( undefined ): should throw Exception
   */
  it('addColorStop( undefined ): should throw Exception', () => {
    expect(function() {
      var colorstop: gtColorStop;
      var gradient: IGradient = new TestAbstractGradient(new gtColorStop(0.5, new gtColor(1)));

      gradient.addColorStop(colorstop);
    }).toThrow();
  });

  /**
   * addColorStop( colorstop ): should work
   */      
  it('addColorStop( colorstop ): should work', () => {
    var colorstop: gtColorStop = new gtColorStop(0.5, new gtColor(1));
    var gradient: IGradient = new TestAbstractGradient(new gtColorStop(0.5, new gtColor(1)));

    gradient.addColorStop(colorstop);

    expect( gradient.getColorStopCount() ).toEqual( 2 );
  });

  /**
   * getColorStop(null): should throw Exception
   */
  it('getColorStop(null): should throw Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(50, new gtColor(1));
      var gradient: IGradient = new TestAbstractGradient(colorstop);
      var index: number = null;

      gradient.addColorStop(colorstop);

      gradient.getColorStop(index);
    }).toThrow();
  });

  /**
   * getColorStop( undefined ): should throw Exception
   */
  it('getColorStop( undefined ): should throw Exception', () => {
    expect(function() {
      var colorstop: gtColorStop = new gtColorStop(50, new gtColor(1));
      var gradient: IGradient = new TestAbstractGradient(colorstop);
      var index: number;
      
      gradient.addColorStop(colorstop);

      gradient.getColorStop(index);
    }).toThrow();
  });

  /**
   * getColorStop( -1 ): should throw Exception
   */
  it('getColorStop( -1 ): should throw Exception', () => {
    expect(function() {
      var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
      var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
      var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
      var gradient: IGradient = new TestAbstractGradient(colorstop1);
      var index: number = -1;
      
      gradient.addColorStop(colorstop2);
      gradient.addColorStop(colorstop3);

      gradient.getColorStop(index);
    }).toThrow();
  });

  /**
   * getColorStop( 0 ): should work
   */
  it('getColorStop( 0 ): should work', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: IGradient = new TestAbstractGradient(colorstop1);
    var index: number = 0;
      
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);

    expect( gradient.getColorStopCount() ).toEqual( 3 );

    expect( gradient.getColorStop(index) ).toEqual( colorstop1 );
  });

  /**
   * getColorStop( maxcount ): should work
   */
  it('getColorStop( maxcount ): should work', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: IGradient = new TestAbstractGradient(colorstop1);
      
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);

    expect( gradient.getColorStopCount() ).toEqual( 3 );

    var index: number = gradient.getColorStopCount()-1;

    expect( gradient.getColorStop(index) ).toEqual( colorstop3 );
  });

  /**
   * getColorStop( >maxcount ): should throw exception
   */
  it('getColorStop( >maxcount ): should work', () => {
    expect(function() {
      var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
      var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
      var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
      var gradient: IGradient = new TestAbstractGradient(colorstop1);
        
      gradient.addColorStop(colorstop2);
      gradient.addColorStop(colorstop3);
  
      expect( gradient.getColorStopCount() ).toEqual( 3 );
  
      var index: number = gradient.getColorStopCount();
  
      expect( gradient.getColorStop(index) ).toEqual( colorstop3 );
    }).toThrow();
  });

  /**
   * deleteColorStop(null): should throw Exception
   */
  it('deleteColorStop(null): should throw Exception', () => {
    expect(function() {
      var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
      var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
      var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
      var gradient: IGradient = new TestAbstractGradient(colorstop1);
        
      gradient.addColorStop(colorstop2);
      gradient.addColorStop(colorstop3);
  
      expect( gradient.getColorStopCount() ).toEqual( 3 );

      var index: number = null;

      gradient.deleteColorStop(index);
    }).toThrow();
  });

  /**
   * deleteColorStop(undefined): should throw Exception
   */
  it('deleteColorStop(undefined): should throw Exception', () => {
    expect(function() {
      var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
      var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
      var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
      var gradient: IGradient = new TestAbstractGradient(colorstop1);
        
      gradient.addColorStop(colorstop2);
      gradient.addColorStop(colorstop3);
  
      expect( gradient.getColorStopCount() ).toEqual( 3 );

      var index: number;

      gradient.deleteColorStop(index);
    }).toThrow();
  });

  /**
   * deleteColorStop(-1): should throw Exception
   */
  it('deleteColorStop(-1): should throw Exception', () => {
    expect(function() {
      var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
      var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
      var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
      var gradient: IGradient = new TestAbstractGradient(colorstop1);
        
      gradient.addColorStop(colorstop2);
      gradient.addColorStop(colorstop3);
  
      expect( gradient.getColorStopCount() ).toEqual( 3 );

      var index: number = -1;

      gradient.deleteColorStop(index);
    }).toThrow();
  });

  /**
   * deleteColorStop(0): should work
   */
  it('deleteColorStop(0): should work', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: IGradient = new TestAbstractGradient(colorstop1);
        
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.getColorStopCount() ).toEqual( 3 );

    var index: number = 0;
    var deleted: boolean = gradient.deleteColorStop(index);

    expect( deleted ).toEqual( true );
    expect( gradient.getColorStopCount() ).toEqual( 2 );
    expect( gradient.getColorStop(0) ).toEqual( colorstop2 );
    expect( gradient.getColorStop(1) ).toEqual( colorstop3 );
  });

  /**
   * deleteColorStop(maxcount): should work
   */ 
  it('deleteColorStop(maxcount): should work', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: IGradient = new TestAbstractGradient(colorstop1);
        
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.getColorStopCount() ).toEqual( 3 );

    var index: number = gradient.getColorStopCount()-1;
    var deleted: boolean = gradient.deleteColorStop(index);

    expect( deleted ).toEqual( true );
    expect( gradient.getColorStopCount() ).toEqual( 2 );
    expect( gradient.getColorStop(0) ).toEqual( colorstop1 );
    expect( gradient.getColorStop(1) ).toEqual( colorstop2 );
  });

  /**
   * deleteColorStop(>maxcount): should throw Exception
   */
  it('deleteColorStop(>maxcount): should throw Exception', () => {
    expect(function() {
      var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
      var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
      var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
      var gradient: IGradient = new TestAbstractGradient(colorstop1);
        
      gradient.addColorStop(colorstop2);
      gradient.addColorStop(colorstop3);
  
      expect( gradient.getColorStopCount() ).toEqual( 3 );

      var index: number = gradient.getColorStopCount();

      gradient.deleteColorStop(index);
    }).toThrow();
  });

  /**
   * deleteColorStop(by 1 color): should throw false
   */
  it('deleteColorStop(by 1 color): should throw false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: IGradient = new TestAbstractGradient(colorstop1);
      
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);

    expect( gradient.getColorStopCount() ).toEqual( 3 );

    var index: number = gradient.getColorStopCount()-1;
    var deleted: boolean = gradient.deleteColorStop(index);

    expect( deleted ).toEqual( true );
  });

  /**
   * getColorStopCount(): should work with 0 colorstops
   */ 
  it('getColorStopCount(): should work with 0 colorstops', () => {
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    expect( gradient.getColorStopCount() ).toEqual( 0 );
  });

  /**
   * getColorStopCount(): should work with 3 colorstops
   */
  it('getColorStopCount(): should work with 3 colorstops', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.getColorStopCount() ).toEqual( 3 );
  });

});

describe('gtLinearGradient', () => {
  /**
   * Gradient(null, 1, 100, 20): should throw Exception
   */
  it('Gradient(null, 1, 100, 20): should throw Exception', () => {
    expect(function() {
      var x1: number = null;
      var y1: number = 1;
      var x2: number = 100;
      var y2: number = 20;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });

  /**
   * Gradient(undefined, 1, 100, 20): should throw Exception
   */
/*  
  it('Gradient(undefined, 1, 100, 20): should throw Exception', () => {
    expect(function() {
      var x1: number;
      var y1: number = 1;
      var x2: number = 100;
      var y2: number = 20;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });
*/
  /**
   * Gradient(1, null, 100, 20): should throw Exception
   */
/*  
  it('Gradient(1, null, 100, 20): should throw Exception', () => {
    expect(function() {
      var x1: number = 1;
      var y1: number = null;
      var x2: number = 100;
      var y2: number = 20;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });
*/
  /**
   * Gradient(1, undefined, 100, 20): should throw Exception
   */
/*  
  it('Gradient(1, undefined, 100, 20): should throw Exception', () => {
    expect(function() {
      var x1: number = 1;
      var y1: number;
      var x2: number = 100;
      var y2: number = 20;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });
*/
  /**
   * Gradient(1, 1, null, 20): should throw Exception
   */
/*  
  it('Gradient(1, 1, null, 20): should throw Exception', () => {
    expect(function() {
      var x1: number = 1;
      var y1: number = 1;
      var x2: number = null;
      var y2: number = 20;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });
*/
  /**
   * Gradient(1, 1, undefined, 20): should throw Exception
   */
/*  
  it('Gradient(1, 1, undefined, 20): should throw Exception', () => {
    expect(function() {
      var x1: number = 1;
      var y1: number = 1;
      var x2: number;
      var y2: number = 20;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });
*/
  /**
   * Gradient(1, 1, 100, null): should throw Exception
   */
/*  
  it('Gradient(1, 1, 100, null): should throw Exception', () => {
    expect(function() {
      var x1: number = 1;
      var y1: number = 1;
      var x2: number = 100;
      var y2: number = null;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });
*/
  /**
   * Gradient(1, 1, 100, undefined): should throw Exception
   */
/*  
  it('Gradient(1, 1, 100 undefined): should throw Exception', () => {
    expect(function() {
      var x1: number = 1;
      var y1: number = 1;
      var x2: number = 100;
      var y2: number;

      var gradient: gtLinearGradient = new gtLinearGradient(x1, y1, x2, y2);
    }).toThrow();
  });
*/
  /**
   * Gradient(1, 1, 100, 20): should work
   */
/*  
  it('Gradient(1, 1, 100, 20): should work', () => {
    expect(new gtLinearGradient(1, 1, 100, 20)).toBeTruthy();
  });
*/
  /**
   * getName(): string / setName( name: string ): should work
   */    
  it('getName(): string / setName( name: string ): should work', () => {
    var name: string = "test"; 
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

    gradient.setName(name);

    expect( gradient.getName() ).toEqual( name );
  });

  /**
   * setX1( null ): should throw Exception
   */
/*  
  it('setX1( null ): should throw Exception', () => {
    expect(function() {
      var x: number = null;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setX1(x);
    }).toThrow();
  });
*/
  /**
   * setX1( undefined ): should throw Exception
   */
/*  
  it('setX1( undefined ): should throw Exception', () => {
    expect(function() {
      var x: number;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setX1(x);
    }).toThrow();
  });
*/
  /**
   * setX1( 5 ): should work
   */
/*  
  it('setX1( 5 ): should work', () => {
    var x: number = 5;
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

    gradient.setX1(x);
    expect( gradient.getX1() ).toEqual( 5 );
  });
*/
  /**
   * setY1( null ): should throw Exception
   */
/*  
  it('setY1( null ): should throw Exception', () => {
    expect(function() {
      var y: number = null;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setY1(y);
    }).toThrow();
  });
*/
  /**
   * setY1( undefined ): should throw Exception
   */
/*  
  it('setY1( undefined ): should throw Exception', () => {
    expect(function() {
      var y: number;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setY1(y);
    }).toThrow();
  });
*/
  /**
   * setY1( 5 ): should work
   */
/*  
  it('setY1( 5 ): should work', () => {
    var y: number = 5;
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

    gradient.setY1(y);
    expect( gradient.getY1() ).toEqual( 5 );
  });
*/
  /**
   * setX2( null ): should throw Exception
   */
/*  
  it('setX2( null ): should throw Exception', () => {
    expect(function() {
      var x: number = null;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setX2(x);
    }).toThrow();
  });
*/
  /**
   * setX1( undefined ): should throw Exception
   */
/*  
  it('setX2( undefined ): should throw Exception', () => {
    expect(function() {
      var x: number;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setX2(x);
    }).toThrow();
  });
*/
  /**
   * setX2( 5 ): should work
   */
/*  
  it('setX1( 5 ): should work', () => {
    var x: number = 5;
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

    gradient.setX2(x);
    expect( gradient.getX2() ).toEqual( 5 );
  });
*/
  /**
   * setY2( null ): should throw Exception
   */
/*  
  it('setY2( null ): should throw Exception', () => {
    expect(function() {
      var y: number = null;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setY2(y);
    }).toThrow();
  });
*/
  /**
   * setY2( undefined ): should throw Exception
   */
/*  
  it('setY2( undefined ): should throw Exception', () => {
    expect(function() {
      var y: number;
      var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

      gradient.setY2(y);
    }).toThrow();
  });
*/
  /**
   * setY2( 5 ): should work
   */
/*  
  it('setY1( 5 ): should work', () => {
    var y: number = 5;
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);

    gradient.setY2(y);
    expect( gradient.getY2() ).toEqual( 5 );
  });
*/
  /**
   * clone(): should work
   */
/*  
  it('clone(): should work', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = gradient.clone();

    expect( gradient.equals(clonedGradient) ).toEqual( true );
  });
*/
  /**
   * equals( null ): should return false
   */
/*  
  it('equals( null ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = null;

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * equals( undefined ): should return false
   */
/*  
  it('equals( undefined ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient;

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * equals( this ): should return true
   */
/*  
  it('equals( this ): should return true', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient;

    expect( gradient.equals(gradient) ).toEqual( true );
  });
*/
  /**
   * equals( other x1 ): should return false
   */
/*  
  it('equals( other x1 ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = gradient.clone();
    clonedGradient.setX1(2);

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * equals( other y1 ): should return false
   */
/*  
  it('equals( other y1 ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = gradient.clone();
    clonedGradient.setY1(2);

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * equals( other x2 ): should return false
   */
/*  
  it('equals( other x2 ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = gradient.clone();
    clonedGradient.setX2(99);

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * equals( other y2 ): should return false
   */
/*  
  it('equals( other y2 ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = gradient.clone();
    clonedGradient.setY2(21);

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * equals( differnt colorstop counts ): should return false
   */
/*  
  it('equals( differnt colorstop counts ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = gradient.clone();
    clonedGradient.deleteColorStop(0);

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * equals( differnt colorstop ): should return false
   */
 /*
   it('equals( differnt colorstop ): should return false', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    var clonedGradient: gtLinearGradient = gradient.clone();
    clonedGradient.getColorStop(2).getColor().setColorValue(5);

    expect( gradient.equals(clonedGradient) ).toEqual( false );
  });
*/
  /**
   * toSVG(): should work with 0 colorstops
   */
/*  
  it('toSVG(): should work with 0 colorstops', () => {
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
          
    expect( gradient.toSVG() ).toEqual( '<linearGradient x1="1" y1="1" x2="100" y2="20"></linearGradient>' );
  });
*/
  /**
   * toSVG(): should work with 3 colorstops
   */
/*  
  it('toSVG(): should work with 3 colorstops', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20);
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.toSVG() ).toEqual ('<linearGradient x1="1" y1="1" x2="100" y2="20"><stop offset="0.25" style="stop-color: rgb(0, 0, 1)" /><stop offset="0.5" style="stop-color: rgb(0, 0, 2)" /><stop offset="0.75" style="stop-color: rgb(0, 0, 3)" /></linearGradient>' );
  });
*/
  /**
   * toSVG(): should work with name
   */
/*  
  it('toSVG(): should work with name', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20, "test");
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.toSVG() ).toEqual ('<linearGradient id="test" x1="1" y1="1" x2="100" y2="20"><stop offset="0.25" style="stop-color: rgb(0, 0, 1)" /><stop offset="0.5" style="stop-color: rgb(0, 0, 2)" /><stop offset="0.75" style="stop-color: rgb(0, 0, 3)" /></linearGradient>' );
  });
*/
  /**
   * toSVG(): should work with empty name
   */
/*  
  it('toSVG(): should work with empty name', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20, "");
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.toSVG() ).toEqual ('<linearGradient x1="1" y1="1" x2="100" y2="20"><stop offset="0.25" style="stop-color: rgb(0, 0, 1)" /><stop offset="0.5" style="stop-color: rgb(0, 0, 2)" /><stop offset="0.75" style="stop-color: rgb(0, 0, 3)" /></linearGradient>' );
  });
*/
  /**
   * toSVG(): should work with blank name
   */
/*  
  it('toSVG(): should work with blank name', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20, "     ");
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.toSVG() ).toEqual ('<linearGradient x1="1" y1="1" x2="100" y2="20"><stop offset="0.25" style="stop-color: rgb(0, 0, 1)" /><stop offset="0.5" style="stop-color: rgb(0, 0, 2)" /><stop offset="0.75" style="stop-color: rgb(0, 0, 3)" /></linearGradient>' );
  });
*/
  /**
   * toSVG(): should work with "test 2" name
   */
/*  
  it('toSVG(): should work with "test 2" name', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, new gtColor(1));
    var colorstop2: gtColorStop = new gtColorStop(0.50, new gtColor(2));
    var colorstop3: gtColorStop = new gtColorStop(0.75, new gtColor(3));
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 20, "test 2");
        
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);
    gradient.addColorStop(colorstop3);
  
    expect( gradient.toSVG() ).toEqual ('<linearGradient id="test2" x1="1" y1="1" x2="100" y2="20"><stop offset="0.25" style="stop-color: rgb(0, 0, 1)" /><stop offset="0.5" style="stop-color: rgb(0, 0, 2)" /><stop offset="0.75" style="stop-color: rgb(0, 0, 3)" /></linearGradient>' );
  });
*/
  /**
   * toCSS(0 colorsteps): should work with 0 colorsteps
   */
/*  
  it('toCSS(0 colorsteps): should work with 0 colorsteps', () => {
    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 100, "test 2");
    
    expect( gradient.toCSS() ).toEqual ('linear-gradient(45deg);' );
  });
*/
  /**
   * toCSS(2 colorsteps): should work with n colorsteps
   */
/*  
  it('toCSS(2 colorsteps): should work with n colorsteps', () => {
    var colorstop1: gtColorStop = new gtColorStop(0.25, gtColor.createColorByRGB(255, 0, 0, 0));
    var colorstop2: gtColorStop = new gtColorStop(0.50, gtColor.createColorByRGB(255, 0, 0, 1));

    var gradient: gtLinearGradient = new gtLinearGradient(1, 1, 100, 100, "test 2");
    gradient.addColorStop(colorstop1);
    gradient.addColorStop(colorstop2);

    expect( gradient.toCSS() ).toEqual ('linear-gradient(45deg, rgba(255, 0, 0, 0) 25%, rgba(255, 0, 0, 1) 50%);');
  });
*/
});
