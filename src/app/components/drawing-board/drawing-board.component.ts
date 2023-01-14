import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss']
})
export class DrawingBoardComponent implements OnInit {

  constructor() { }

  isDrawing: boolean = false;

  ngOnInit(): void {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = 900;
    canvas.height = 600;

  }

  startDrawing(event: MouseEvent) {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
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
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    if (!ctx) { return; }
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  
  stopDrawing() {
    this.isDrawing = false;
  }


  
  

}
