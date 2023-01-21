import { HeaderService } from 'src/app/services/header.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DrawingDataService } from 'src/app/services/drawing-data.service';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss'],
})
export class DrawingBoardComponent implements AfterViewInit {
  @ViewChild('board', { static: true }) _canvas: ElementRef | undefined;

  constructor(private data: HeaderService, private drawingDataService: DrawingDataService) {
    // The approach in Angular 6 is to declare in constructor
    this.data.listenFormat.subscribe(_ => {
      this.indexFormatBoard = (this.indexFormatBoard + 1) % this.formatsBoard.length;
      this.format = this.formatsBoard[this.indexFormatBoard];
      this.resizeToFormat();
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

    this.resizeToFormat();
  }

  startDrawing({ clientX, clientY }: MouseEvent) {
    let rect = this.canvas.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(x, y);
    this.drawingDataService.setIsDrawing(true);
  }

  drawing(event: MouseEvent) {
    console.log('drawing ' + event.offsetX + ' ' + event.offsetY);
    if (!this.drawingDataService.getIsDrawing()) {
      return;
    }

    this.canvasCtx.strokeStyle = this.drawingDataService.getColor();
    this.canvasCtx.lineWidth = this.drawingDataService.getLineWidth();
    this.canvasCtx.lineTo(event.offsetX, event.offsetY);
    this.canvasCtx.stroke();
  }

  stopDrawing() {
    this.drawingDataService.setIsDrawing(false);
  }

  resizeToFormat() {
    if (!this.canvas || !this.canvasCtx) {
      return;
    }
    let inMemCanvas: HTMLCanvasElement = document.createElement('canvas');
    let inMemCtx: CanvasRenderingContext2D = inMemCanvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    inMemCanvas.width = this.canvas.offsetWidth;
    inMemCanvas.height = this.canvas.offsetHeight;
    inMemCtx.drawImage(this.canvas, 0, 0);

    if (window.innerWidth < 700 || window.innerHeight < 400) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    } else {
      this.canvas.width = window.innerWidth * 0.9 - 2 * 120;
      this.canvas.height = window.innerHeight * 0.7;
    }
    let width = this.canvas.offsetWidth;
    let height = this.canvas.offsetHeight;
    if (width / height !== this.format) {
      if (width / height > this.format) {
        this.canvas.width = height * this.format;
      } else {
        this.canvas.height = width / this.format;
      }
    }

    this.canvasCtx.drawImage(
      inMemCanvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
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
    this.resizeToFormat()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log('resizing ' + window.innerWidth + ' ' + window.innerHeight);

    this.resizeToFormat();
  }


  @HostListener('mousedown', ['$event.target'])
  onClick() {
    this.isFullScreen = false;
    this.resizeToFormat()
  }

}
