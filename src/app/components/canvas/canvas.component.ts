/*-------------------------------------------------------------------------------	
 * BPMN Designer 	
 *-------------------------------------------------------------------------------	
 * @author    	Thomas Meyer	
 * @copyright 	Copyright (C) 2020 Thomas Meyer. All Rights Reserved.
 * @version		  1.0.0
 * @since		    1.0.0
 --------------------------------------------------------------------------------*/
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: `<canvas #canvas id="canvas" ></canvas>`,
  styles: ['./canvas.component.css']  
})
export class CanvasComponent implements OnInit {
  
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;            // the output

  private ctx: CanvasRenderingContext2D;            // the draw context 

  private mouseDown : boolean = false;              // mouse button pressed

  /**
   * default constructor
   * 
   * @param window: Window                          the window
   */
  constructor(private window: Window) { }

  /**
   * initialize
   */
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.window.addEventListener('keydown', this.onKeyDown, false);
    this.window.addEventListener('keypress',this.onKeyPress, false);
    this.window.addEventListener('keyup',this.onKeyUp, false);    
  }

  /**
   * mouse up event
   * 
   * @event
   */
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.mouseDown = false;
    console.log(event);
  }

  /**
   * mouse move event
   * 
   * @param event 
   * @public
   */
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    //this.mouseCords = new Point( event.clientX, event.clientY );
    console.log(event);    
  }

  /**
   * mouse down event
   * 
   * @param event 
   * @public
   */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.mouseDown = true;
    console.log(event);    
  }

  /**
   * key down event
   * 
   * @param event 
   * @public
   */
  public onKeyDown(event: KeyboardEvent) {
    console.log(event);
  }

  /**
   * key press event
   * 
   * @param event 
   * @public
   */
  public onKeyPress(event: KeyboardEvent) {
    console.log(event);
  }

  /**
   * key up event
   * 
   * @param event 
   * @public
   */
  public onKeyUp(event: KeyboardEvent) {
    console.log(event);
  }
}
