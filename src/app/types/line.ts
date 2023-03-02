import { Tool } from './tool';

export class Line extends Tool {
  constructor() {
    super('Line', 'line.svg');
  }

  initTool(): void {
    let startX = 0;
    let startY = 0;

    this.eventsSubscription.push(
      this.mouseEventService
        .mousedown$(this.canvasService.canvas)
        .subscribe(event => {
          startX = event.offsetX;
          startY = event.offsetY;
        })
    );

    this.eventsSubscription.push(
      this.mouseEventService.mouseup$.subscribe(event => {
        const canvasRect = this.canvasService.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;

        if (
          x >= 0 &&
          x < this.canvasService.canvas.width &&
          y >= 0 &&
          y < this.canvasService.canvas.height
        )
          this.draw({
            x1: startX,
            y1: startY,
            x2: event.offsetX,
            y2: event.offsetY,
          });
      })
    );
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
}
