import { Tool } from './tool';

export class Line extends Tool {
  private isDrawing = false;

  constructor() {
    super('Line', 'line.svg');
  }

  initTool(): void {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    this.mouseEventService
      .mousedown$(this.canvasService.canvas)
      .subscribe(event => {
        this.isDrawing = true;
        startX = event.offsetX;
        startY = event.offsetY;
      });
    this.mouseEventService
      .mousemove$(this.canvasService.canvas)
      .subscribe(event => {
        if (this.isDrawing) {
          endX = event.offsetX;
          endY = event.offsetY;
          //this.draw({
          // x1: startX,
          // y1: startY,
          // x2: event.offsetX,
          // y2: event.offsetY,
          //});
        }
      });
    this.mouseEventService.mouseup$.subscribe(() => {
      this.isDrawing = false;
      this.draw({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
      });
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
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  disableTool(): void {
    this.isDrawing = false;
  }
}
