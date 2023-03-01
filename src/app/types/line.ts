import { Tool } from './tool';

export class Line extends Tool {
  private isDrawing = false;

  constructor() {
    super('Line', 'line.svg');
  }

  initTool(): void {
    let startX = 0;
    let startY = 0;
    this.mouseEventService
      .mousedown$(this.canvasService.canvas)
      .subscribe(event => {
        this.isDrawing = true;
        startX = event.offsetX;
        startY = event.offsetY;
      });
    this.mouseEventService.mouseup$.subscribe(event => {
      if (this.isDrawing) {
        this.draw({
          x1: startX,
          y1: startY,
          x2: event.offsetX,
          y2: event.offsetY,
        });
        startX = event.offsetX;
        startY = event.offsetY;
      }
      this.isDrawing = false;
    });
  }

  draw({
    x1,
    y1,
    x2,
    y2,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }): void {
    const ctx = this.canvasService.canvasCtx;
    this.canvasService.canvasCtx.strokeStyle =
      this.drawingDataService.getColor();
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  disableTool(): void {
    this.isDrawing = false;
  }
}
