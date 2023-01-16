import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss']
})
export class DrawingBoardComponent implements OnInit {

  constructor(private data: DataService) {
    // The approach in Angular 6 is to declare in constructor
    this.data.listenFormat.subscribe(_ => {
      this.indexFormatBoard = (this.indexFormatBoard + 1) % this.formatsBoard.length;
      this.format = this.formatsBoard[this.indexFormatBoard];
      this.resizeToFormat();
    });
  }

  private formatsBoard: number[] = [16/9, 4/3, 1/1, 21/9, 32/9];
  private indexFormatBoard: number = 0;

  isDrawing: boolean = false;
  format: number = this.formatsBoard[this.indexFormatBoard];

  color: string = "black";
  lineWidth: number = 1;

  // canvas
  canvasRef: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | undefined;

  // in memory canvas
  inMemCanvas: HTMLCanvasElement = document.createElement('canvas');
  inMemCtx: CanvasRenderingContext2D = this.inMemCanvas.getContext('2d') as CanvasRenderingContext2D;

  ngOnInit(): void {
    // canvas
    this.canvasRef = document.getElementById("board") as HTMLCanvasElement;
    this.ctx = this.canvasRef.getContext('2d') as CanvasRenderingContext2D;

    this.resizeToFormat();
  }

  startDrawing(event: MouseEvent) {
    let canvas = document.getElementById("board") as HTMLCanvasElement;
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let ctx = canvas.getContext("2d");
    if (!ctx) { return; }
    ctx.beginPath();
    ctx.moveTo(x, y);
    this.isDrawing = true;
  }
  
  
  drawing(event: MouseEvent) {
    console.log("drawing " + event.offsetX + " " + event.offsetY);
    if (!this.isDrawing) { return; }
    let canvas = document.getElementById("board") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    if (!ctx) { return; }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  
  stopDrawing() {
    this.isDrawing = false;
  }

  resizeToFormat() {

    if (this.canvasRef === undefined) { return; }
    if (this.ctx === undefined) { return; }
    
    this.inMemCanvas.width = this.canvasRef.offsetWidth;
    this.inMemCanvas.height = this.canvasRef.offsetHeight;
    this.inMemCtx.drawImage(this.canvasRef, 0, 0);

    if (window.innerWidth < 700 || window.innerHeight < 400) {
      this.canvasRef.width = window.innerWidth;
      this.canvasRef.height = window.innerHeight;
    }
    else {
      this.canvasRef.width = window.innerWidth*0.9 - 2*120;
      this.canvasRef.height = window.innerHeight*0.7;
    }

    let width = this.canvasRef.offsetWidth;
    let height = this.canvasRef.offsetHeight;
    

    if(width/height !== this.format) {
      if(width/height > this.format){
        this.canvasRef.width = height * this.format;
      }
      else {
        this.canvasRef.height = width / this.format;
      }
    }

    this.ctx.drawImage(this.inMemCanvas, 0, 0, this.canvasRef.width, this.canvasRef.height);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log("resizing " + window.innerWidth + " " + window.innerHeight);

    this.resizeToFormat();
  }

}
