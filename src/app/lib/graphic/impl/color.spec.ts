/*-------------------------------------------------------------------------------	
 * Graphic Toolbox 	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		  0.9.1
 --------------------------------------------------------------------------------*/
import { gtColor, gtColorPalette } from './color';
import { isNull } from 'util';

/**
 * this is the test class for colors and colorplattes
 * 
 * gtColor:
 *    constructor(): should create an instance
 *    constructor(null): with null color value should throw an exception
 *    constructor(undefined): with undefined color value should throw an exception
 *    constructor(-1): with negative color value should throw an exception
 *    constructor(1, null): transparency null should work
 *    constructor(1, undefined): with undefined transparency should work
 *    constructor(1, -1): with negativ transparency should throw exception
 *    constructor(1, 0): with 0 transparency should work
 *    constructor(1, 1): with 1 transparency should work
 *    constructor(1, 2): with greater transparency should throw exception
 * 
 *    createColorByRGB(-1, -1, -1, -1, "test"): should throw exception
 *    createColorByRGB(64, 128, 255, null, "test"): with null transparency should work
 *    createColorByRGB(64, 128, 255, null, "test"): with null transparency should work
 * 
 *    createColorByHSB(-1, -1, -1, -1, "test"): should throw exception
 *    createColorByHSB(0, 0.5, 0.75, null, "test"): should work
 *    createColorByHSB(0, 0.5, 0.75, null, "test"): should work
 * 
 *    createColorByHSL(-1, -1, -1, -1, "test"): should throw exception
 *    createColorByHSL(0, 43, 44, null, "test"): should work: should work
 * 
 *    createColorByHex(null, 1, "test"): with null hex string should throw exception
 *    createColorByHex("ffffff", null, "test"): with null transparenz should work
 *    createColorByHex(undefined, 1, "test"): with undefined hex string should throw exception
 *    createColorByHex("ffffff", undefined, "test"): with undefined transparenz should convert to null transparenz
 *    createColorByHex("", 1, "test"): with empty hex string should throw exception
 *    createColorByHex("     ", 1, "test"): with blank hex string should throw exception
 *    createColorByHex("fzffgf", 1, "test"): with invalid hex string should throw exception
 *    createColorByHex("ffffff", 0, "test"): with 0 transparenz should work
 *    createColorByHex("#ffffff", 1, "test"): with "#" should work
 *    createColorByHex("ffffff", 1, "test"): with valid hex string should work
 *    createColorByHex("ffffff", 1, "test"): with 1 transparenz should work
 *    createColorByHex("ffffff", 1.1, "test"): should throw exception
 * 
 *    createColorByHTMLName(null, 1): with null name should throw exception
 *    createColorByHTMLName(unkown, 1): with unknown name should throw exception
 *    createColorByHTMLName("test", 1): with not exists name should return null
 *    createColorByHTMLName("DIMGRAY", 0.25): with uppercase name should work
 *    createColorByHTMLName("DimGray", 0.25): with correct name should work
 * 
 *    getHTMLColor(null): should return null if null 
 *    getHTMLColor(undefined): should return null if not name not a html color 
 *    getHTMLColor(""): should return null by empty string 
 *    getHTMLColor("     "): should return null by blank string 
 *    getHTMLColor("abc"): should return null if not name not a html color 
 *    getHTMLColor("MEDIUMSEAGREEN"): should return value if uppercase html color name exists 
 *    getHTMLColor("MediumSeaGreen"): should return value if html color name exists
 *  
 *    getHTMLColorName(null): should return null if value null 
 *    getHTMLColorName(undefined): should return null if value undefined 
 *    getHTMLColorName(-1): should return null if value negativ 
 *    getHTMLColorName(1): should return null if value not exists 
 *    getHTMLColorName(3978097): should return "MediumSeaGreen"
 * 
 *    setColorValue(null): It must throw TypeError if color is null 
 *    setColorValue(undefined): It must throw TypeError if color is undefined 
 *    setColorValue(-1): It must throw RangeError if color is <0 
 *    setColorValue(0): It must be work if color is >=0'
 *    getColorValue(): Must be return the value of setColorValue
 * 
 *    setTrancparency(null) should work
 *    setTrancparency(undefined) should throw a TypeError
 *    setTrancparency(-0.1) should throw a RangeError
 *    setTrancparency(0) should work
 *    setTrancparency(0.5) should work
 *    setTrancparency(1) should work
 *    setTrancparency(1.1) should throw a RangeError
 * 
 *    setRed(null) should throw a RangeError
 *    setRed(unknown) should throw a TypeError
 *    setRed(-1) should throw a RangeError
 *    setRed(0) should work
 *    setRed(124.5) should be red = 125
 *    setRed(255) should work
 *    setRed(256) should throw a RangeError
 * 
 *    setGreen(null) should throw a TypeError
 *    setGreen(unknown) should throw a TypeError
 *    setGreen(-1) should throw a RangeError
 *    setGreen(0) should work
 *    setGreen(124.5) should be red = 125
 *    setGreen(255) should work
 *    setGreen(256) should throw a RangeError
 * 
 *    setBlue(null) should throw a RangeError
 *    setBlue(unknown) should throw a RangeError
 *    setBlue(-1) should throw a RangeError
 *    setBlue(0) should work
 *    setBlue(124.5) should be blue = 125
 *    setBlue(255) should work
 *    setBlue(256) should throw a RangeError
 * 
 *    setRGB(null, 1, 1) should throw a TypeError
 *    setRGB(1, null, 1) should throw a TypeError
 *    setRGB(1, 1, null) should throw a TypeError
 *    setRGB(unknown, 1, 1) should throw a TypeError
 *    setRGB(1, unknown, 1) should throw a TypeError
 *    setRGB(1, 1, unknown) should throw a TypeError
 *    setRGB(-1, 1, 1) should throw a RangeError
 *    setRGB(1, -1, 1) should throw a RangeError
 *    setRGB(1, 1, -1) should throw a RangeError
 *    setRGB(0, 0, 0) should work
 *    setRGB(124.5, 124.5, 124.5) should work (125, 125, 125)
 *    setRGB(255, 255, 255) should work
 *    setRGB(256, 1, 1) should throw a RangeError
 *    setRGB(1, 256, 1) should throw a RangeError
 *    setRGB(1, 1, 256) should throw a RangeError
 *    getRGB() should work
 * 
 *    setByHSB(null, 0.5, 0.75): should throw exception
 *    setByHSB(0.25, null, 0.75): should throw exception
 *    setByHSB(0.25, 0.5, null): should throw exception
 *    setByHSB(undefined, 0.5, 0.75): should throw exception
 *    setByHSB(0.25, undefined, 0.75): should throw exception
 *    setByHSB(0.25, 0.5, undefined): should throw exception
 *    setByHSB(-1, 0.5, 0.75): should throw exception
 *    setByHSB(0.25, -1, 0.75): should throw exception
 *    setByHSB(0.25, 0.5, -1): should throw exception
 *    setByHSB(0, 0.5, 0.75): should work
 *    setByHSB(0.25, 0, 0.75): should work
 *    setByHSB(0.25, 0.5, 0): should work
 *    setByHSB(0.25, 0.5, 0.75): should work
 *    setByHSB(1, 0.5, 0.75): should work
 *    setByHSB(0.25, 1, 0.75): should work
 *    setByHSB(0.25, 0.5, 1): should work
 * 
 *    getHSL(r: 64, g: 87, b: 159): should return [h: 225°, s: 43%, l: 44%] 
 *    setByHSL(h: null, s: 43%, l: 44%): should be throw an exception
 *    setByHSL(h: 225, s: null, l: 44%): should be throw an exception
 *    setByHSL(h: 225, s: 43%, l: null): should be throw an exception
 *    setByHSL(h: undefined, s: 43%, l: 44%): should be throw an exception
 *    setByHSL(h: 225, s: undefined, l: 44%): should be throw an exception
 *    setByHSL(h: 225, s: 43%, l: undefined): should be throw an exception
 *    setByHSL(h: -1, s: 43%, l: 44%): should be throw an exception
 *    setByHSL(h: 225, s: -1, l: 44%): should be throw an exception
 *    setByHSL(h: 225, s: 43%, l: -1): should be throw an exception
 *    setByHSL(h: 0, s: 43%, l: 44%): should work
 *    setByHSL(h: 225, s: 0, l: 44%): should be throw an exception
 *    setByHSL(h: 225, s: 43%, l: 0): should work
 *    setByHSL(h: 225°, s: 43%, l: 44%): should be (r: 64, g: 87, b: 159)
 *    setByHSL(229, 25, 50): should work
 *    setByHSL(h: 359, s: 43%, l: 44%): should work
 *    setByHSL(h: 225, s: 100, l: 44%): work
 *    setByHSL(h: 225, s: 43%, l: 100): should work
 *    setByHSL(h: 360, s: 43%, l: 44%): should throw exception
 *    setByHSL(h: 225, s: 101%, l: 44%): should throw exception
 *    setByHSL(h: 225, s: 100, l: 44%): work
 *    setByHSL(h: 225, s: 43%, l: 100): should work
 * 
 *    clone() should work
 * 
 *    equals(null): should return false
 *    equals(undefined): should return false
 *    equals(this): should return true
 *    equals(different colorvalues): should return false
 *    equals(different transparency): should return false
 *    equals(different name): should return true
 * 
 *    toRGB() should work
 *    toRGBA() should work with defined transparency
 *    toRGBA() should work with not defined transparency
 * 
 *    toHex(FFFFFF) should work
 *    toHex(0) should work
 * 
 *    toHSL() should work
 *    toHSLA() should work with defined transparency
 * 
 * 
 * gtColorPalette:
 * 
 *    constructor(): should create an instance
 *    constructor(null): can be create an color palette with null list
 *    constructor(undefined): can be create an color palette with undefined list
 *    constructor(colorlist): can be create an color palette with a color list
 *    constructor(null, "palette1"): can be create an color palette with name
 * 
 *    geName() / setName(): should work
 * 
 *    add( null ): should throw exception
 *    add( undefined ): should throw exception
 *    add( color ): should work
 * 
 *    set( null, color ): should throw exception by index = null
 *    set( undefinied, color ): should throw exception by undefined index
 *    set( -1, color ): should throw exception by negativ index
 *    set( 0, null ): should throw exception if not color exists
 *    set( 0, undefined ): should throw exception if color undefined
 *    set( -1, rgb(64, 128, 255) ): should throw exception if index <0
 *    set( 0, color ): should work if colors exists
 *    set( 2, color ): should work if colors exists
 *    set( maxcount, color ): should work if colors exists
 *    set( maxcount + 1, rgb(64, 128, 255) ): should throw exception if index out of range
 * 
 *    get( null ): should throw a exception'
 *    get( undefined ): should throw a exception'
 *    get( -1 ): should throw a exception'
 *    get( 0 ): should work'
 *    get( maxcount ): should work'
 *    get( >maxcount ): should throw exception
 * 
 *    insert( null, color ): should throw a exception
 *    insert( 0, null ): should throw a exception
 *    insert( undefined, color ): should throw a exception'
 *    insert( 0, undefined ): should throw a exception'
 *    insert( -1, color ): should throw a exception'
 *    insert( 0, color ): should work'
 *    insert( maxcount, color ): should work'
 *    insert( >maxcount, color ): should throw exception
 * 
 *    count(): should work
 * 
 *    delete(null): should throw an exception
 *    delete(unknown): should throw an exception
 *    delete(-1): should throw an exception
 *    delete(0): should work
 *    delete(maxcount): should work
 *    delete(>maxcount): should throw an exception
 * 
 *    TODO: test load
 *    TODO: test save
 *    TODO: test get names of palette
 *    TODO: test equals
 * 
 *    clone(): should work
 */
describe('gtColor', () => {
  
  /**
   * constructor(): should create an instance
   */
  it('constructor(): should create an instance', () => {
    expect(new gtColor(1)).toBeTruthy();
  });

  /**
   * constructor(null): with null color value should throw an exception
   */
  it('constructor(null): with null color value should throw an exception', () => {
    expect(function() {
      var colorvalue: number = null;           
      var color: gtColor = new gtColor(colorvalue);
    }).toThrow();  
  });

  /**
   * constructor(undefined): with undefined color value should throw an exception
   */
  it('constructor(undefined): with undefined color value should throw an exception', () => {
    expect(function() {
      var colorvalue: number;           
      var color: gtColor = new gtColor(colorvalue);
    }).toThrow();  
  });

  /**
   * constructor(-1): with negative color value should throw an exception
   */
  it('constructor(-1): with negative color value should throw an exception', () => {
    expect(function() {
      var colorvalue: number = -1;           
      var color: gtColor = new gtColor(colorvalue);
    }).toThrow();  
  });

  /**
   * constructor(1, null): transparency null should work
   */
  it('constructor(1, null): transparency null should work', () => {
    var colorvalue: number = 1; 
    var transparency: number = null; 
    var color: gtColor = new gtColor(colorvalue, transparency);
    
    expect( color.getColorValue() ).toEqual(1);    
    expect( color.getTransparency() ).toEqual(null);    
  });

  /**
   * constructor(1, undefined): with undefined transparency should work
   */
  it('constructor(1, undefined): with undefined transparency should work', () => {
    var colorvalue: number = 1; 
    var transparency: number; 
    var color: gtColor = new gtColor(colorvalue, transparency);
    
    expect( color.getColorValue() ).toEqual(1);    
    expect( color.getTransparency() ).toEqual(null);    
  });

  /**
   * constructor(1, -1): with negativ transparency should throw exception
   */
  it('constructor(1, -1): with negativ transparency should throw exception', () => {
    expect(function() {
      var colorvalue: number = 1;           
      var transparency: number = -1; 
      var color: gtColor = new gtColor(colorvalue, transparency);
    }).toThrow();  
  });

  /**
   * constructor(1, 0): with 0 transparency should work
   */
  it('constructor(1, 0): with 0 transparency should work', () => {
    var colorvalue: number = 1; 
    var transparency: number = 0; 
    var color: gtColor = new gtColor(colorvalue, transparency);
    
    expect( color.getColorValue() ).toEqual(1);    
    expect( color.getTransparency() ).toEqual(0);    
  });

  /**
   * constructor(1, 1): with 1 transparency should work
   */
  it('constructor(1, 1): with 1 transparency should work', () => {
    var colorvalue: number = 1; 
    var transparency: number = 1; 
    var color: gtColor = new gtColor(colorvalue, transparency);
    
    expect( color.getColorValue() ).toEqual(1);    
    expect( color.getTransparency() ).toEqual(1);    
  });

  /**
   * constructor(1, 2): with greater transparency should throw exception
   */
  it('constructor(1, 2): with greater transparency should throw exception', () => {
    expect(function() {
      var colorvalue: number = 1;           
      var transparency: number = 2; 
      var color: gtColor = new gtColor(colorvalue, transparency);
    }).toThrow();  
  });

  /**
   * createColorByRGB(-1, -1, -1, -1, "test"): should throw exception
   */
  it('createColorByRGB(-1, -1, -1, -1, "test"): should throw exception', () => {
    expect(function() {
      var red: number = -1;           
      var green: number = -1;         
      var blue: number = -1;          
      var transparency: number = -1;
      var name: string = "test";
      
      gtColor.createColorByRGB(red, green, blue, transparency, name);
    }).toThrow();  
  });

  /**
   * createColorByRGB(64, 128, 255, null, "test"): with null transparency should work
   */
  it('createColorByRGB(64, 128, 255, null, "test"): with null transparency should work', () => {
    var red: number = 64;           
    var green: number = 128;         
    var blue: number = 255;          
    var transparency: number = null;
    var name: string = "test";
    
    var color: gtColor = gtColor.createColorByRGB(red, green, blue, transparency, name);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getRed() ).toEqual(red);    
    expect( color.getGreen() ).toEqual(green);    
    expect( color.getBlue() ).toEqual(blue);    
    expect( color.getTransparency() ).toEqual(null);    
    expect( color.getName() ).toEqual("test");    

  });

  /**
   * createColorByHSB(-1, -1, -1, -1, "test"): should throw exception
   */
  it('createColorByHSB(-1, -1, -1, -1, "test"): should throw exception', () => {
    expect(function() {
      var hue: number = -1;           
      var saturation: number = -1;         
      var brightness: number = -1;          
      var transparency: number = -1;
      var name: string = "test";
      
      gtColor.createColorByHSB(hue, saturation, brightness, transparency, name);
    }).toThrow();  
  });

  /**
   * createColorByHSB(0, 0.5, 0.75, null, "test"): should work
   */
  it('createColorByHSB(0, 0.5, 0.75, null, "test"): should work', () => {
    var hue: number = 0;
    var saturation: number = 0.5;
    var brightness: number = 0.75;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(191);  
    expect( color.getGreen() ).toEqual(96);  
    expect( color.getBlue() ).toEqual(96); 
    expect( color.getTransparency() ).toEqual(null);    
  });

  /**
   * createColorByHSL(-1, -1, -1, -1, "test"): should throw exception
   */
  it('createColorByHSL(-1, -1, -1, -1, "test"): should throw exception', () => {
    expect(function() {
      var hue: number = -1;           
      var saturation: number = -1;         
      var brightness: number = -1;          
      var transparency: number = -1;
      var name: string = "test";
      
      gtColor.createColorByHSB(hue, saturation, brightness, transparency, name);
    }).toThrow();  
  });

  /**
   * createColorByHSL(0, 43, 44, null, "test"): should work: should work
   */
  it('createColorByHSL(0, 43, 44, null, "test"): should work', () => {
    var color: gtColor = gtColor.createColorByHSL(0, 43, 44, null, "test");

    expect( color.getRed() ).toEqual(160);     
    expect( color.getGreen() ).toEqual(64);      
    expect( color.getBlue() ).toEqual(64);
  });

  /**
   * createColorByHex(null, 1, "test"): with null hex string should throw exception
   */
  it('createColorByHex(null, 1, "test"): with null hex string should throw exception', () => {
    expect(function() {
      var hexstring: string = null;           
      var transparency: number = 1;
      var name: string = "test";
      
      gtColor.createColorByHex(hexstring, transparency, name);
    }).toThrow();  
  });

  /**
   * createColorByHex("ffffff", null, "test"): with null transparenz should work
   */
  it('createColorByHex("ffffff", null, "test"): with null transparenz should work', () => {
    var hexstring: string = "ffffff";           
    var transparency: number = null;
    var name: string = "test";
    var color: gtColor = gtColor.createColorByHex(hexstring, transparency, name);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(16777215);
    expect( color.getTransparency() ).toEqual(null);    
    expect( color.getName() ).toEqual("test");    
  });

  /**
   * createColorByHex(undefined, 1, "test"): with undefined hex string should throw exception
   */
  it('createColorByHex(undefined, 1, "test"): with undefined hex string should throw exception', () => {
    expect(function() {
      var hexstring: string;           
      var transparency: number = 1;
      var name: string = "test";
      
      gtColor.createColorByHex(hexstring, transparency, name);
    }).toThrow();  
  });

  /**
   * createColorByHex("ffffff", undefined, "test"): with undefined transparenz should convert to null transparenz
   */
  it('createColorByHex("ffffff", undefined, "test"): with null transparenz should work', () => {
    var hexstring: string = "ffffff";           
    var transparency: number = null;
    var name: string = "test";
    var color: gtColor = gtColor.createColorByHex(hexstring, transparency, name);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(16777215);
    expect( color.getTransparency() ).toEqual(null);    
    expect( color.getName() ).toEqual("test");    
  });

  /**
   * createColorByHex("", 1, "test"): with empty hex string should throw exception
   */
  it('createColorByHex("", 1, "test"): with empty hex string should throw exception', () => {
    expect(function() {
      var hexstring: string = "";           
      var transparency: number = 1;
      var name: string = "test";
      
      gtColor.createColorByHex(hexstring, transparency, name);
    }).toThrow();  
  });
  
  /**
   * createColorByHex("     ", 1, "test"): with blank hex string should throw exception
   */
  it('createColorByHex("     ", 1, "test"): with blank hex string should throw exception', () => {
    expect(function() {
      var hexstring: string = "     ";           
      var transparency: number = 1;
      var name: string = "test";
      
      gtColor.createColorByHex(hexstring, transparency, name);
    }).toThrow();  
  });

  /**
   * createColorByHex("fzffgf", 1, "test"): with invalid hex string should throw exception
   */
  it('createColorByHex("fzffgf", 1, "test"): with no hex string should throw exception', () => {
    expect(function() {
      var hexstring: string = "fzffgf";           
      var transparency: number = 1;
      var name: string = "test";
      
      gtColor.createColorByHex(hexstring, transparency, name);
    }).toThrow();
  });

  /**
   * createColorByHex("ffffff", 0, "test"): with 0 transparenz should work
   */
  it('createColorByHex("ffffff", 0, "test"): with 0 transparenz should work', () => {
    var hexstring: string = "ffffff";           
    var transparency: number = 0;
    var name: string = "test";
    var color: gtColor = gtColor.createColorByHex(hexstring, transparency, name);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(16777215);
    expect( color.getTransparency() ).toEqual(0);    
    expect( color.getName() ).toEqual("test");    
  });

  /**
   * createColorByHex("#ffffff", 1, "test"): with "#" should work
   */ 
  it('createColorByHex("#ffffff", 1, "test"): with "#" should work', () => {
    var hexstring: string = "#ffffff";           
    var transparency: number = 1;
    var name: string = "test";
    var color: gtColor = gtColor.createColorByHex(hexstring, transparency, name);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(16777215);
    expect( color.getTransparency() ).toEqual(1);    
    expect( color.getName() ).toEqual("test");    
  });  

  /**
   * createColorByHex("ffffff", 1, "test"): with valid hex string should work
   */ 
  it('createColorByHex("ffffff", 1, "test"): with "#" should work', () => {
    var hexstring: string = "ffffff";           
    var transparency: number = 1;
    var name: string = "test";
    var color: gtColor = gtColor.createColorByHex(hexstring, transparency, name);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(16777215);
    expect( color.getTransparency() ).toEqual(1);    
    expect( color.getName() ).toEqual("test");    
  });  

  /**
   * createColorByHex("ffffff", 1, "test"): with 1 transparenz should work
   */
  it('createColorByHex("ffffff", 1, "test"): with 1 transparenz should work', () => {
    var hexstring: string = "ffffff";           
    var transparency: number = 1;
    var name: string = "test";
    var color: gtColor = gtColor.createColorByHex(hexstring, transparency, name);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(16777215);
    expect( color.getTransparency() ).toEqual(1);    
    expect( color.getName() ).toEqual("test");    
  });

  /**
   * createColorByHex("ffffff", 1.1, "test"): should throw exception
   */
  it('createColorByHex("ffffff", 1.1, "test"): should throw exception', () => {
    expect(function() {
      var hexstring: string = "ffffff";           
      var transparency: number = 1.1;
      var name: string = "test";
      
      gtColor.createColorByHex(hexstring, transparency, name);
    }).toThrow();
  });

  /**
   * createColorByHTMLName(null, 1): with null name should throw exception
   */
  it('createColorByHTMLName(null, 1): with null name should throw exception', () => {
    expect(function() {
      var colorname: string = null;           
      var transparency: number = 1;
      
      gtColor.createColorByHTMLName(colorname, transparency);
    }).toThrow();
  });

  /**
   * createColorByHTMLName(unkown, 1): with unknown name should throw exception
   */
  it('createColorByHTMLName(unkown, 1, "test"): with unkown name should throw exception', () => {
    expect(function() {
      var colorname: string;           
      var transparency: number = 1;
      
      gtColor.createColorByHTMLName(colorname, transparency);
    }).toThrow();
  });
  
  /**
   * createColorByHTMLName("test", 1): with not exists name should return null
   */
  it('createColorByHTMLName("test", 1): with not exists name should return null', () => {
    var colorname: string = "test";           
    var transparency: number = 1;
    var color: gtColor = gtColor.createColorByHTMLName(colorname, transparency);

    expect( isNull(color) ).toEqual(true);    
  });  

  /**
   * createColorByHTMLName("DIMGRAY", 0.25): with uppercase name should work
   */
  it('createColorByHTMLName("DIMGRAY", 0.25): with uppercase name should work', () => {
    var colorname: string = "DIMGRAY";           
    var transparency: number = 0.25;
    var color: gtColor = gtColor.createColorByHTMLName(colorname, transparency);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(0x696969);    
    expect( color.getTransparency() ).toEqual(transparency);    
    expect( color.getName() ).toEqual("DimGray");    
  });

  /**
   * createColorByHTMLName("DimGray", 0.25): with correct name should work
   */
  it('createColorByHTMLName("DimGray", 0.25): with correct name should work', () => {
    var colorname: string = "DimGray";           
    var transparency: number = 0.25;
    var color: gtColor = gtColor.createColorByHTMLName("DimGray", transparency);

    expect( isNull(color) ).toEqual(false);    
    expect( color.getColorValue() ).toEqual(0x696969);    
    expect( color.getTransparency() ).toEqual(transparency);    
    expect( color.getName() ).toEqual(colorname);    
  });

  /**
   * getHTMLColor(null): should return null if null 
   */
  it('getHTMLColor(null): should return null if null', () => {
    let name: string = null;

    expect( gtColor.getHTMLColor(name) ).toEqual(null);    
  });

  /**
   * getHTMLColor(undefined): should return null if not name not a html color 
   */
  it('getHTMLColor(undefined): should return null if not name not a html color', () => {
    let name: string;

    expect( gtColor.getHTMLColor(name) ).toEqual(null);    
  });

  /**
   * getHTMLColor(""): should return null by empty string 
   */
  it('getHTMLColor(""): should return null by empty string', () => {
    let name: string = "";

    expect( gtColor.getHTMLColor(name) ).toEqual(null);    
  });

  /**
   * getHTMLColor("     "): should return null by blank string 
   */
  it('getHTMLColor("     "): should return null by blank string', () => {
    let name: string = "     ";

    expect( gtColor.getHTMLColor(name) ).toEqual(null);    
  });

  /**
   * getHTMLColor("abc"): should return null if not name not a html color 
   */
  it('getHTMLColor("abc"): should return null if not name not a html color', () => {
    expect( gtColor.getHTMLColor("abc") ).toEqual(null);    
  });

  /**
   * getHTMLColor("MEDIUMSEAGREEN"): should return value if uppercase html color name exists 
   */
  it('getHTMLColor("MediumSeaGreen"): should return value if html color name exists', () => {
    expect( gtColor.getHTMLColor("MediumSeaGreen").getColorValue() ).toEqual( 3978097 );    
  });

  /**
   * getHTMLColor("MediumSeaGreen"): should return value if html color name exists 
   */
  it('getHTMLColor("MediumSeaGreen"): should return value if html color name exists', () => {
    expect( gtColor.getHTMLColor("MediumSeaGreen").getColorValue() ).toEqual( 3978097 );    
  });

  /**
   * getHTMLColorName(null): should return null if value null 
   */
  it('getHTMLColorName(null): should return null if value null', () => {
    let value = null;

    expect( gtColor.getHTMLColorName(value) ).toEqual(null);    
  });

  /**
   * getHTMLColorName(undefined): should return null if value undefined 
   */
  it('getHTMLColorName(undefined): should return null if value undefined', () => {
    let value;

    expect( gtColor.getHTMLColorName(value) ).toEqual(null);    
  });

  /**
   * getHTMLColorName(-1): should return null if value negativ 
   */
  it('getHTMLColorName(-1): should return null if value negativ', () => {
    expect( gtColor.getHTMLColorName(-1) ).toEqual(null);    
  });

  /**
   * getHTMLColorName(1): should return null if value not exists 
   */
  it('getHTMLColorName(1): should return null if value not exists', () => {
    expect( gtColor.getHTMLColorName(1) ).toEqual(null);    
  });

  /**
   * get a html color name from html color value by name if definied 
   */
  it('getHTMLColorName(3978097): should return "MediumSeaGreen"', () => {
    expect( gtColor.getHTMLColorName(3978097).getName() ).toEqual("MediumSeaGreen");    
  });

  /**
   * setColorValue(null): It must throw TypeError if color is null 
   */
  it('setColorValue(null): It must throw TypeError if color is null', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = null;
  
      color.setColorValue(value);
    }).toThrow();
  });

  /**
   * setColorValue(undefined): It must throw TypeError if color is undefined 
   */
  it('setColorValue(undefined): It must throw TypeError if color is undefined', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number;
  
      color.setColorValue(value);
    }).toThrow();
  });

  /**
   * setColorValue(-1): It must throw RangeError if color is <0 
   */
  it('setColorValue(-1): It must throw RangeError if color is <0', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = -1;
  
      color.setColorValue(value);
    }).toThrow();
  });

  /**
   * set color value. It must be work if color is >=0 
   */
  it('setColorValue(0): It must be work if color is >=0', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 0;

    color.setColorValue(value);
    expect( color.getColorValue() ).toEqual(value);    
  });

  /**
   * get color value. Must be return the value of color 
   */
  it('getColorValue(): Must be return the value of setColorValue', () => {
    var color: gtColor = new gtColor(12);
    var value: number = 12;
  
    color.setColorValue(value);
    expect( color.getColorValue() ).toEqual(12);    
  });

  /**
   * setTrancparency(null) should work
   */
  it('setTransparency(null): should work', () => {
    var color: gtColor = new gtColor(1);
    var transparency: number = null;

    color.setTransparency(transparency);

    expect( color.getTransparency() ).toEqual(transparency);  
  });

  /**
   * setTrancparency(undefined) should throw a TypeError
   */  
  it('setTransparency(undefined): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var transparency: number;
  
      color.setTransparency(transparency);
    }).toThrow();
  });

  /**
   * setTrancparency(-0.1) should throw a RangeError
   */ 
  it('setTransparency(-0.1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var transparency: number = -0.1;
  
      color.setTransparency(transparency);
    }).toThrow();
  });

  /**
   * setTrancparency(0) should work
   */ 
  it('setTransparency(0): should work', () => {
    var color: gtColor = new gtColor(1);
    var transparency: number = 0;

    color.setTransparency(transparency);

    expect( color.getTransparency() ).toEqual(transparency);  
  });

  /**
   * getTrancparency(0.5) should work
   */
  it('getTransparency(): should work', () => {
    var color: gtColor = new gtColor(1);
    var transparency: number = 0.5;

    color.setTransparency(transparency);

    expect( color.getTransparency() ).toEqual(transparency);  
  });

  /**
   * setTrancparency(1) should work
   */
  it('setTransparency(1): should work', () => {
    var color: gtColor = new gtColor(1);
    var transparency: number = 1;

    color.setTransparency(transparency);

    expect( color.getTransparency() ).toEqual(transparency);  
  });
  
  /**
   * setTrancparency(1.1) should throw a RangeError
   */
  it('setTransparency(1.1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var transparency: number = 1.1;
  
      color.setTransparency(transparency);
    }).toThrow();
  });

  /**
   * setRed(null) should throw a RangeError
   */
  it('setRed(null): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = null;
  
      color.setRed(value);
    }).toThrow();
  });  

  /**
   * setRed(unknown) should throw a TypeError
   */
  it('setRed(unknown): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number;
  
      color.setRed(value);
    }).toThrow();
  });  

  /**
   * setRed(-1) should throw a RangeError
   */
  it('setRed(-1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = -1;
  
      color.setRed(value);
    }).toThrow();
  });  

  /**
   * setRed(0) should work
   */
  it('setRed(0): should work', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 0;
    
    color.setRed(value);

    expect( color.getRed() ).toEqual(value);  
  });

  /**
   * setRed(124.5) should be red = 125
   */
  it('setRed(124.5) should be red = 125', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 124.5;
    
    color.setRed(value);

    expect( color.getRed() ).toEqual(125);  
  });


  /**
   * setRed(255) should work
   */
  it('setRed(255): should work', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 255;
    
    color.setRed(value);

    expect( color.getRed() ).toEqual(value);  
  });  

  /**
   * setRed(256) should throw a RangeError
   */
  it('setRed(256): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = 256;
  
      color.setRed(value);
    }).toThrow();
  });  

  /**
   * setGreen(null) should throw a TypeError
   */
  it('setGreen(null): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = null;
  
      color.setGreen(value);
    }).toThrow();
  });  

  /**
   * setGreen(unknown) should throw a TypeError
   */
  it('setGreen(unknown): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number;
  
      color.setGreen(value);
    }).toThrow();
  });  

  /**
   * setGreen(-1) should throw a RangeError
   */
  it('setGreen(-1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = -1;
  
      color.setGreen(value);
    }).toThrow();
  });  

  /**
   * setGreen(0) should work
   */
  it('setGreen(0): should work', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 0;
    
    color.setGreen(value);

    expect( color.getGreen() ).toEqual(value);  
  });
  /**
   * setGreen(124.5) should be red = 125
   */
  it('setGreen(124.5): should work gree = 125', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 124.5;
    
    color.setGreen(value);

    expect( color.getGreen() ).toEqual(125);  
  });

  /**
   * setGreen(255) should work
   */
  it('setGreen(255): should work', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 255;
    
    color.setGreen(value);

    expect( color.getGreen() ).toEqual(value);  
  });  

  /**
   * setGreen(256) should throw a RangeError
   */
  it('setGreen(256): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = 256;
  
      color.setGreen(value);
    }).toThrow();
  });  

  /**
   * setBlue(null) should throw a RangeError
   */
  it('setBlue(null): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = null;
  
      color.setBlue(value);
    }).toThrow();
  });  

  /**
   * setBlue(unknown) should throw a RangeError
   */
  it('setBlue(unknown): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number;
  
      color.setBlue(value);
    }).toThrow();
  });  

  /**
   * setBlue(-1) should throw a RangeError
   */
  it('setBlue(-1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = -1;
  
      color.setBlue(value);
    }).toThrow();
  });  

  /**
   * setBlue(0) should work
   */
  it('setBlue(0): should work', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 0;
    
    color.setBlue(value);

    expect( color.getBlue() ).toEqual(value);  
  });

  /**
   * setBlue(124.5) should be blue = 125
   */
  it('setBlue(124.5): should work blue = 125', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 124.5;
    
    color.setBlue(value);

    expect( color.getBlue() ).toEqual(125);  
  });  

  /**
   * setBlue(255) should work
   */
  it('setBlue(255): should work', () => {
    var color: gtColor = new gtColor(1);
    var value: number = 255;

    color.setBlue(value);

    expect( color.getBlue() ).toEqual(value);  
  });  

  /**
   * setBlue(256) should throw a RangeError
   */
  it('setBlue(256): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var value: number = 256;
  
      color.setBlue(value);
    }).toThrow();
  });  

  /**
   * setRGB(null, 1, 1) should throw a TypeError
   */
  it('setRGB(null, 1, 1): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = null;
      var green: number = 1;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);
    }).toThrow();
  });  

  /**
   * setRGB(1, null, 1) should throw a TypeError
   */
  it('setRGB(1, null, 1): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number = null;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);
    }).toThrow();
  });  

  /**
   * setRGB(1, 1, null) should throw a TypeError
   */
  it('setRGB(1, 1, null): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number = 1;
      var blue: number = null;
  
      color.setRGB(red, green, blue);
    }).toThrow();
  });  

  /**
   * setRGB(unknown, 1, 1) should throw a TypeError
   */
  it('setRGB(unknown, 1, 1): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number;
      var green: number = 1;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });  
  /**
   * setRGB(1, unknown, 1) should throw a TypeError
   */
  it('setRGB(1, unknown, 1): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * setRGB(1, 1, unknown) should throw a TypeError
   */
  it('setRGB(1, 1, unknown): should throw TypeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number = 1;
      var blue: number;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * setRGB(-1, 1, 1) should throw a RangeError
   */
  it('setRGB(-1, 1, 1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = -1;
      var green: number = 1;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * setRGB(1, -1, 1) should throw a RangeError
   */
  it('setRGB(1, -1, 1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number = -1;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * setRGB(1, 1, -1) should throw a RangeError
   */
  it('setRGB(1, 1, -1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number = 1;
      var blue: number = -1;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * setRGB(0, 0, 0) should work
   */
  it('setRGB(0, 0, 0): should work', () => {
    var color: gtColor = new gtColor(1);
    var red: number = 0;
    var green: number = 0;
    var blue: number = 0;
  
    color.setRGB(red, green, blue);  

    expect( color.getRed() ).toEqual(0);  
    expect( color.getGreen() ).toEqual(0);  
    expect( color.getBlue() ).toEqual(0);  
  });

  /**
   * setRGB(124.5, 124.5, 124.5) should work (125, 125, 125)
   */
  it('setRGB(124.5, 124.5, 124.5) should work (125, 125, 125)', () => {
    var color: gtColor = new gtColor(1);
    var red: number = 124.5;
    var green: number = 124.5;
    var blue: number = 124.5;
  
    color.setRGB(red, green, blue);  

    expect( color.getRed() ).toEqual(125);  
    expect( color.getGreen() ).toEqual(125);  
    expect( color.getBlue() ).toEqual(125);  
  });

  /**
   * setRGB(255, 255, 255) should work
   */
  it('setRGB(255, 255, 255): should work', () => {
    var color: gtColor = new gtColor(1);
    var red: number = 255;
    var green: number = 255;
    var blue: number = 255;
  
    color.setRGB(red, green, blue);  

    expect( color.getRed() ).toEqual(255);  
    expect( color.getGreen() ).toEqual(255);  
    expect( color.getBlue() ).toEqual(255);  
  });

  /**
   * setRGB(256, 1, 1) should throw a RangeError
   */
  it('setRGB(256, 1, 1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 256;
      var green: number = 1;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * setRGB(1, 256, 1) should throw a RangeError
   */
  it('setRGB(1, 256, 1): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number = 256;
      var blue: number = 1;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * setRGB(1, 1, 256) should throw a RangeError
   */
  it('setRGB(1, 1, 256): should throw RangeError Exception', () => {
    expect(function() {
      var color: gtColor = new gtColor(1);
      var red: number = 1;
      var green: number = 1;
      var blue: number = 256;
  
      color.setRGB(red, green, blue);  
    }).toThrow();
  });

  /**
   * getRGB() should work
   */
  it('getRGB(): should work', () => {
    var color: gtColor = new gtColor(1);
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;
  
    color.setRGB(red, green, blue);  
    var rgb = color.getRGB();

    expect( rgb.red ).toEqual(64);  
    expect( rgb.green ).toEqual(128);  
    expect( rgb.blue ).toEqual(255);  
  });

  /**
   * setByHSB(null, 0.5, 0.75): should throw exception
   */
  it('setByHSB(null, 0.5, 0.75): should throw exception', () => {
    expect(function() {
      var hue: number = null;
      var saturation: number = 0.5;
      var brightness: number = 0.75;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(0.25, null, 0.75): should throw exception
   */
  it('setByHSB(0.25, null, 0.75): should throw exception', () => {
    expect(function() {
      var hue: number = 0.25;
      var saturation: number = null;
      var brightness: number = 0.75;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(0.25, 0.5, null): should throw exception
   */
  it('setByHSB(0.25, 0.5, null): should throw exception', () => {
    expect(function() {
      var hue: number = 0.25;
      var saturation: number = 0.5;
      var brightness: number = null;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(undefined, 0.5, 0.75): should throw exception
   */
  it('setByHSB(undefined, 0.5, 0.75): should throw exception', () => {
    expect(function() {
      var hue: number;
      var saturation: number = 0.5;
      var brightness: number = 0.75;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(0.25, undefined, 0.75): should throw exception
   */
  it('setByHSB(0.25, undefined, 0.75): should throw exception', () => {
    expect(function() {
      var hue: number = 0.25;
      var saturation: number;
      var brightness: number = 0.75;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(0.25, 0.5, undefined): should throw exception
   */
  it('setByHSB(0.25, 0.5, undefined): should throw exception', () => {
    expect(function() {
      var hue: number = 0.25;
      var saturation: number = 0.5;
      var brightness: number;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(-1, 0.5, 0.75): should throw exception
   */
  it('setByHSB(-1, 0.5, 0.75): should throw exception', () => {
    expect(function() {
      var hue: number = -1;
      var saturation: number = 0.5;
      var brightness: number = 0.75;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(0.25, -1, 0.75): should throw exception
   */
  it('setByHSB(0.25, -1, 0.75): should throw exception', () => {
    expect(function() {
      var hue: number = 0.25;
      var saturation: number = -1;
      var brightness: number = 0.75;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(0.25, 0.5, -1): should throw exception
   */
  it('setByHSB(0.25, 0.5, -1): should throw exception', () => {
    expect(function() {
      var hue: number = 0.25;
      var saturation: number = 0.5;
      var brightness: number = -1;
  
      var color: gtColor = new gtColor(1);
      color.setByHSB(hue, saturation, brightness);
    }).toThrow();
  });

  /**
   * setByHSB(0, 0.5, 0.75): should work
   */
  it('setByHSB(0, 0.5, 0.75): should work', () => {
    var hue: number = 0;
    var saturation: number = 0.5;
    var brightness: number = 0.75;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(191);  
    expect( color.getGreen() ).toEqual(96);  
    expect( color.getBlue() ).toEqual(96); 
    
    var hsb: { hue: number; saturation: number; brightness: number} = color.getHSB();

    expect( hsb.hue ).toEqual(hue);  
    expect( hsb.saturation ).toEqual(saturation);  
    expect( hsb.brightness ).toEqual(brightness); 
  });

  /**
   * setByHSB(0.25, 0, 0.75): should work
   */
  it('setByHSB(0.25, 0, 0.75): should work', () => {
    var hue: number = 0.25;
    var saturation: number = 0;
    var brightness: number = 0.75;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(191);  
    expect( color.getGreen() ).toEqual(191);  
    expect( color.getBlue() ).toEqual(191); 
    
    var hsb: { hue: number; saturation: number; brightness: number} = color.getHSB();

    expect( hsb.hue ).toEqual(0);  
    expect( hsb.saturation ).toEqual(saturation);  
    expect( hsb.brightness ).toEqual(brightness); 
  });

  /**
   * setByHSB(0.25, 0.5, 0): should work
   */
  it('setByHSB(0.25, 0.5, 0): should work', () => {
    var hue: number = 0.25;
    var saturation: number = 0.5;
    var brightness: number = 0;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(0);  
    expect( color.getGreen() ).toEqual(0);  
    expect( color.getBlue() ).toEqual(0); 
    
    var hsb: { hue: number; saturation: number; brightness: number} = color.getHSB();

    expect( hsb.hue ).toEqual(0);  
    expect( hsb.saturation ).toEqual(0);  
    expect( hsb.brightness ).toEqual(brightness); 
  });

  /**
   * setByHSB(0.25, 0.5, 0.75): should work
   */
  it('setByHSB(0.25, 0.5, 0.75): should work', () => {
    var hue: number = 0.25;
    var saturation: number = 0.5;
    var brightness: number = 0.75;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(143);  
    expect( color.getGreen() ).toEqual(191);  
    expect( color.getBlue() ).toEqual(96); 
    
    var hsb: { hue: number; saturation: number; brightness: number} = color.getHSB();

    expect( hsb.hue ).toEqual(hue);  
    expect( hsb.saturation ).toEqual(saturation);  
    expect( hsb.brightness ).toEqual(brightness); 
  });

  /**
   * setByHSB(1, 0.5, 0.75): should work
   */
  it('setByHSB(1, 0.5, 0.75): should work', () => {
    var hue: number = 1;
    var saturation: number = 0.5;
    var brightness: number = 0.75;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(191);  
    expect( color.getGreen() ).toEqual(96);  
    expect( color.getBlue() ).toEqual(96); 
    
    var hsb: { hue: number; saturation: number; brightness: number} = color.getHSB();

    expect( hsb.hue ).toEqual(0);  
    expect( hsb.saturation ).toEqual(saturation);  
    expect( hsb.brightness ).toEqual(brightness); 
  });

  /**
   * setByHSB(0.25, 1, 0.75): should work
   */
  it('setByHSB(0.25, 1, 0.75): should work', () => {
    var hue: number = 0.25;
    var saturation: number = 1;
    var brightness: number = 0.75;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(96);  
    expect( color.getGreen() ).toEqual(191);  
    expect( color.getBlue() ).toEqual(0); 
    
    var hsb: { hue: number; saturation: number; brightness: number} = color.getHSB();

    expect( hsb.hue ).toEqual(hue);  
    expect( hsb.saturation ).toEqual(saturation);  
    expect( hsb.brightness ).toEqual(brightness); 
  });

  /**
   * setByHSB(0.25, 0.5, 1): should work
   */
  it('setByHSB(0.25, 0.5, 1): should work', () => {
    var hue: number = 0.25;
    var saturation: number = 0.5;
    var brightness: number = 1;

    var color: gtColor = new gtColor(1);
    color.setByHSB(hue, saturation, brightness);

    expect( color.getRed() ).toEqual(191);  
    expect( color.getGreen() ).toEqual(255);  
    expect( color.getBlue() ).toEqual(128); 
    
    var hsb: { hue: number; saturation: number; brightness: number} = color.getHSB();

    expect( hsb.hue ).toEqual(hue);  
    expect( hsb.saturation ).toEqual(saturation);  
    expect( hsb.brightness ).toEqual(brightness); 
  });

  /**
   * getHSL(r: 64, g: 87, b: 159): should return [h: 225°, s: 43%, l: 44%] 
   */
  it('getHSL(r: 64, g: 87, b: 159): should return [h: 225°, s: 43%, l: 44%]', () => {
    var red: number = 64;
    var green: number = 87;
    var blue: number = 159;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue);
    
    var hsl: { hue: number; saturation: number; lightness: number} = color.getHSL();

    expect( hsl.hue ).toEqual(225);  
    expect( hsl.saturation ).toEqual(43);  
    expect( hsl.lightness ).toEqual(44); 
  });

  /**
   * setByHSL(h: null, s: 43%, l: 44%): should be throw an exception
   */
  it('setByHSL(h: null, s: 43%, l: 44%): should be throw an exception', () => {
    expect(function() {
      var hue: number = null;
      var saturation: number = 43;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: null, l: 44%): should be throw an exception
   */
  it('setByHSL(h: 225, s: null, l: 44%): should be throw an exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number = null;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: 43%, l: null): should be throw an exception
   */
  it('setByHSL(h: 225, s: 43%, l: null): should be throw an exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number = 43;
      var lightness: number = null;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: undefined, s: 43%, l: 44%): should be throw an exception
   */
  it('setByHSL(h: undefined, s: 43%, l: 44%): should be throw an exception', () => {
    expect(function() {
      var hue: number;
      var saturation: number = 43;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: undefined, l: 44%): should be throw an exception
   */
  it('setByHSL(h: 225, s: undefined, l: 44%): should be throw an exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: 43%, l: undefined): should be throw an exception
   */
  it('setByHSL(h: 225, s: 43%, l: undefined): should be throw an exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number = 43;
      var lightness: number;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: -1, s: 43%, l: 44%): should be throw an exception
   */
  it('setByHSL(h: -1, s: 43%, l: 44%): should be throw an exception', () => {
    expect(function() {
      var hue: number = -1;
      var saturation: number = 43;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: -1, l: 44%): should be throw an exception
   */
  it('setByHSL(h: 225, s: -1, l: 44%): should be throw an exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number = -1;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: 43%, l: -1): should be throw an exception
   */
  it('setByHSL(h: 225, s: 43%, l: -1): should be throw an exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number = 43;
      var lightness: number = -1;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 0, s: 43%, l: 44%): should work
   */
  it('setByHSL(h: 0, s: 43%, l: 44%): should work', () => {
    var hue: number = 0;
    var saturation: number = 43;
    var lightness: number = 44;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);

    expect( color.getRed() ).toEqual(160);     
    expect( color.getGreen() ).toEqual(64);      
    expect( color.getBlue() ).toEqual(64);   
  });

  /**
   * setByHSL(h: 225, s: 0, l: 44%): should be throw an exception
   */
  it('setByHSL(h: 225, s: 0, l: 44%): should work', () => {
    var hue: number = 225;
    var saturation: number = 0;
    var lightness: number = 44;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);

    expect( color.getRed() ).toEqual(112);     
    expect( color.getGreen() ).toEqual(112);      
    expect( color.getBlue() ).toEqual(112);
  });

  /**
   * setByHSL(h: 225, s: 43%, l: 0): should work
   */
  it('setByHSL(h: 225, s: 43%, l: 0): should work', () => {
    var hue: number = 225;
    var saturation: number = 43;
    var lightness: number = 0;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);

    expect( color.getRed() ).toEqual(0);     
    expect( color.getGreen() ).toEqual(0);      
    expect( color.getBlue() ).toEqual(0);
  });

  /**
   * setByHSL(h: 225°, s: 43%, l: 44%): should be (r: 64, g: 87, b: 159)
   */
  it('setByHSL(h: 225°, s: 43%, l: 44%): should be (r: 64, g: 88, b: 160)', () => {
    var hue: number = 225;
    var saturation: number = 43;
    var lightness: number = 44;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);
    
    expect( color.getRed() ).toEqual(64);     
    expect( color.getGreen() ).toEqual(88);      
    expect( color.getBlue() ).toEqual(160);   
  });

  /**
   * setByHSL(229, 25, 50): should work
   */
  it('setByHSL(229, 25, 50): should work', () => {
    var hue: number = 229;
    var saturation: number = 50;
    var lightness: number = 50;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);
    var hsl: { hue: number; saturation: number; lightness: number } = color.getHSL();

    expect( hsl.hue ).toEqual(hue);     
    expect( hsl.saturation ).toEqual(saturation);      
    expect( hsl.lightness ).toEqual(lightness);   
  });

  /**
   * setByHSL(h: 359, s: 43%, l: 44%): should work
   */
  it('setByHSL(h: 359, s: 43%, l: 44%): should work', () => {
    var hue: number = 359;
    var saturation: number = 43;
    var lightness: number = 44;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);

    expect( color.getRed() ).toEqual(160);     
    expect( color.getGreen() ).toEqual(64);      
    expect( color.getBlue() ).toEqual(66);   
  });

  /**
   * setByHSL(h: 225, s: 100, l: 44%): work
   */
  it('setByHSL(h: 225, s: 100, l: 44%): should work', () => {
    var hue: number = 225;
    var saturation: number = 100;
    var lightness: number = 44;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);

    expect( color.getRed() ).toEqual(0);     
    expect( color.getGreen() ).toEqual(56);      
    expect( color.getBlue() ).toEqual(224);
  });

  /**
   * setByHSL(h: 225, s: 43%, l: 100): should work
   */
  it('setByHSL(h: 225, s: 43%, l: 100): should work', () => {
    var hue: number = 225;
    var saturation: number = 43;
    var lightness: number = 100;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);

    expect( color.getRed() ).toEqual(255);     
    expect( color.getGreen() ).toEqual(255);      
    expect( color.getBlue() ).toEqual(255);
  });

  /**
   * setByHSL(h: 360, s: 43%, l: 44%): should throw exception
   */
  it('setByHSL(h: 360, s: 43%, l: 44%): should throw exception', () => {
    expect(function() {
      var hue: number = 360;
      var saturation: number = 43;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: 101%, l: 44%): should throw exception
   */
  it('setByHSL(h: 225, s: 101%, l: 44%): should throw exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number = 101;
      var lightness: number = 44;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: 100, l: 44%): work
   */
  it('setByHSL(h: 225, s: 43, l: 101%): should throw exception', () => {
    expect(function() {
      var hue: number = 225;
      var saturation: number = 43;
      var lightness: number = 101;
      var color: gtColor = new gtColor(1);
  
      color.setByHSL(hue, saturation, lightness);
    }).toThrow();
  });

  /**
   * setByHSL(h: 225, s: 43%, l: 100): should work
   */
  it('setByHSL(h: 225, s: 43%, l: 100): should work', () => {
    var hue: number = 225;
    var saturation: number = 43;
    var lightness: number = 100;
    var color: gtColor = new gtColor(1);

    color.setByHSL(hue, saturation, lightness);

    expect( color.getRed() ).toEqual(255);     
    expect( color.getGreen() ).toEqual(255);      
    expect( color.getBlue() ).toEqual(255);
  });

  /**
   * clone() should work
   */
  it('clone(): should work', () => {
    var color: gtColor = new gtColor(4227327, 0.5, "test");
    var clonedColor: gtColor = color.clone();

    expect( clonedColor != color ).toEqual(true);                        
    expect( clonedColor.getColorValue() ).toEqual(4227327);                        
    expect( clonedColor.getTransparency() ).toEqual(0.5);                        
    expect( clonedColor.getName() ).toEqual("test");                        
  });

  /**
   * equals(null): should return false
   */
  it('equals(null): should return false', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue);
    var otherColor: gtColor = null;

    expect( color.equals(otherColor) ).toEqual(false);                        
  });

  /**
   * equals(undefined): should return false
   */
  it('equals(undefined): should return false', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue);
    var otherColor: gtColor;

    expect( color.equals(otherColor) ).toEqual(false);                        
  });

  /**
   * equals(this): should return true
   */
  it('equals(this): should return true', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue);
    var otherColor: gtColor = color;

    expect( color.equals(otherColor) ).toEqual(true);                        
  });

  /**
   * equals(different colorvalues): should return false
   */
  it('equals(different colorvalues): should return false', () => {
    var colorvalue: number = 4227327; // r: 64, g: 128, b: 255
    var otherColorvalue: number = 16728192; // r: 255, g: 64, b: 128

    var color: gtColor = new gtColor(colorvalue);
    var otherColor: gtColor = new gtColor(otherColorvalue);

    expect( color.equals(otherColor) ).toEqual(false);                        
  });

  /**
   * equals(different transparency): should return false
   */
  it('equals(different transparency): should return false', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue, 0.5);
    var otherColor: gtColor = gtColor.createColorByRGB(red, green, blue, 0.25);

    expect( color.equals(otherColor) ).toEqual(false);                        
  });

  /**
   * equals(different green): should return true
   */
  it('equals(different name): should return true', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;
    var transparency: number = 0.25;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue, transparency, "color1");
    var otherColor: gtColor = gtColor.createColorByRGB(red, green, blue, transparency, "color2");

    expect( color.equals(otherColor) ).toEqual(true);                        
  });

  /**
   * toRGB() should work
   */
  it('toRGB(): should work', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue);

    expect( color.toRGB() ).toEqual("rgb(" + red + ", " + green + ", " + blue + ")");                        
  });

  /**
   * toRGBA() should work with defined transparency
   */
  it('toRGBA(): with defined transparency should work', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;
    var transparency: number = 0.5;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue, transparency);

    expect( color.toRGBA() ).toEqual("rgba(" + red + ", " + green + ", " + blue + ", " + transparency + ")");                        
  });

  /**
   * toRGBA() should work with not defined transparency
   */
  it('toRGBA(): with not defined transparency should work', () => {
    var red: number = 64;
    var green: number = 128;
    var blue: number = 255;
    var transparency: number = null;

    var color: gtColor = gtColor.createColorByRGB(red, green, blue, transparency);

    color.setRGB(red, green, blue);
    color.setTransparency(transparency);

    expect( color.toRGBA() ).toEqual("rgb(" + red + ", " + green + ", " + blue + ")");                        
  });

  /**
   * toHex(FFFFFF) should work
   */
  it('toHex(FFFFFF): should work', () => {
    var color: gtColor = new gtColor(1);
    var red: number = 255;
    var green: number = 255;
    var blue: number = 255;

    color.setRGB(red, green, blue);

    expect( color.toHex() ).toEqual("#ffffff");                        
  });

  /**
   * toHex() should work
   */
  it('toHex(0): should work', () => {
    var color: gtColor = new gtColor(1);
    var red: number = 0;
    var green: number = 0;
    var blue: number = 0;

    color.setRGB(red, green, blue);

    expect( color.toHex() ).toEqual("#000000");                        
  });

  /**
   * toHSL() should work
   */
  it('toHSL(): should work', () => {
    var hue: number = 0;
    var saturation: number = 43;
    var lightness: number = 44;
    
    var color: gtColor = gtColor.createColorByHSL(hue, saturation, lightness);

    expect( color.toHSL() ).toEqual("hsl(" + hue + ", " + saturation + "%, " + lightness + "%)");                        
  });

  /**
   * toHSLA() should work with defined transparency
   */
  it('toHSLA(): with defined transparency should work', () => {
    var hue: number = 0;
    var saturation: number = 43;
    var lightness: number = 44;
    var transparency: number = 0.5;

    var color: gtColor = gtColor.createColorByHSL(hue, saturation, lightness, transparency);

    expect( color.toHSLA() ).toEqual("hsla(" + hue + ", " + saturation + "%, " + lightness + "%, " + transparency + ")");                        
  });

  /**
   * toRGBA() should work with not defined transparency
   */
  it('toRGBA(): with not defined transparency should work', () => {
    var hue: number = 0;
    var saturation: number = 43;
    var lightness: number = 44;
    var transparency: number = null;

    var color: gtColor = gtColor.createColorByHSL(hue, saturation, lightness, transparency);

    expect( color.toHSLA() ).toEqual("hsl(" + hue + ", " + saturation + "%, " + lightness + "%)");                        
  });

});

//======================== Color Palette =========================================================
describe('gtColorPalette', () => {
  /**
   * can be create an color palette
   */
  it('constructor(): should create an instance', () => {
    var colorpalette: gtColorPalette = new gtColorPalette();

    expect(colorpalette).toBeTruthy();
    expect(colorpalette.count()).toEqual(0);
    expect(colorpalette.getName()).toEqual(undefined);
  });

  /**
   * constructor(null): can be create an color palette with null list
   */
  it('constructor(null): can be create an color palette with null list', () => {
    var colorpalette: gtColorPalette = new gtColorPalette(null);

    expect(colorpalette).toBeTruthy();
    expect(colorpalette.count()).toEqual(0);
    expect(colorpalette.getName()).toEqual(undefined);
  });

  /**
   * constructor(undefined): can be create an color palette with undefined list
   */
  it('constructor(undefined): can be create an color palette with undefined list', () => {
    var colorlist: Array<gtColor>;
    var colorpalette: gtColorPalette = new gtColorPalette(colorlist);

    expect(colorpalette).toBeTruthy();
    expect(colorpalette.count()).toEqual(0);
    expect(colorpalette.getName()).toEqual(undefined);
  });

  /**
   * constructor(colorlist): can be create an color palette with a color list
   */
  it('constructor(colorlist): can be create an color palette with null list', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );

    expect(colorpalette).toBeTruthy();
    expect(colorpalette.count()).toEqual(3);
    expect(colorpalette.get(0)).toEqual(color1);
    expect(colorpalette.get(1)).toEqual(color2);
    expect(colorpalette.get(2)).toEqual(color3);
    expect(colorpalette.getName()).toEqual(undefined);
  });

  /**
   * constructor(null, "palette1"): can be create an color palette with name
   */
  it('constructor(null, "palette1"): can be create an color palette with undefined list', () => {
    var colorlist: Array<gtColor> = null;
    var name: String = "palette1";

    var colorpalette: gtColorPalette = new gtColorPalette(colorlist, name);

    expect(colorpalette).toBeTruthy();
    expect(colorpalette.count()).toEqual(0);
    expect(colorpalette.getName()).toEqual(name);
  });

  /**
   * geName() / setName(): should work
   */
  it('geName() / setName(): should work', () => {
    var colorlist: Array<gtColor> = null;
    var name: String = "palette1";
    var otherName: string = "palette2";

    var colorpalette: gtColorPalette = new gtColorPalette(colorlist, name);
    colorpalette.setName(otherName);

    expect(colorpalette).toBeTruthy();
    expect(colorpalette.count()).toEqual(0);
    expect(colorpalette.getName()).toEqual(otherName);
  });

  /**
   * add( null ): should throw exception
   */
  it('add( null ): should throw exception', () => {
    expect(function() {
      var color: gtColor = null;
      var colorpalette: gtColorPalette = new gtColorPalette(null);

      colorpalette.add(color);
    }).toThrow();
  });

  /**
   * add( undefined ): should throw exception
   */
  it('add( undefined ): should throw exception', () => {
    expect(function() {
      var color: gtColor;
      var colorpalette: gtColorPalette = new gtColorPalette(null);

      colorpalette.add(color);
    }).toThrow();
  });

  /**
   * add( color ): should work
   */
  it('add( color ): should work', () => {
    var color: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var colorpalette: gtColorPalette = new gtColorPalette(null);
    var count: number = colorpalette.add(color);
  
    expect(count).toEqual(1);
    expect(colorpalette.get(0)).toEqual(color);  
  });

  /**
   * set( null, color ): should throw exception by index = null
   */
  it('set( null, color ): should throw exception by index = null', () => {
    expect(function() {
      var colorpalette: gtColorPalette = new gtColorPalette(null);
      var color: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var count: number = colorpalette.add(color);
      var otherColor: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var index: number = null;
    
      colorpalette.set(index, otherColor);  
    }).toThrow();
  });

  /**
   * set( undefinied, color ): should throw exception by undefined index
   */
  it('set( undefined, color ): should throw exception by undefined index', () => {
    expect(function() {
      var colorpalette: gtColorPalette = new gtColorPalette(null);
      var color: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var count: number = colorpalette.add(color);
      var otherColor: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var index: number;

      colorpalette.set(index, otherColor);  
    }).toThrow();
  });

  /**
   * set( -1, color ): should throw exception by negativ index
   */
  it('set( -1, color ): should throw exception by negativ index', () => {
    expect(function() {
      var colorpalette: gtColorPalette = new gtColorPalette(null);
      var color: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var count: number = colorpalette.add(color);
      var otherColor: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var index: number = -1;

      colorpalette.set(index, otherColor);  
    }).toThrow();
  });

  /**
   * set( 0, null ): should throw exception if not color exists
   */
  it('set( 0, null ): should throw exception if not color exists', () => {
    expect(function() {
      var colorpalette: gtColorPalette = new gtColorPalette(null);
      var otherColor: gtColor = null;
      var index: number = 0;

      colorpalette.set(index, otherColor);  
    }).toThrow();
  });

  /**
   * set( 0, undefined ): should throw exception if color undefined
   */
  it('set( 0, undefined ): should throw exception if color undefined', () => {
    expect(function() {
      var colorpalette: gtColorPalette = new gtColorPalette(null);
      var otherColor: gtColor;
      var index: number = 0;

      colorpalette.set(index, otherColor);  
    }).toThrow();
  });

  /**
   * set( -1, rgb(64, 128, 255) ): should throw exception if index <0
   */
  it('set( -1, rgb(64, 128, 255) ): should throw exception if index <0', () => {
    expect(function() {
      var colorpalette: gtColorPalette = new gtColorPalette(null);
      var otherColor: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var index: number = -1;

      colorpalette.set(index, otherColor);  
    }).toThrow();
  });

  /**
   * set( 0, color ): should work if colors exists
   */
  it('set( 0, color ): should work if colors exists', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);
    var index: number = 0;

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    colorpalette.set(index, otherColor);

    expect(colorpalette.count()).toEqual(3);
    expect(colorpalette.get(index)).toEqual(otherColor);
  });

  /**
   * set( 2, color ): should work if colors exists
   */
  it('set( 2, color ): should work if colors exists', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);
    var index: number = 2;

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    colorpalette.set(index, otherColor);

    expect(colorpalette.count()).toEqual(3);
    expect(colorpalette.get(index)).toEqual(otherColor);
  });

  /**
   * set( maxcount, color ): should work if colors exists
   */
  it('set( maxcount, color ): should work if colors exists', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var index: number = colorlist.length-1;

    colorpalette.set(index, otherColor);

    expect(colorpalette.count()).toEqual(3);
    expect(colorpalette.get(index)).toEqual(otherColor);
  });

  /**
   * set( maxcount + 1, rgb(64, 128, 255) ): should throw exception if index out of range
   */
  it('set( maxcount + 1, rgb(64, 128, 255) ): should throw exception if index out of range', () => {
    expect(function() {
      var colorpalette: gtColorPalette = new gtColorPalette(null);
      var otherColor: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var index: number = 1;

      colorpalette.set(index, otherColor);  
    }).toThrow();
  });

  /**
   * get( null ): should throw a exception'
   */
  it('get( null ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);
      var index: number = null;

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);
    
      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      colorpalette.get(index);
    }).toThrow();
  });

  /**
   * get( undefined ): should throw a exception'
   */
  it('get( undefined ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);
      var index: number;

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);
    
      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      colorpalette.get(index);
    }).toThrow();
  });

  /**
   * get( -1 ): should throw a exception'
   */
  it('get( -1 ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);
      var index: number = -1;

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      colorpalette.get(index);
    }).toThrow();
  });

  /**
   * get( 0 ): should work'
   */
  it(' get( 0 ): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);
    
    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var index: number = 0;

    expect(colorpalette.count()).toEqual(3);
    expect(colorpalette.get(index)).toEqual(color1);    
  });

  /**
   * get( maxcount ): should work'
   */
  it(' get( maxcount ): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var index: number = colorpalette.count() - 1;

    expect(colorpalette.count()).toEqual(3);
    expect(colorpalette.get(index)).toEqual(color3);    
  });

  /**
   * get( >maxcount ): should throw exception
   */
  it(' get( >maxcount ): should throw exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = colorpalette.count();
    
      colorpalette.get(index);
    }).toThrow();
  });

  /**
   * insert( null, color ): should throw a exception
   */
  it('insert( null, color ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);
    
      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = null;

      colorpalette.insert(index, otherColor);
    }).toThrow();
  });

  /**
   * insert( 0, null ): should throw a exception
   */
  it('insert( 0, null ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = null;

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);
    
      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = 0;

      colorpalette.insert(index, otherColor);
    }).toThrow();
  });

  /**
   * insert( undefined, color ): should throw a exception'
   */
  it('insert( undefined, color ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number;
      
      colorpalette.insert(index, otherColor);
    }).toThrow();
  });

  /**
   * insert( 0, undefined ): should throw a exception'
   */
  it('insert( 0, undefined ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor;

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = 0;
      
      colorpalette.insert(index, otherColor);
    }).toThrow();
  });

  /**
   * insert( -1, color ): should throw a exception'
   */
  it('insert( -1, color ): should throw a exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);
    
      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = -1;

      colorpalette.insert(index, otherColor);
    }).toThrow();
  });

  /**
   * insert( 0, color ): should work'
   */
  it(' insert( 0, color ): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);
    
    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var index: number = 0;
    var count = colorpalette.insert(index, otherColor);

    expect(colorpalette.get(index)).toEqual(otherColor);    
    expect(count).toEqual(4);
  });

  /**
   * insert( maxcount, color ): should work'
   */
  it('insert( maxcount, color ): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var index: number = colorpalette.count()-1;
    var count = colorpalette.insert(index, otherColor);

    expect(colorpalette.get(index)).toEqual(otherColor);    
    expect(count).toEqual(4);
  });

  /**
   * insert( >maxcount, color ): should throw exception
   */
  it(' insert( >maxcount, color ): should throw exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = colorpalette.count();
      
      colorpalette.insert(index, otherColor);
    }).toThrow();
  });

  /**
   * count(): should work
   */
  it('count(): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );

    expect(colorpalette.count()).toEqual(3);
  });

  /**
   * delete(null): should throw an exception
   */
  it('delete(null): should throw an exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);

      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = null;

      colorpalette.delete(index);
    }).toThrow();
  });

  /**
   * delete(unknown): should throw an exception
   */
  it('delete(unknown): should throw an exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
  
      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number;
  
      colorpalette.delete(index);  
    }).toThrow();
  });
    
  /**
   * delete(-1): should throw an exception
   */
  it('delete(-1): should throw an exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
      var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);
  
      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = -1;
  
      colorpalette.delete(index);      
    }).toThrow();
  });

  /**
   * delete(0): should work
   */
  it('delete(0): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
    var otherColor: gtColor = gtColor.createColorByRGB(50, 50, 50);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var index: number = 0;

    colorpalette.delete(index);
    expect(colorpalette.count()).toEqual(2);
    expect(colorpalette.get(0)).toEqual(color2);
    expect(colorpalette.get(1)).toEqual(color3);
  });

  /**
   * delete(maxcount): should work
   */
  it('delete(maxcount): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);

    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var index: number = colorpalette.count()-1;

    colorpalette.delete(index);
    expect(colorpalette.count()).toEqual(2);
    expect(colorpalette.get(0)).toEqual(color1);
    expect(colorpalette.get(1)).toEqual(color2);
  });

  /**
   * delete(>maxcount): should throw an exception
   */
  it('delete(>maxcount): should throw an exception', () => {
    expect(function() {
      var colorlist: Array<gtColor> = new Array<gtColor>();
      var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
      var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
      var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
  
      colorlist.push(color1);
      colorlist.push(color2);
      colorlist.push(color3);

      var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
      var index: number = colorpalette.count();
  
      colorpalette.delete(index);
    }).toThrow();
  });

  // TODO: test load
  // TODO: test save

  /**
   * clone(): should work
   */
  it('clone(): should work', () => {
    var colorlist: Array<gtColor> = new Array<gtColor>();
    var color1: gtColor = gtColor.createColorByRGB(64, 128, 255);
    var color2: gtColor = gtColor.createColorByRGB(128, 255, 64);
    var color3: gtColor = gtColor.createColorByRGB(255, 64, 128);
  
    colorlist.push(color1);
    colorlist.push(color2);
    colorlist.push(color3);

    var colorpalette: gtColorPalette = new gtColorPalette( colorlist );
    var clonedColorPalette: gtColorPalette = colorpalette.clone();
    
    expect(colorpalette.count()).toEqual(clonedColorPalette.count());

    expect(colorpalette.get(0).equals(clonedColorPalette.get(0))).toEqual(true);
    expect(colorpalette.get(0) != clonedColorPalette.get(0)).toEqual(true);

    expect(colorpalette.get(1).equals(clonedColorPalette.get(1))).toEqual(true);
    expect(colorpalette.get(1) != clonedColorPalette.get(1)).toEqual(true);

    expect(colorpalette.get(2).equals(clonedColorPalette.get(2))).toEqual(true);
    expect(colorpalette.get(2) != clonedColorPalette.get(2)).toEqual(true);
  });
});
