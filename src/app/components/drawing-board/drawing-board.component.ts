import { HeaderService } from 'src/app/services/header.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CanvasResizeService } from 'src/app/services/canvas-resize.service';
import { DrawingDataService } from 'src/app/services/drawing-data.service';
import { MouseEventService } from 'src/app/services/mouse-event.service';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss'],
})
export class DrawingBoardComponent implements AfterViewInit {
  @ViewChild('board', { static: true }) _canvas: ElementRef | undefined;

  constructor(
    private data: HeaderService, 
    private drawingDataService: DrawingDataService, 
    private mouseEventService: MouseEventService,
    private canvasResizeService: CanvasResizeService
  ) {
    // The approach in Angular 6 is to declare in constructor
    this.data.listenFormat.subscribe(_ => {
      this.indexFormatBoard = (this.indexFormatBoard + 1) % this.formatsBoard.length;
      this.format = this.formatsBoard[this.indexFormatBoard];
      this.canvasResizeService.resizeCanvas(this.canvas, this.canvasCtx);
    });

    this.data.listenClear.subscribe(_ => {
      this.clear();
    });

    this.data.listenFullScreen.subscribe(_ => {
      this.fullScreen();
    });
  }

  private formatsBoard: number[] = [16 / 9, 4 / 3, 1 / 1, 21 / 9, 32 / 9];
  private indexFormatBoard: number = 0;

  isFullScreen: boolean = false;

  isDrawing: boolean = false;
  format: number = this.formatsBoard[this.indexFormatBoard];

  // color: string = 'black';
  // lineWidth: number = 1;


  // canvas
  _canvasCtx: CanvasRenderingContext2D | undefined;

  public get canvas(): HTMLCanvasElement {
    if (!this._canvas) throw new Error('Canvas Element is not defined');
    return this._canvas.nativeElement as HTMLCanvasElement;
  }

  public get canvasCtx(): CanvasRenderingContext2D {
    if (!this._canvasCtx) throw new Error('Canvas Context is not defined');
    return this._canvasCtx;
  }

  ngAfterViewInit(): void {
    this._canvasCtx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.canvasResizeService.resizeCanvas(this.canvas, this.canvasCtx);

    const mousedrag$ = this.mouseEventService.mousedrag$(this.canvas);

    mousedrag$.subscribe(coords => {
      this.canvasCtx.strokeStyle = this.drawingDataService.getColor();
      this.canvasCtx.lineWidth = this.drawingDataService.getLineWidth();
      this.canvasCtx.beginPath();
      this.canvasCtx.moveTo(coords.x1, coords.y1);
      this.canvasCtx.lineTo(coords.x2, coords.y2);
      this.canvasCtx.stroke();
    });
  }

  clear() {
    if (this.canvasCtx === undefined || 
      this.canvas === undefined || 
      this.canvas.width === undefined || 
      this.canvas.height === undefined
      ) { return; }
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  fullScreen() {
    this.isFullScreen = true;
    this.canvasResizeService.resizeCanvas(this.canvas, this.canvasCtx);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.canvasResizeService.resizeCanvas(this.canvas, this.canvasCtx);
  }


  @HostListener('mousedown', ['$event.target'])
  onClick() {
    this.isFullScreen = false;
    this.canvasResizeService.resizeCanvas(this.canvas, this.canvasCtx);
  }

}
