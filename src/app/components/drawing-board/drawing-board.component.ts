import { HeaderService } from 'src/app/services/header.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CanvasService } from 'src/app/services/canvas.service';
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
    private headerService: HeaderService,
    private drawingDataService: DrawingDataService,
    private mouseEventService: MouseEventService,
    private canvasService: CanvasService
  ) {
    this.headerService.listenFormat.subscribe(_ => {
      this.canvasService.resize(this.canvas, this.canvasCtx, true);
    });

    this.headerService.listenClear.subscribe(_ => {
      this.canvasService.clear(this.canvas, this.canvasCtx);
    });

    this.headerService.listenFullScreen.subscribe(_ => {
      this.isFullScreen = true;
      this.canvasService.resize(this.canvas, this.canvasCtx);
    });
  }

  isFullScreen = false;

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
    this.canvasService.resize(this.canvas, this.canvasCtx);

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.canvasService.resize(this.canvas, this.canvasCtx);
  }

  @HostListener('mousedown', ['$event.target'])
  onClick() {
    this.isFullScreen = false;
    this.canvasService.resize(this.canvas, this.canvasCtx);
  }
}
