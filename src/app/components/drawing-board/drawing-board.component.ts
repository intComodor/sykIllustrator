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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakeBarComponent } from '../snake-bar/snake-bar.component';
import { StorageService } from 'src/app/services/storage.service';

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

  isFullScreenMode(): boolean {
    return this.canvasService.isFullScreenMode;
  }

  showBtnQuitFullScreen(): boolean {
    return !this.canvasService.isWindowTooSmall();
  }

  constructor(
    private canvasService: CanvasService,
    private toolsService: ToolsService,
    private drawingDataService: DrawingDataService,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {}

  /**
   * After the canvas elemnt HTML is loaded, initialize the canvas and the tool.
   */
  ngAfterViewInit(): void {
    this.initCanvas();
    this.toolsService.tool.initTool();
    this.drawingDataService.initStates();

    // open snackbar asking if the user wants to restore her last drawing
    if (this.storageService.isDrawingStored()) {
      setTimeout(() => {
        this.snackBar.openFromComponent(SnakeBarComponent, {
          data: {
            message: 'Restore your last drawing ?',
            model: 'question',
          },
        });
      }, 2000);
    }

    // we store the drawing in the local storage before the user leaves the page
    window.addEventListener('beforeunload', () => {
      this.storageService.storeDrawingInLocalStorage();
    });
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

  onExitFullScreenMode() {
    this.canvasService.setFullScreenMode(false);
  }
}
