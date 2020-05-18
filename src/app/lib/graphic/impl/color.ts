/*-------------------------------------------------------------------------------	
 * Graphic Toolbox	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @version		0.1.2
 --------------------------------------------------------------------------------*/
import { isNull, isUndefined } from 'util';
import { IStyle } from '../istyle';

/**
 * this file includes the bothe class <code>gtColor</code> for a color and <code>gtColorPalette</code>
 * for a color palette
 */

/**
 * this is a class for colors
 * 
 * private name: string;                                                    the name of the color
 * private color_value: number = 0;                                         the color value
 * private transparency: number = null;                                     the transparency value
 * private static htmlColor = null;                                         the list of html colors
 * public static SMOOTHFACTOR: number                                       the factor to calculate in brighter() or lighter(). Default is 0.7
 * 
 * constructor( color_value: number, trancperency?: number, name?: string )        
 *                                                                          create a color class with value and optional transparency
 * 
 * static createColorByRGB(red: number, green: number, blue: number, trancperency?: number, name?: string): gtColor 
 *                                                                          create a color class by the rgb parts
 * static createColorByHSB(hue: number, saturation: number, brightness: number, transparency?: number, name?: string): gtColor
 *                                                                          create a color class by the hsb values
 * static createColorByHSL(hue: number, saturation: number, lightness: number, transparency?: number, name?: string): gtColor
 *                                                                          create a color class by the hsl values
 * static createColorByHex(hex: string, trancperency?: number, name?: string): gtColor
 *                                                                          create a color class by his hex value
 * static createColorByHTMLName(name: string, trancperency?: number): gtColor 
 *                                                                          create a color class by his html color name
 *     
 * setName(name: string): void                                              set the name of the color
 * getName(): string                                                        get the name of the color 
 * setColorValue(color_value: number): void                                 set the color value for this class
 * getColorValue(): number                                                  get the color value of this class
 * setTransparency(transparency: number): void                              set the transparency of this class
 * getTransparency(): number                                                get the transparency of this class
 * 
 * setRed(red: number): void                                                set the red part of this color
 * getRed(): number                                                         get the red part of this color
 * setGreen(green: number): void                                            set the green part this color
 * getGreen() : number                                                      get the green part this color
 * setBlue(blue: number): void                                              set the blue part this color
 * getBlue(): number                                                        get the green part this color
 * setRGB(red: number, blue: number, green: number): void                   set the red, green and blue part this color
 * getRGB(): {red: number, blue: number, green: number}                     get the red, green and blue part this color
 * 
 * getHSB(): { hue: number, saturation: number, brightness: number }        get the HSB (hue, saturation, brightness) values of this color
 * setByHSB(hue: number, saturation: number, brightness: number, transparency?: number): void 
 *                                                                          set <code>gtColor</code> by his HSB (hue, saturation, brightness) values 
 * 
 * getHSL(): { hue: number, saturation: number, lightness: number }         get the HSL (hue, saturation, ligthness) values of this color
 * setByHSL(hue: number, saturation: number, brightness: number): void      
 *                                                                          set <code>gtColor</code> by his HSL (hue, saturation, ligthness) values
 * 
 * brighter(): gtColor                                                      Creates a brighter version of this <code>gtColor<code>
 * darker(): gtColor                                                        Creates a darker version of this <code>gtColor</code> 
 * 
 * static getHTMLColor(name: string): gtColor                               get a html color by name
 * static getHTMLColorName(value: number): gtColor                          get a html color name by value
 * 
 * clone(): gtColor                                                         clone this color and return a new color class
 * equals(otherColor: gtColor): boolean                                     compare to colors
 * 
 * toRGB(): string                                                          get the css rgb for this color
 * toRGBA(): string                                                         get the css rgba for this color
 * toHex(): string                                                          get the css hex string
 * toHSB(): string                                                          get the css hsb string
 * 
 * setStyle(ctx: CanvasRenderingContext2D): void                            set the style for given draw context <code>ctx</code>
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
 */
export class gtColor implements IStyle {
    private name: string;
    private color_value: number = 0;
    private transparency: number = null;
    private static htmlColor = null;

    // this is the factor to calculate in brighter() or lighter()
    public static SMOOTHFACTOR: number = 0.7;           

    // Internal mask for red
    private static RED_MASK = 255 << 16;

    // Internal mask for green
    private static GREEN_MASK = 255 << 8;
    
    // Internal mask for blue
    private static BLUE_MASK = 255;
    
    // Internal mask for alpha. 
    private static ALPHA_MASK = 255 << 24;

    /**
     * default constructor
     * 
     * create a color with his <code>color_value</code>. Optional can be set the <code>transparency</code>
     * and the <code>name</code> of the color. <code>transparency</code> can be an float value between 0
     * and 1
     *  
     * If the <code>color_value</code> null or undefined this function will be set the color to 0
     * If <code>transparency</code> undefined this function throw an TypeError exception
     * 
     * If the <code>color_value</code> not a positive number or <code>transparency</code> is out of Range 0
     * and 1 this function throw an RangeError exception.
     * 
     * if the <code>color_value</code> a floating point number it will be rounded to the next integer
     * 
     * @param color_value: number                       the color value
     * @param (optional) trancperency: number           the transparency
     * @param (optional) name: string                   the name of the color
     * @return void
     * @public
     * @throw TypeError
     *        RangeError  
     */    
    constructor( color_value: number, transparency?: number, name?: string ) {
        
        this.setColorValue( color_value );
        this.setTransparency( ( isUndefined(transparency) ) ? null : transparency );
        this.setName( name );

        gtColor.initHTMLColors();
    }
    getStyle(): void {
        throw new Error("Method not implemented.");
    }

    /**
     * create a color class by his rgb values
     *  
     * if <code>red</code>, <code>green</code> or <code>blue</code> null or undefined this function throw 
     * TypeError Exception
     * 
     * if <code>red</code>, <code>green</code> or <code>blue</code> out of range (<0 or >255) this function
     * throw RangeError Exception
     * 
     * if <code>red</code>, <code>green</code> or <code>blue</code> a float value, this function will be set
     * the value to the nearest integer
     * 
     * If <code>transparency</code> undefined this function throw an TypeError exception
     * 
     * If <code>transparency</code> is out of Range 0 and 1 this function throw an RangeError exception.
     * 
     * @param red                                       the red part of the color 
     * @param green                                     the green part of the color
     * @param blue                                      the blue part of the color
     * @param trancperency                              (optional) the transparency of the color. Default is 1
     * @param name                                      (optional) the name of the color
     * @return gtColor                                  the color
     * @throws TypeError
     *         RangeError
     * @public
     */
    public static createColorByRGB(red: number, green: number, blue: number, transparency?: number, name?: string): gtColor {
        var color: gtColor = new gtColor(0, transparency, name);

        color.setRGB(red, green, blue);
        return color;
    }

    /**
     * create a color class by his HSB (hue, saturation, brightness) values
     * 
     * If the <code>saturation</code>, <code>brightness</code> or <code>transparency</code> not in the range
     * 0 - 1. This function throw an RangeError
     *  
     * if <code>red</code>, <code>green</code> or <code>blue</code> null or undefined this function throw 
     * TypeError Exception
     * 
     * if <code>saturation</code> or <code>brightness</code> out of range (<0 or >255) this function throw RangeError Exception
     * 
     * if <code>red</code>, <code>green</code> or <code>blue</code> a float value, this function will be set
     * the value to the nearest integer
     * 
     * If <code>transparency</code> undefined this function throw an TypeError exception
     * If <code>transparency</code> is out of Range 0 and 1 this function throw an RangeError exception.
     * 
     * @param hue: number                               the hue of the color 
     * @param saturation: number                        the saturation of the color
     * @param brightness: number                        the brightness of the color
     * @param trancperency                              (optional) the transparency of the color. Default is 1
     * @param name                                      (optional) the name of the color
     * @return gtColor                                  the color
     * @throws TypeError
     *         RangeError
     * @public
     */
    public static createColorByHSB(hue: number, saturation: number, brightness: number, transparency?: number, name?: string): gtColor {
        var color: gtColor = new gtColor(0, transparency, name);

        color.setByHSB(hue, saturation, brightness);
        return color;
    }

    /**
     * create a color class by his HSL (hue, saturation, lightness) values
     * 
     * If the <code>saturation</code>, <code>brightness</code> or <code>transparency</code> not in the range
     * 0 - 1. This function throw an RangeError
     *  
     * if <code>red</code>, <code>green</code> or <code>blue</code> null or undefined this function throw 
     * TypeError Exception
     * 
     * if <code>saturation</code> or <code>brightness</code> out of range (<0 or >255) this function throw RangeError Exception
     * 
     * if <code>red</code>, <code>green</code> or <code>blue</code> a float value, this function will be set
     * the value to the nearest integer
     * 
     * If <code>transparency</code> undefined this function throw an TypeError exception
     * If <code>transparency</code> is out of Range 0 and 1 this function throw an RangeError exception.
     * 
     * @param hue: number                               the hue of the color 
     * @param saturation: number                        the saturation of the color
     * @param lightness: number                         the lightness of the color
     * @param trancperency                              (optional) the transparency of the color. Default is 1
     * @param name                                      (optional) the name of the color
     * @return gtColor                                  the color
     * @throws TypeError
     *         RangeError
     * @public
     */
    public static createColorByHSL(hue: number, saturation: number, lightness: number, transparency?: number, name?: string): gtColor {
        var color: gtColor = new gtColor(0, transparency, name);

        color.setByHSL(hue, saturation, lightness);
        return color;
    }

    /**
     * create a color class by his hex value
     *  
     * <code>hexString</code> can be with or without a "#". e.g. "ff00ff" or "#ff00ff". 
     * if <code>hexString</code> null or undefined this function throw TypeError Exception
     * if <code>hexString</code> empty or blank this function throw RangeError Exception
     * If <code>transparency</code> is out of Range 0 and 1 this function throw an RangeError exception.
     * If <code>transparency</code> is undefined the transparency will be set to null
     * 
     * @param hexString                                 the color as hex value 
     * @param trancperency                              (optional) the transparency of the color. Default is 1
     * @param name                                      (optional) the name of the color
     * @return gtColor                                  the color
     * @throws TypeError
     *         RangeError
     * @public
     */
    public static createColorByHex(hexString: string, trancperency?: number, name?: string): gtColor {
        if ( isNull(hexString) || isUndefined(hexString) ) {
           throw new TypeError("gtColor::createColorByHex(" + hexString + ", " + trancperency + ", " + name + "): first param could not be null or undefined");
        }

        hexString = hexString.trim();

        if ( hexString.length == 0 ) {
            throw new RangeError("gtColor::createColorByHex(" + hexString + ", " + trancperency + ", " + name + "): first param could not be empty or blank");
        }
        
        if ( hexString.charAt(0) == "#" ) {
            hexString = hexString.substr(1);
        }

        var rex = /[0-9A-Fa-f]{6}/g;

        if( !rex.test(hexString) ) {
            throw new RangeError("gtColor::createColorByHex(" + hexString + ", " + trancperency + ", " + name + "): first param must be an valid hex string");
        }    

        return new gtColor( parseInt(hexString, 16), trancperency, name );
    }

    /**
     * create a color class by his html color name
     *  
     * if <code>name</code> is undefined or null this function return null
     * if <code>name</code> not exists this function return null otherwise the color class
     * If <code>transparency</code> undefined this function throw an TypeError exception
     * If <code>transparency</code> is out of Range 0 and 1 this function throw an RangeError exception.
     * 
     * @param colorname: string                         the html color name 
     * @param trancperency                              (optional) the transparency of the color. Default is 1
     * @param name                                      (optional) the name of the color
     * @return gtColor                                  the color
     * @throws TypeError
     *         RangeError
     * @public
     */    
    public static createColorByHTMLName(colorname: string, transparency?: number): gtColor {
        if ( isNull(colorname) || isUndefined(colorname) ) {
            throw new TypeError("gtColor::createColorByHTMLName(" + colorname + ", " + transparency + ", " + name + "): first param could not be null or undefined");
        }
 
        gtColor.initHTMLColors();

        var color: gtColor = gtColor.htmlColor[colorname.toLowerCase()];
        
        if ( isUndefined(color) ) {
            return null;
        }

        color = color.clone();
        color.setTransparency(( isUndefined(transparency) ) ? null : transparency);
        return color;
    } 

    /**
     * initialize the html colors
     * 
     * @return void
     * @public
     */
    private static initHTMLColors(): void {
        if ( isNull(gtColor.htmlColor) ) {
            gtColor.htmlColor = new Array();

            gtColor.htmlColor['aliceblue'] = new gtColor(0xF0F8FF, null, 'AliceBlue');
            gtColor.htmlColor['antiquewhite'] = new gtColor(0xFAEBD7, null, 'AntiqueWhite' );
            gtColor.htmlColor['aqua'] = new gtColor(0x00FFFF, null, 'Aqua' ); 
            gtColor.htmlColor['aquamarine'] = new gtColor(0x7FFFD4, null, 'Aquamarine' );
            gtColor.htmlColor['azure'] = new gtColor(0xF0FFFF, null, 'Azure' ); 
            gtColor.htmlColor['beige'] = new gtColor(0xF5F5DC, null, 'Beige' );
            gtColor.htmlColor['bisque'] = new gtColor(0xFFE4C4, null, 'Bisque' ); 
            gtColor.htmlColor['black'] = new gtColor(0x000000, null, 'Black' ); 
            gtColor.htmlColor['blanchedalmond'] = new gtColor(0xFFEBCD, null, 'BlanchedAlmond'); 
            gtColor.htmlColor['blue'] = new gtColor(0x0000FF, null, 'Blue'); 
            gtColor.htmlColor['blueviolet'] = new gtColor(0x8A2BE2, null, 'BlueViolet'); 
            gtColor.htmlColor['brown'] = new gtColor(0xA52A2A, null , 'Brown' );
            gtColor.htmlColor['burlyWood'] = new gtColor(0xDEB887, null, 'BurlyWood' );
            gtColor.htmlColor['cadetblue'] = new gtColor(0x5F9EA0, null, 'CadetBlue' );
            gtColor.htmlColor['chartreuse'] = new gtColor(0x7FFF00, null, 'Chartreuse' );
            gtColor.htmlColor['chocolate'] = new gtColor(0xD2691E, null, 'Chocolate' );
            gtColor.htmlColor['coral'] = new gtColor(0xFF7F50, null, 'Coral' );
            gtColor.htmlColor['cornflowerblue'] = new gtColor(0x6495ED, null, 'CornflowerBlue' );
            gtColor.htmlColor['cornsilk'] = new gtColor(0xFFF8DC, null, 'Cornsilk' );
            gtColor.htmlColor['crimson'] = new gtColor(0xDC143C, null, 'Crimson' );
            gtColor.htmlColor['cyan'] = new gtColor(0x00FFFF, null, 'Cyan' );
            gtColor.htmlColor['darkblue'] = new gtColor(0x00008B, null, 'DarkBlue' );
            gtColor.htmlColor['darkcyan'] = new gtColor(0x008B8B, null, 'DarkCyan' );
            gtColor.htmlColor['darkgoldenrod'] = new gtColor(0xB8860B, null, 'DarkGoldenRod' );
            gtColor.htmlColor['darkgray'] = new gtColor(0xA9A9A9, null, 'DarkGray' );
            gtColor.htmlColor['darkgrey'] = new gtColor(0xA9A9A9, null, 'DarkGrey' );
            gtColor.htmlColor['darkgreen'] = new gtColor(0x006400, null, 'DarkGreen' );
            gtColor.htmlColor['darkkhaki'] = new gtColor(0xBDB76B, null, 'DarkKhaki' );
            gtColor.htmlColor['darkmagenta'] = new gtColor(0x8B008B, null, 'DarkMagenta' );
            gtColor.htmlColor['darkolivegreen'] = new gtColor(0x556B2F, null, 'DarkOliveGreen' );
            gtColor.htmlColor['darkorange'] =  new gtColor(0xFF8C00, null, 'DarkOrange' );
            gtColor.htmlColor['darkorchid'] = new gtColor(0x9932CC, null, 'DarkOrchid' );
            gtColor.htmlColor['darkred'] = new gtColor(0x8B0000, null, 'DarkRed' );
            gtColor.htmlColor['darksalmon'] = new gtColor(0xE9967A, null, 'DarkSalmon' );
            gtColor.htmlColor['darkseagreen'] = new gtColor(0x8FBC8F, null, 'DarkSeaGreen' );
            gtColor.htmlColor['darkslateblue'] = new gtColor(0x483D8B, null, 'DarkSlateBlue' );
            gtColor.htmlColor['darkslategray'] = new gtColor(0x2F4F4F, null, 'DarkSlateGray' );
            gtColor.htmlColor['darkturquoise'] = new gtColor(0x00CED1, null, 'DarkTurquoise' );
            gtColor.htmlColor['darkviolet'] = new gtColor(0x9400D3, null, 'DarkViolet' );
            gtColor.htmlColor['deeppink'] = new gtColor(0xFF1493, null, 'DeepPink' );
            gtColor.htmlColor['deepskyblue'] = new gtColor(0x00BFFF, null, 'DeepSkyBlue' );
            gtColor.htmlColor['dimgray'] = new gtColor(0x696969, null, 'DimGray',  );
            gtColor.htmlColor['dodgerblue'] =new gtColor(0x1E90FF, null, 'DodgerBlue' );
            gtColor.htmlColor['firebrick'] =new gtColor(0xB22222, null, 'FireBrick' );
            gtColor.htmlColor['floralwhite'] = new gtColor(0xFFFAF0, null, 'FloralWhite' );
            gtColor.htmlColor['forestgreen'] = new gtColor(0x228B22, null, 'ForestGreen' );
            gtColor.htmlColor['fuchsia'] = new gtColor(0xFF00FF, null, 'Fuchsia' );
            gtColor.htmlColor['gainsboro'] = new gtColor(0xDCDCDC, null, 'Gainsboro' );
            gtColor.htmlColor['ghostwhite'] = new gtColor(0xF8F8FF, null, 'GhostWhite' );
            gtColor.htmlColor['gold'] = new gtColor(0xFFD700, null, 'Gold' );
            gtColor.htmlColor['goldenrod'] = new gtColor(0xDAA520, null, 'GoldenRod' ),
            gtColor.htmlColor['gray'] = new gtColor(0x808080, null, 'Gray' );
            gtColor.htmlColor['grey'] = new gtColor(0x808080, null, 'Grey' );
            gtColor.htmlColor['green'] = new gtColor(0x008000, null, 'Green' );
            gtColor.htmlColor['greenyellow'] = new gtColor(0xADFF2F, null, 'GreenYellow' );
            gtColor.htmlColor['honeydew'] = new gtColor(0xF0FFF0, null, 'HoneyDew' );
            gtColor.htmlColor['hotpink'] = new gtColor(0xFF69B4, null, 'HotPink' );
            gtColor.htmlColor['indianred'] = new gtColor(0xCD5C5C, null, 'IndianRed' );
            gtColor.htmlColor['indigo'] = new gtColor(0x4B0082, null, 'Indigo' );
            gtColor.htmlColor['ivory'] = new gtColor(0xFFFFF0, null, 'Ivory' );
            gtColor.htmlColor['khaki'] = new gtColor(0xF0E68C, null, 'Khaki' );
            gtColor.htmlColor['lavender'] = new gtColor(0xE6E6FA, null, 'Lavender' );
            gtColor.htmlColor['lavenderblush'] = new gtColor(0xFFF0F5, null, 'LavenderBlush' );
            gtColor.htmlColor['lawngreen'] = new gtColor(0x7CFC00, null, 'LawnGreen' );
            gtColor.htmlColor['lemonchiffon'] =new gtColor(0xFFFACD, null, 'LemonChiffon' );
            gtColor.htmlColor['lightblue'] = new gtColor(0xADD8E6, null, 'LightBlue' );
            gtColor.htmlColor['lightcoral'] = new gtColor(0xF08080, null, 'LightCoral' );
            gtColor.htmlColor['lightcyan'] = new gtColor(0xE0FFFF, null, 'LightCyan' );
            gtColor.htmlColor['lightgoldenrodyellow'] = new gtColor(0xFAFAD2, null, 'LightGoldenRodYellow' );
            gtColor.htmlColor['lightgray'] = new gtColor(0xD3D3D3, null, 'LightGray' );
            gtColor.htmlColor['lightgrey'] = new gtColor(0xD3D3D3, null, 'LightGrey' );
            gtColor.htmlColor['lightgreen'] = new gtColor(0x90EE90, null, 'LightGreen' );
            gtColor.htmlColor['lightpink'] = new gtColor(0xFFB6C1, null, 'LightPink' );
            gtColor.htmlColor['lightsalmon'] = new gtColor(0xFFA07A, null, 'LightSalmon' );
            gtColor.htmlColor['lightseagreen'] = new gtColor(0x20B2AA, null, 'LightSeaGreen' );
            gtColor.htmlColor['lightskyblue'] = new gtColor(0x87CEFA, null, 'LightSkyBlue' );
            gtColor.htmlColor['lightslategray'] = new gtColor(0x778899, null, 'LightSlateGray' );
            gtColor.htmlColor['lightslategrey'] = new gtColor(0x778899, null, 'LightSlateGrey' );
            gtColor.htmlColor['lightsteelblue'] = new gtColor(0xB0C4DE, null, 'LightSteelBlue' );
            gtColor.htmlColor['lightyellow'] = new gtColor(0xFFFFE0, null, 'LightYellow' );
            gtColor.htmlColor['lime'] = new gtColor(0x00FF00, null, 'Lime' );
            gtColor.htmlColor['limegreen'] = new gtColor(0x32CD32, null, 'LimeGreen' );
            gtColor.htmlColor['linen'] = new gtColor(0xFAF0E6, null, 'Linen' );
            gtColor.htmlColor['magenta'] = new gtColor(0xFF00FF, null, 'Magenta' );
            gtColor.htmlColor['maroon'] = new gtColor(0x800000, null, 'Maroon' );
            gtColor.htmlColor['mediumaquamarine'] = new gtColor(0x66CDAA, null, 'MediumAquaMarine' );
            gtColor.htmlColor['mediumblue'] = new gtColor(0x0000CD, null, 'MediumBlue' );
            gtColor.htmlColor['mediumorchid'] = new gtColor(0xBA55D3, null, 'MediumOrchid' );
            gtColor.htmlColor['mediumpurple'] = new gtColor(0x9370DB, null, 'MediumPurple' );
            gtColor.htmlColor['mediumseagreen'] = new gtColor(0x3CB371, null, 'MediumSeaGreen' );
            gtColor.htmlColor['mediumslateblue'] = new gtColor(0x7B68EE, null, 'MediumSlateBlue' );
            gtColor.htmlColor['mediumspringgreen'] = new gtColor(0x00FA9A, null, 'MediumSpringGreen' );
            gtColor.htmlColor['mediumturquoise'] = new gtColor(0x48D1CC, null, 'MediumTurquoise' );
            gtColor.htmlColor['mediumvioletred'] = new gtColor(0xC71585, null, 'MediumVioletRed' );
            gtColor.htmlColor['midnightblue'] = new gtColor(0x191970, null, 'MidnightBlue' );
            gtColor.htmlColor['mintcream'] = new gtColor(0xF5FFFA, null, 'MintCream' );
            gtColor.htmlColor['mistyrose'] = new gtColor(0xFFE4E1, null, 'MistyRose' );
            gtColor.htmlColor['moccasin'] = new gtColor(0xFFE4B5, null, 'Moccasin' );
            gtColor.htmlColor['navajowhite'] = new gtColor(0xFFDEAD, null, 'NavajoWhite' );
            gtColor.htmlColor['navy'] = new gtColor(0x000080, null, 'Navy' );
            gtColor.htmlColor['oldlace'] = new gtColor(0xFDF5E6, null, 'OldLace' );
            gtColor.htmlColor['olive'] = new gtColor(0x808000, null, 'Olive' );
            gtColor.htmlColor['olivedrab'] = new gtColor(0x6B8E23, null, 'OliveDrab' );
            gtColor.htmlColor['orange'] = new gtColor(0xFFA500, null, 'Orange' );
            gtColor.htmlColor['orangered'] = new gtColor(0xFF4500, null, 'OrangeRed' );
            gtColor.htmlColor['orchid'] = new gtColor(0xDA70D6, null, 'Orchid' );
            gtColor.htmlColor['palegoldenrod'] = new gtColor(0xEEE8AA, null, 'PaleGoldenRod' );
            gtColor.htmlColor['palegreen'] = new gtColor(0x98FB98, null, 'PaleGreen' );
            gtColor.htmlColor['paleturquoise'] = new gtColor(0xAFEEEE, null, 'PaleTurquoise' );
            gtColor.htmlColor['palevioletred'] = new gtColor(0xDB7093, null, 'PaleVioletRed' );
            gtColor.htmlColor['papayawhip'] = new gtColor(0xFFEFD5, null, 'PapayaWhip' );
            gtColor.htmlColor['peachpuff'] = new gtColor(0xFFDAB9, null, 'PeachPuff' );
            gtColor.htmlColor['peru'] = new gtColor(0xCD853F, null, 'Peru' );
            gtColor.htmlColor['pink'] = new gtColor(0xFFC0CB, null, 'Pink' );
            gtColor.htmlColor['plum'] = new gtColor(0xDDA0DD, null, 'Plum' );
            gtColor.htmlColor['powderblue'] = new gtColor(0xB0E0E6, null, 'PowderBlue' );
            gtColor.htmlColor['purple'] = new gtColor(0x800080, null, 'Purple' );
            gtColor.htmlColor['rebeccapurple'] = new gtColor(0x663399, null, 'RebeccaPurple' );
            gtColor.htmlColor['red'] = new gtColor(0xFF0000, null, 'Red' );
            gtColor.htmlColor['rosybrown'] = new gtColor(0xBC8F8F, null, 'RosyBrown' );
            gtColor.htmlColor['royalblue'] = new gtColor(0x4169E1, null, 'RoyalBlue' );
            gtColor.htmlColor['saddlebrown'] = new gtColor(0x8B4513, null, 'SaddleBrown' );
            gtColor.htmlColor['salmon'] = new gtColor(0xFA8072, null, 'Salmon' );
            gtColor.htmlColor['sandybrown'] = new gtColor(0xF4A460, null, 'SandyBrown' );
            gtColor.htmlColor['seagreen'] = new gtColor(0x2E8B57, null, 'SeaGreen' );
            gtColor.htmlColor['seashell'] = new gtColor(0xFFF5EE, null, 'SeaShell' );
            gtColor.htmlColor['sienna'] = new gtColor(0xA0522D, null, 'Sienna' );
            gtColor.htmlColor['silver'] = new gtColor(0xC0C0C0, null, 'Silver' );
            gtColor.htmlColor['skyblue'] = new gtColor(0x87CEEB, null, 'SkyBlue' );
            gtColor.htmlColor['slateblue'] = new gtColor(0x6A5ACD, null, 'SlateBlue' );
            gtColor.htmlColor['slategray'] = new gtColor(0x708090, null, 'SlateGray' );
            gtColor.htmlColor['slategrey'] = new gtColor(0x708090, null, 'SlateGrey' );
            gtColor.htmlColor['snow'] = new gtColor(0xFFFAFA, null, 'Snow',  );
            gtColor.htmlColor['springgreen'] = new gtColor(0x00FF7F, null, 'SpringGreen' );
            gtColor.htmlColor['steelblue'] = new gtColor(0x4682B4, null, 'SteelBlue' );
            gtColor.htmlColor['tan'] = new gtColor(0xD2B48C, null, 'Tan' );
            gtColor.htmlColor['teal'] = new gtColor(0x008080, null, 'Teal' );
            gtColor.htmlColor['thistle'] = new gtColor(0xD8BFD8, null, 'Thistle' );
            gtColor.htmlColor['tomato'] = new gtColor(0xFF6347, null, 'Tomato' );
            gtColor.htmlColor['turquoise'] = new gtColor(0x40E0D0, null, 'Turquoise' );
            gtColor.htmlColor['violet'] = new gtColor(0xEE82EE, null, 'Violet' );
            gtColor.htmlColor['wheat'] = new gtColor(0xF5DEB3, null, 'Wheat' );
            gtColor.htmlColor['white'] = new gtColor(0xFFFFFF, null, 'White' );
            gtColor.htmlColor['whiteSmoke'] = new gtColor(0xF5F5F5, null, 'WhiteSmoke' );
            gtColor.htmlColor['yellow'] = new gtColor(0xFFFF00, null, 'Yellow' );
            gtColor.htmlColor['yellowgreen'] = new gtColor(0x9ACD32, null, 'YellowGreen' );                       
        }
    }

    /**
     * set the name of the color
     * 
     * @param name: string
     * @return void
     * @public
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * get the name of the color
     * 
     * @return string
     * @public
     */
    public getName(): string {
        return this.name;
    }
    /**
     * set the color value. The color value must be an unsigned integer. 
     * 
     * If the <code>color_value</code> null or undefined this function throw an TypeError exception. 
     * If the <code>color_value</code> not a positive number this function throw an RangeError exception.
     * if <code>color_value</code> a floating point number it will be rounded to the next integer.
     * 
     * @param color_value: number           the color value
     * @return void
     * @throw TypeError
     *        RangeError
     * @public
     */
    public setColorValue(color_value: number): void {
        if (isNull(color_value) || isUndefined(color_value) ) {
            throw new TypeError('gtColor::setColorValue (' + color_value + '): could not be null or undefined');
        }

        if ( color_value < 0) {
            throw new RangeError('gtColor::setColorValue (' + color_value + '): must be a positiv value or 0');
        }

        this.color_value = Math.round( color_value );
    }

    /**
     * get the color value
     * 
     * @return number                       the color value
     * @public
     */
    public getColorValue(): number {
        return this.color_value;
    }

    /**
     * set the transparency value. The color value must be between 0 and 1. 
     * 
     * If <code>transparency</code> undefined this function throw a TypeError
     * If <code>transparency</code> <0 or >1 this function throw an exception RangeError
     * 
     * if the <code>transparency</code> null no transparency is set
     * 
     * @param trancparency: number           the trancparency
     * @return void
     * @throw exception
     * @public
     */
    public setTransparency(transparency: number): void {
        if (isUndefined(transparency) ) {
            throw new TypeError('gtColor::setTransparency(' + transparency + '): could not be null or undefined');
        }

        if (transparency < 0 || transparency > 1) {
            throw new RangeError('gtColor::setTransparency(' + transparency + '): Bad trancperency value! trancpereny must be an float value between >=0 and <=1');
        }

        this.transparency = transparency;
    }

    /**
     * get the transparency
     * 
     * @return number                       the trancperency
     * @public
     */
    public getTransparency(): number {
        return this.transparency;
    }

    /**
     * set the red part of the color. The value must be between 0 and 255
     * 
     * if <code>red</code> is null or undefined this function throw TypeError Exception
     * if <code>red</code> is out of range (<0 or >255) this function throw RangeError Exception
     * if <code>red</code> a float value, this function will be set the value to the nearest integer
     * 
     * @public red: number                                                       the red part of the color
     * @return void
     * @throws TypeError
     *         RangeError
     * @public
     */
    public setRed(red: number): void {
        if (isNull(red) || isUndefined(red) ) {
            throw new TypeError('gtColor::setRed(' + red + '): could not be null or undefined');
        }

        if (red < 0 || red > 255) {
            throw new RangeError('gtColor::setRed(' + red + '): Bad red value! Value must be between 0 and 255');
        }

        this.color_value = (Math.round( red ) << 16) | (this.getGreen() << 8) | this.getBlue();
    }

    /**
     * get the red part of color
     * 
     * @return number
     * @public
     */
    public getRed() : number {
        return (this.color_value & gtColor.RED_MASK) >> 16;
    }

    /**
     * set the green part of the color. The value must be between 0 and 255
     * 
     * if <code>green</code> null or undefined this function throw TypeError Exception
     * if <code>green</code> out of range (<0 or >255) this function throw RangeError Exception
     * if <code>green</code> a float value, this function will be set the value to the nearest integer
     * 
     * @public green: number                                                       the green part of the color
     * @return void
     * @throws TypeError
     *         RangeError
     * @public
     */
    public setGreen(green: number): void {
        if (isNull(green) || isUndefined(green) ) {
            throw new TypeError('gtColor::setGree(' + green + '): could not be null or undefined');
        }

        if (green < 0 || green > 255) {
            throw new RangeError('gtColor::setGreen(' + green + '): Bad red value! Value must be between 0 and 255');
        }

        this.color_value = (this.getRed() << 16) | (Math.round(green) << 8) | this.getBlue();
    }

    /**
     * get the green part of color
     * 
     * @return number
     * @public
     */
    public getGreen() : number {
        return (this.color_value & gtColor.GREEN_MASK) >> 8;
    }

    /**
     * set the blue part of the color. The value must be between 0 and 255
     * 
     * if <code>blue</code> null or undefined this function throw TypeError Exception
     * if <code>blue</code> out of range (<0 or >255) this function throw RangeError Exception
     * if <code>blue</code> a float value, this function will be set the value to the nearest integer

     * @public blue: number                                                       the blue part of the color
     * @return void
     * @throws TypeError
     *         RangeError
     * @public
     */
    public setBlue(blue: number): void {
        if (isNull(blue) || isUndefined(blue) ) {
            throw new TypeError('gtColor::setBlue(' + blue + '): could not be null or undefined');
        }

        if (blue < 0 || blue > 255) {
            throw new RangeError('gtColor::setBlue(' + blue + '): Bad red value! Value must be between 0 and 255');
        }

        this.color_value = (this.getRed() << 16) | (this.getGreen() << 8) | Math.round(blue);
    }

    /**
     * get the blue part of color
     * 
     * @return number
     * @public
     */
    public getBlue() : number {
        return this.color_value & gtColor.BLUE_MASK;
    }

    /**
     * set the RGB (red, green, blue) values of this color
     * 
     * if <code>red</code>, <code>green</code> or <code>blue</code> null or undefined this function throw 
     * TypeError Exception
     * 
     * if <code>red</code>, <code>green</code> or <code>blue</code> out of range (<0 or >255) this function
     * throw RangeError Exception
     * 
     * if <code>red</code>, <code>green</code> or <code>blue</code> a float value, this function will be set
     * the value to the nearest integer
     * 
     * @param red: number
     * @param green: number
     * @param blue: number
     * @return { red: number, green: number, blue: number }
     * @public
     */
    public setRGB(red: number, green: number, blue: number): void {
        if ( isNull(red) || isUndefined(red) 
         ||  isNull(green) || isUndefined(green) 
         ||  isNull(blue) || isUndefined(blue) ) {
            throw new TypeError('gtColor::setRGB(' + red + ", " + green + ", " + blue + '): red, green, or blue could not be null or undefined');
        }

        if (red < 0 || red > 255
         || green < 0 || green > 255
         || blue < 0 || blue > 255) {
            throw new RangeError('gtColor::setRGB(' + red + ", " + green + ", " + blue + '): Bad value! Value must be between 0 and 255');
        }

        this.color_value = (Math.round(red) << 16) | (Math.round(green) << 8) | Math.round(blue);
    }

    /**
     * get the RGB (red, green, blue) values of this color
     * 
     * @return { red: number, green: number, blue: number }
     * @public
     */
    public getRGB(): { red: number, green: number, blue: number } {
        return {
            red: this.getRed(),
            green: this.getGreen(),
            blue: this.getBlue()
        };
    }

    /**
     * get the HSB (hue, saturation, brightness) values of this color
     * The results will be in the range 0.0-1.0 
     * 
     * @return { hue: number, saturation: number, brightness: number }
     * @public
     */
    public getHSB(): { hue: number, saturation: number, brightness: number } {
        let rgb = this.getRGB();
        let min: number = Math.min(rgb.red, rgb.green, rgb.blue);
        let max: number = Math.max(rgb.red, rgb.green, rgb.blue);
        let brightness: number = max / 255;
        let saturation: number = ( max == 0 ) ? 0 : ((max - min) / max);
        let hue: number;

        if ( saturation == 0 ) {
            hue = 0;
        } else {
            var delta = (max - min) * 6;

            if ( rgb.red == max )
                hue = (rgb.green - rgb.blue) / delta;
            else if ( rgb.green == max )
                hue = 1 / 3 + (rgb.blue - rgb.red) / delta;
            else
                hue = 2 / 3 + (rgb.red - rgb.green) / delta;

            if ( hue < 0 )
                hue++;
        }

        return {
            hue: Math.round(hue * 100) / 100,
            saturation: Math.round(saturation * 100) / 100,
            brightness: Math.round(brightness * 100) / 100
        };
    }

    /**
     * Converts red, green, blue (Range 0-1) to red, green and blue (0-255) and set the color value and
     * transparency
     *
     * @param red the red value
     * @param green the green value
     * @param blue the blue value
     * @param alpha the alpha value
     * @return void
     * @throws RangeError if parameters are out of range 0.0-1.0
     */
    private convert(red: number, green: number, blue: number, trancparency?: number): void {
        if ( red < 0 || red > 1 || green < 0 || green > 1 || blue < 0 || blue > 1) {
            throw new RangeError("gtColor::convert(" + red + ", " + green + ", " + blue + ", " + trancparency + "): red, green, blue must between 0 and 1")
        }

        this.setTransparency(trancparency);

        this.setRGB( 
            Math.round( red * 255 ),
            Math.round( green * 255),
            Math.round( blue * 255 )
        )

    }

    /**
     * set <code>gtColor</code> by his HSB (hue, saturation, brightness) values 
     * 
     * If the <code>transparency</code> is not specified, an existing transparency is not changed
     * If the <code>saturation</code>, <code>brightness</code> or <code>transparency</code> not in the range 0 - 1. 
     * This function throw an RangeError
     *  
     * @param hue: number
     * @param saturation: number
     * @param brightness: number 
     * @param transparency: number                  (optional) 
     * @public
     * @throw RangeError            - saturation or brightness out of Range 0 - 1
     *                              - internal calculation error 
     */
    public setByHSB(hue: number, saturation: number, brightness: number, transparency?: number): void {
        if ( isNull(hue) || isUndefined(hue)
          || isNull(saturation) || isUndefined(saturation)
          || isNull(brightness) || isUndefined(brightness) ) 
            throw new TypeError("gtColor::setByHSB(" + hue + ", " + saturation + ", " + brightness + "): hue, saturation and brightness could not be null or undefined. It must be between 0 and 1");

        if ( hue < 0 || hue > 1
          || saturation < 0 || saturation > 1 
          || brightness < 0 || brightness > 1)
            throw new RangeError("gtColor::setByHSB(" + hue + ", " + saturation + ", " + brightness + "): hue, saturation and brightness must be between 0 and 1");

        if ( saturation == 0 )
            return this.convert(brightness, brightness, brightness, 0);
        

        if ( transparency == undefined )
            transparency = this.transparency;

        hue = hue - Math.floor(hue);
        
        let i: number = Math.floor( 6 * hue );
        let f: number = 6 * hue - i;
        let p: number = brightness * (1 - saturation);
        let q: number = brightness * (1 - saturation * f);
        let t: number = brightness * (1 - saturation * (1 - f));

        switch (i) {
                case 0:
                    return this.convert(brightness, t, p, transparency);
        
                case 1:
                    return this.convert(q, brightness, p, transparency);

                case 2:
                    return this.convert(p, brightness, t, transparency);

                case 3:
                    return this.convert(p, q, brightness, transparency);
        
                case 4:
                    return this.convert(t, p, brightness, transparency);

                case 5:
                    return this.convert(brightness, p, q, transparency);
        
                default:
                    throw new RangeError("impossible");
        }
    }

    /**
     * get the HSL (hue, saturation, lightness) values of this color
     * 
     * hue must between 0 - 359
     * saturation must between 0 - 100%
     * lightness must between 0 - 100%
     * The results will be in the range 0.0-1.0 
     * 
     * @return { hue: number, saturation: number, lightness: number }
     * @public
     * @see http://www.camick.com/java/source/HSLColor.java
     */
    public getHSL(): { hue: number, saturation: number, lightness: number } {
        var rgb:{ red: number; green: number; blue: number; } = this.getRGB();
        var red: number = rgb.red / 255;
        var green: number = rgb.green / 255;
        var blue: number = rgb.blue / 255;
        var min: number = Math.min(red, green, blue);
        var max: number = Math.max(red, green, blue);
        var hue: number = 0;

        //  Calculate the Hue
        if ( max == min )
            hue = 0;
        else if ( max == red )
            hue = ((60 * (green - blue) / (max - min)) + 360) % 360;
        else if ( max == green )
            hue = (60 * (blue - red) / (max - min)) + 120;
        else if ( max == blue )
            hue = (60 * (red - green) / (max - min)) + 240;

        //  Calculate the Luminance    
        var lightness = (max + min) / 2;

        //  Calculate the Saturation
        var saturation: number = 0;

        if (max == min)
            saturation = 0;
        else if (lightness <= .5)
            saturation = (max - min) / (max + min);
        else
            saturation = (max - min) / (2 - max - min);

        return { 
            hue: Math.round( hue ), 
            saturation: Math.round( saturation * 100 ), 
            lightness: Math.round( lightness * 100 ) 
        }
    }

    /**
     * set <code>gtColor</code> by his HSL (hue, saturation, lightness) values 
     * 
     *  <code>hue</code> is specified as degrees in the range 0 - 359.
	 *  <code>saturation</code> is specified as a percentage in the range 1 - 100.
	 *  <code>lightness</code> is specified as a percentage in the range 1 - 100.
     * 
     *  If the <code>saturation</code>, <code>lightness</code> or <code>transparency</code> this function throw an RangeError
     * 
     * @param hue: number
     * @param saturation: number,
     * @param lightness: number
     * @return void
     * @public
     */
    private static HueToRGB(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        
        return p;
    }
    
    public setByHSL(hue: number, saturation: number, lightness: number): void {
        if ( isNull(hue) || isUndefined(hue)
          || isNull(saturation) || isUndefined(saturation)
          || isNull(lightness) || isUndefined(lightness) ) {
            throw new TypeError("gtColor::setByHSL(" + hue + ", " + saturation + ", " + lightness + "): hue, saturation and lightness could not be null or undefined");
        }

        if ( hue < 0 || hue > 359 ) {
            throw new TypeError("gtColor::setByHSL(" + hue + ", " + saturation + ", " + lightness + "): hue must between 0 and 359");
        }

        if ( saturation < 0 || saturation > 100 || lightness < 0 || lightness > 100 ) {
            throw new TypeError("gtColor::setByHSL(" + hue + ", " + saturation + ", " + lightness + "): saturation and ligthness must between 0 and 100");
        }

        var red: number, green: number, blue: number;

        // make range 0 - 1
        hue /= 360;
        saturation /= 100;
        lightness /= 100;

        // calc saturation
        if (saturation == 0) {
          red = green = blue = lightness; // achromatic
        } else {
          function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          }
      
          var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
          var p = 2 * lightness - q;
      
          red = hue2rgb(p, q, hue + 1/3);
          green = hue2rgb(p, q, hue);
          blue = hue2rgb(p, q, hue - 1/3);
        }
      
        this.setRGB( red * 255, green * 255, blue * 255 );
    }     

    /**
     * Creates a new <code>Color</code> that is a brighter version of this
     * <code>Color</code>.
     * 
     * the static value <code>SMOOTHFACTOR</code> is the scale factor for the 
     * calculation of each of the trhe rgb components of this <code>gtColor</code>
     *
     * @return gtColor                 a new <code>gtColor</code> object that is
     *                                 a brighter version of this <code>Color</code>.
     */
    public brighter(): gtColor {
        var rgb = this.getRGB();

        /* From 2D group:

         * 1. black.brighter() should return grey
         * 2. applying brighter to blue will always return blue, brighter
         * 3. non pure color (non zero rgb) will eventually return white
         */        
        var i: number = Math.round( 1 / (1 - gtColor.SMOOTHFACTOR) );

        if ( rgb.red == 0 && rgb.green == 0 && rgb.blue == 0) {
            return gtColor.createColorByRGB(i, i, i);
        }
        
        if ( rgb.red > 0 && rgb.red < i ) rgb.red = i;
        if ( rgb.green > 0 && rgb.green < i ) rgb.green = i;
        if ( rgb.blue > 0 && rgb.blue < i ) rgb.blue = i;

        return gtColor.createColorByRGB(
            Math.min( Math.round( rgb.red / gtColor.SMOOTHFACTOR ), 255 ),
            Math.min( Math.round( rgb.green / gtColor.SMOOTHFACTOR ), 255 ),
            Math.min( Math.round( rgb.blue / gtColor.SMOOTHFACTOR ), 255 )   
        );        
    }

    /**
     * Create a new <code>gtColor</code> that is a darker version of this <code>gtColor</code>
     * 
     * This method applies an arbitrary scale factor to each of the three RGB components of this
     * <code>gtColor</code> to create a darker version of this <code>gtColor</code>. Although 
     * <code>brighter</code> and <code>darker</code> are inverse operations, the results of a series
     * of invocations of these two methods might be inconsistent because of rounding errors.
     * 
     * @return  gtColor         a new <code>Color</code> object that is a darker version of this <code>Color</code>.
     * @public
     */
    public darker(): gtColor {
        return gtColor.createColorByRGB( Math.max(Math.round(this.getRed() * gtColor.SMOOTHFACTOR ), 0),
                                         Math.max(Math.round(this.getGreen() * gtColor.SMOOTHFACTOR ), 0),
                                         Math.max(Math.round(this.getBlue() * gtColor.SMOOTHFACTOR ), 0));
    }

    /**
     * get a html color by name
     * 
     * if <code>name</code> is undefined or null this function return null
     * if <code>name</code> not exists this function return null
     * 
     * @param name: string
     * @return gtColor | null
     * @public
     */
    public static getHTMLColor(name: string): gtColor {
        if ( isNull(name) || isUndefined(name) ) {
            return null;
        }

        gtColor.initHTMLColors();

        let htmlColor: gtColor = gtColor.htmlColor[ name.toLowerCase() ];

        return (isUndefined( htmlColor )) ? null : htmlColor.clone();
    }

    /**
     * get a html color name by value 
     * 
     * if <code>value</code> found this function return his html name otherwise this function will be 
     * return null
     * 
     * @param value: string
     * @return void
     * @public
     */
    public static getHTMLColorName(colorValue: number): gtColor {
        gtColor.initHTMLColors();

        for (let key in gtColor.htmlColor) {
            if ( gtColor.htmlColor[key].getColorValue() == colorValue ) {
                return gtColor.htmlColor[key].clone();
            }
        }

        return null;
    }

    /**
     * clone this color
     * 
     * @return gtColor
     * @public
     */
    public clone(): gtColor {
        return new gtColor(this.color_value, this.transparency, this.name);
    }

    /**
     * equals this color and transparency with the given color
     * 
     * @param otherColor: any                  the color to compare
     * @return boolean
     * @public
     */
    public equals(otherColor: any): boolean {
		if (this == otherColor)
			return true;

        if ( isNull(otherColor) || isUndefined(otherColor) ) 
            return false;
        
        if (!( otherColor instanceof gtColor )) {
            return false;
        }

        return (   (otherColor.transparency == this.transparency)
                && (otherColor.color_value == this.color_value));
    }

    /**
     * get the css rgb string
     * 
     * @return string
     * @public
     */
    public toRGB(): string {
        return "rgb(" + this.getRed() + ", " + this.getGreen() + ", " + this.getBlue() + ")";
    }

    /**
     * get the css rgba string
     * 
     * if transparency null this function will be return the "rgb(r, g, b)"
     * 
     * @return string
     * @public
     */
    public toRGBA(): string {
        if ( isNull(this.transparency) )
           return this.toRGB();

        let rgb = this.getRGB();
        return "rgba(" + rgb.red + ", " + rgb.green + ", " + rgb.blue + ", " + this.transparency + ")";
    }

    /**
     * get the css hex color
     * 
     * Please note that transparency is not taken into the hex number
     * 
     * @return string
     * @public
     */
    public toHex(): string {
        var rgb = this.getRGB();

        var redhex: string = rgb.red.toString(16);
        var greenhex: string = rgb.green.toString(16);
        var bluehex: string = rgb.green.toString(16);
        
        if ( redhex.length < 2 ) { 
            redhex = "0" + redhex; 
        } 

        if ( greenhex.length < 2 ) { 
            greenhex = "0" + greenhex; 
        } 
        
        if ( bluehex.length < 2 ) { 
            bluehex = "0" + bluehex; 
        } 

        return "#" + redhex + greenhex + bluehex;        
    }    

    /**
     * get the css hsl string
     * 
     * @return string
     * @public
     */
    public toHSL(): string {
        var hsl: { hue: number, saturation: number, lightness: number } = this.getHSL();

        // hue = 0 - 359°
        // saturation = 0 - 100%
        // brightness = 0 - 100%
        return "hsl(" + hsl.hue + ", " + hsl.saturation + "%, " + hsl.lightness + "%)";
    }

    /**
     * get the css hsla string
     * 
     * if transparency null this function will be return the "hsl(h, s, l)"
     * 
     * @return string
     * @public
     */
    public toHSLA(): string {
        if ( isNull(this.transparency) )
           return this.toHSL();

        var hsl: { hue: number, saturation: number, lightness: number } = this.getHSL();

        // hue = 0 - 360
        // saturation = 0 - 100%
        // brightness = 0 - 100%
        // transparency = 0.0 - 1.0
        return "hsla(" + hsl.hue + ", " + hsl.saturation + "%, " + hsl.lightness + "%, " + this.transparency + ")";
    }

    /**
     * set the style for given draw context <code>ctx</code>
     * 
     * @param  ctx: CanvasRenderingContext2D                the draw context
     * @return void 
     * @public
     */
    public setStyle(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.toRGBA();
    }

}

/**
 * this is a color palette of <code>gtColor</code>
 * 
 * constructor(colorlist?: Array<gtColor>, name?: String)          create a palette
 * 
 * setName(name: string): void                                     set the name of the palette
 * getName(): String                                               get the name of the palette
 * 
 * add( color: gtColor ): number                                   add a <color>gtColor</code> at the end of the list and returns the new count of the list                          
 * set( index: number, color: gtColor ): void                      set a <color>gtColor</code> at the position <color>index</color> 
 * get( index: number ): gtColor                                   get a <color>gtColor</code> at the position <code>index<code>
 * insert( index: number, color: gtColor ): number                 insert a <color>gtColor</code> at the position <code>index<code>
 * count(): number                                                 get the count of <code>gtColor</code>
 * delete(index: number): void                                     delete a <code>gtColor</code> from the list
 * 
 * load(name: string): void                                        load the palette
 * save(name: string): void                                        save the palette
 * 
 * clone(): gtColorPalette                                         clone this <code>gtColorPalette</code>
 * equals( otherColorPalette: gtColorPalette): boolean             compare two  <code>gtColorPalette</code>
 * 
 * static getAllNames(): Array<String>                             get all palette names
 */
export class gtColorPalette {
    private colorlist: Array<gtColor>;       // the color list
    private name: String;                    // name of the palette

    /**
     * default constructor
     * 
     * if <code>colorlist</code> null or undefined the constructor will create a empty colorlist
     */
    constructor( colorlist?: Array<gtColor>, name?: String) {
        this.colorlist = (isNull(colorlist) || isUndefined(colorlist)) ? new Array<gtColor>() : colorlist; 
        this.name = name;
    }

    /**
     * set the name of the palette
     * 
     * @param string
     * @return null
     * @public
     */
    public setName(name: string): void {
        this.name = name;        
    }

    /**
     * get the name of the palette
     * 
     * @return string
     * @public
     */
    public getName(): String {
        return this.name;        
    }

    /**
     * add a <color>gtColor</code> at the end of the list and returns the new count of the list
     * 
     * if <code>color</code> null or undefined this function throw an TypeError
     * 
     * @param color: gtColor            the color to add
     * @return number                   the new count after added 
     * @throw typeError
     * @public
     */
    public add( color: gtColor ): number {
        if (isNull(color) || isUndefined(color) ) {
            throw new TypeError('gtColorPalette::add(' + color + '): color could not be null or undefined');
        }

        return this.colorlist.push( color );
    }

    /**
     * set a <color>gtColor</code> at the position <color>index</color>
     * 
     * IF <color>index</code> out of Range this function throw a RangeError
     * 
     * @param color: gtColor            the color to set
     * @return void
     * @throw RangeError
     * @public
     */
    public set( index: number, color: gtColor ): void {
        if (isNull(index) || isUndefined(index) ) {
            throw new TypeError('gtColorPalette::set(' + index + ', ' + color.toString() + '): index could not be null or undefined');
        }

        if ( isNull(color) || isUndefined(color) ) {
            throw new TypeError('gtColorPalette::set(' + index + ', ' + color + '): color could not be null or undefined');
        }

        if ( index < 0 || index > this.colorlist.length-1 ) {
           throw new RangeError('gtColorPalette::set(' + index + ', ' + color.toString() + '): Bad index! Value must be between 0 and colorlist.length-1');
        }

        this.colorlist[index] = color;
    }

    /**
     * get a <color>gtColor</code> at the position <code>index<code>
     * 
     * If <color>index</code> out of Range this function throw a RangeError
     * 
     * @param index: number            the position 
     * @return void
     * @public
     */    
    public get( index: number ): gtColor {
        if (isNull(index) || isUndefined(index) ) {
            throw new TypeError('get(' + index + '): index could not be null or undefined');
        }

        if ( index < 0 || index > this.colorlist.length-1 ) {
            throw new RangeError('get(' + index + '): Bad index! Value must be between 0 and colorlist.length-1');
         }
 
        return this.colorlist[index];        
    }

    /**
     * insert a <color>gtColor</code> at the position <code>index<code>
     * 
     * If <color>index</code> out of Range this function throw a RangeError
     * 
     * @param index: number            the position 
     * @param color: gtColor           the color to insert 
     * @return number                  the count of colors
     * @public
     */
    public insert( index: number, color: gtColor ): number {
        if ( isNull(index) || isUndefined(index) ) {
            throw new TypeError('gtColorPalette::insert(' + index + ', ' + color.toString() + '): index could not be null or undefined');
        }

        if ( isNull(color) || isUndefined(color) ) {
            throw new TypeError('gtColorPalette::insert(' + index + ', ' + color + '): color could not be null or undefined');
        }

        if ( index < 0 || index > this.colorlist.length-1 ) {
            throw new RangeError('gtColorPalette::insert(' + index + ', ' + color.toString() + '): Bad index! Value must be between 0 and colorlist.length-1');
        }

        this.colorlist.splice(index, 0, color);
        return this.colorlist.length;
    }

    /**
     * get the count of <code>gtColor</code>
     * 
     * @param index: number            the position 
     * @return number                  the count of colors
     * @public
     */
    public count(): number {
        return this.colorlist.length;
    }

    /**
     * delete a <code>gtColor</code> from the list
     * 
     * If <color>index</code> out of Range this function throw a RangeError
     *
     * @param index: number            the position 
     * @return void
     * @public
     */
    public delete(index: number): void {
        if (isNull(index) || isUndefined(index) ) {
            throw new TypeError('gtColorPalette::delete(' + index + '): index could not be null or undefined');
        }

        if ( index < 0 || index > this.colorlist.length-1 ) {
            throw new RangeError('gtColorPalette::delete(' + index + '): Bad index! Value must be between 0 and colorlist.length-1');
        }
        
        this.colorlist.splice(index, 1);        
    }

    /**
     * load the palette
     * 
     * If <color>name</code> is null or undefined this function throw a TypeError
     * If <color>name</code> is blank or empty this function throw a RangeError
     *
     * @param name: string            the name of the palette 
     * @public
     */
    public load(name: string): void {
        if ( isNull(name) || isUndefined(name) ) {
            throw new RangeError('gtColorPalette::load(' + name + '): Bad index! Value must be between 0 and colorlist.length-1');
        }

        var palname = name.trim();

        if ( palname.length == 0 ) {
            throw new RangeError('gtColorPalette::load("' + name + '"): The name could not be blank or empty');
        }

        // TODO
        console.log("load a palette from server with name '" + name + "'");
        throw Error("gtColorPalette::save(): Not implemented yet");
    }

    /**
     * save the palette
     * 
     * If <color>index</code> out of Range this function throw a RangeError
     * 
     * @param name: string            the name of the palette 
     * @public
     */
    public save(name: string): void {
        if ( isNull(name) || isUndefined(name) ) {
            throw new RangeError('gtColorPalette::save(' + name + '): Bad index! Value must be between 0 and colorlist.length-1');
        }

        var palname = name.trim();

        if ( palname.length == 0 ) {
            throw new RangeError('gtColorPalette::save("' + name + '"): The name could not be blank or empty');
        }

        // TODO
        console.log("save a palette to server with name '" + name + "'");
        throw Error("gtColorPalette::save(): Not implemented yet");
    }

    /**
     * clone this <code>gtColorPalette</code>
     * 
     * @return gtColorPlatte            the cloned <code>gtColorPalette</code> 
     * @public
     */
    public clone(): gtColorPalette {
        let colorlist: Array<gtColor> = new Array<gtColor>();

        for (let index=0; index<this.colorlist.length; index++) {
            var color: gtColor = this.colorlist[index];

            if (!( isNull(color) || isUndefined(color) )) {
                color = color.clone(); 
            }

            colorlist[index] = color;
        }

        return new gtColorPalette( colorlist );
    }

    /**
     * equal
     * 
     * @return gtColorPlatte            the cloned <code>gtColorPalette</code> 
     * @public
     */
    public equals( otherColorPalette: gtColorPalette): boolean {
        if ( isNull(otherColorPalette) || isUndefined(otherColorPalette) ) 
           return false;
        
        if ( this.colorlist.length != otherColorPalette.colorlist.length ) 
           return false;
        
        for (let index=0; index<this.colorlist.length; index++) {
            if (!this.colorlist[index].equals(otherColorPalette[index]))
               return false;
        }

        return true;
    }

    /**
     * get all palette names
     * 
     * TODO
     * 
     * @return Array<String> 
     * @public
     */
    public static getAllNames(): Array<String> {
        throw Error("gtColorPalette::getAllNames(): Not implemented yet");
    }
}
