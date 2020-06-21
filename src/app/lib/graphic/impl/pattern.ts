/*-------------------------------------------------------------------------------	
 * BPMN Designer 
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. License see license.txt
 * @package     graphic toolbox
 * @version		1.0.0
 * @since		1.0.0
 --------------------------------------------------------------------------------*/
import { EPatternRepeat } from './epattern-repeat.enum';
import { Abstractimage } from './abstractimage';
import { isNull } from 'util';

/**
 * this is a pattern for a stroke or fill style
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern
 */
export class Pattern extends Abstractimage {
    
    private repeat: EPatternRepeat;

    /**
     * copy constructor
     * 
     * @param pattern                   - the pattern to copy
     */
    constructor ( pattern?: Pattern ) {
        super(pattern);

        if ( !isNull(pattern) ) {
            this.repeat = pattern.repeat;
        } 
    }

    /**
     * create a canvas javascript Pattern
     * 
     * @param ctx: CanvasRenderingContext2D               - the context
     * @return CanvasPattern
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
     */
    public create(ctx): CanvasPattern  {
        // Browser Compatibility (CanvasPattern)
        // 
        // Chrome:                  yes
        // Edge:                    12
        // Firefox:                 1.5
        // Internet Explorer:       yes
        // Opera:                   yes
        // Safari:                  yes
        // Android:                 yes
        // Chrome for Android:      yes
        // Firefox for Android:     4
        // Opera for Android:       yes
        // Safari on iOS:           yes
        // Samsung Internet:        yes
        let canvasPattern: CanvasPattern = ctx.createPattern(this.getImage(), this.repeat);

        // Browser Compatibility (canvasPattern.setTransform)
        // 
        // Chrome:                  68
        // Edge:                    79
        // Firefox:                 33
        // Internet Explorer:       no
        // Opera:                   9
        // Safari:                  3.1
        // Android:                 68
        // Chrome for Android:      68
        // Firefox for Android:     33
        // Opera for Android:       10.1
        // Safari on iOS:           11
        // Samsung Internet:        10.0
        canvasPattern.setTransform(this.matrix.toSVGMatrix());

        return canvasPattern;
    }

    /**
     * get the repeating
     * 
     * @return EPatternRepeat
     */
    public getRepeat(): EPatternRepeat {
        return this.repeat;
    }

    /**
     * set the repeating
     * 
     * @return EPatternRepeat
     */
    public setRepeat(repeat: EPatternRepeat): void {
        this.repeat = repeat;
    }

    /**
     * is the equals to the given Pattern
     * 
     * @param pattern: Pattern
     * @return boolean
     */ 
    public equals(pattern: Pattern): boolean {
        return (super.equals(pattern) && pattern.repeat == this.repeat);
    }
    public toSVG(): String {
        throw new Error("Method not implemented.");
    }

    /**
     * to JSON
     * 
     * @return string
     */ 
    public toJSON(): String {
//        return '"Pattern": { "a": ' + this.a + ', "b": ' + this.b + ', "c": ' + this.c 
//        + ', "d": ' + this.d + ', "e": ' + this.e + ', "f": ' + this.f + '}';        
        throw new Error("Method not implemented.");
    }

    /**
     * to String
     * 
     * @return string
     */ 
    public toString() {
        return "Pattern [repeat=" + this.repeat + ", getNewFilename()=" + this.getNewFilename() 
             + ", getOriginalFilename()=" + this.getOrgFilename() + ", getMatrix()=" + this.matrix.toString() + "]";
    }
   
}
