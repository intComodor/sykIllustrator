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
      this.canvasService.changeFormat();
    });

    this.headerService.listenClear.subscribe(_ => {
      this.canvasService.clear();
    });

    this.headerService.listenFullScreen.subscribe(_ => {
      this.isFullScreen = true;
      this.canvasService.resize();
    });
  }

  isFullScreen = false;

  ngAfterViewInit(): void {
    if (!this._canvas) throw new Error('Canvas Element is not defined');
    this.canvasService.canvas = this._canvas.nativeElement as HTMLCanvasElement;
    this.canvasService.canvasCtx = this.canvasService.canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    this.canvasService.resize();

    const mousedrag$ = this.mouseEventService.mousedrag$(
      this.canvasService.canvas
    );
    mousedrag$.subscribe(coords => {
      this.canvasService.canvasCtx.strokeStyle =
        this.drawingDataService.getColor();
      this.canvasService.canvasCtx.lineWidth =
        this.drawingDataService.getLineWidth();
      this.canvasService.canvasCtx.beginPath();
      this.canvasService.canvasCtx.moveTo(coords.x1, coords.y1);
      this.canvasService.canvasCtx.lineTo(coords.x2, coords.y2);
      this.canvasService.canvasCtx.stroke();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.canvasService.resize();
  }

  @HostListener('mousedown', ['$event.target'])
  onClick() {
    this.isFullScreen = false;
    this.canvasService.resize();
  }
}
