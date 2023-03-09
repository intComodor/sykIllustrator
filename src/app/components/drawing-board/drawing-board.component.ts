import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CanvasService } from 'src/app/services/canvas.service';
import { DrawingDataService } from 'src/app/services/drawing-data.service';
import { ToolsService } from 'src/app/services/tools.service';

/**
 * Drawing board component.
 * This component is the main component of the application.
 * It contains the canvas element and the initialization of the services using the canvas element.
 * It also contains the logic of the canvas behavior.
 */
@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss'],
})
export class DrawingBoardComponent implements AfterViewInit {
  /** Reference to the HTML canvas element */
  @ViewChild('board', { static: true })
  _canvas: ElementRef | undefined;

  isFullScreen(): boolean {
    return this.canvasService.isFullScreen;
  }

  constructor(
    private canvasService: CanvasService,
    private toolsService: ToolsService,
    private drawingDataService: DrawingDataService
  ) {}

  /**
   * After the canvas elemnt HTML is loaded, initialize the canvas and the tool.
   */
  ngAfterViewInit(): void {
    this.initCanvas();
    this.toolsService.tool.initTool();
    this.drawingDataService.initStates();
  }

  /**
   * Initialize the canvas service with the HTML canvas element
   * and set canvas size to the window size.
   */
  initCanvas() {
    if (!this._canvas) throw new Error('Canvas Element is not defined');
    this.canvasService.canvas = this._canvas.nativeElement as HTMLCanvasElement;
    this.canvasService.canvasCtx = this.canvasService.canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    this.canvasService.resize();
  }

  /**
   * Resize the canvas to the window when the window is resized.
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.canvasService.resize();
  }

  /**
   * Exit fullscreen mode when the user clicks on the canvas,
   * so when we are in fullscreen mode, the user can exit it by clicking on the canvas.
   */
  @HostListener('mousedown', ['$event.target'])
  onClick() {
    this.canvasService.setFullScreen(false);
  }
}
