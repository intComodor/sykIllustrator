import { Tool } from './tool';

export class RectForm extends Tool {
  constructor() {
    super('square', 'black');
  }

  initTool(): void {
    let startPosition = { x: 0, y: 0 };
    let endPosition = { x: 0, y: 0 };

    this.eventsSubscription.push(
      this.mouseEventService
        .mousedown$(this.canvasService.canvas)
        .subscribe(event => {
          startPosition = { x: event.offsetX, y: event.offsetY };
        })
    );

    this.eventsSubscription.push(
      this.mouseEventService.mouseup$.subscribe(event => {
        endPosition = { x: event.offsetX, y: event.offsetY };
        const canvasRect = this.canvasService.canvas.getBoundingClientRect();
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;

        // Check if the mouse is still on the canvas before drawing
        if (
          x >= 0 &&
          x < this.canvasService.canvas.width &&
          y >= 0 &&
          y < this.canvasService.canvas.height
        )
          this.draw({
            x1: startPosition.x,
            y1: startPosition.y,
            x2: endPosition.x,
            y2: endPosition.y,
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
    const startX = Math.min(x1, x2);
    const startY = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);

    this.canvasService.canvasCtx.strokeStyle =
      this.drawingDataService.getColor();
    this.canvasService.canvasCtx.fillStyle = this.drawingDataService.getColor();
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();

    if (this.drawingDataService.isFill())
      this.canvasService.canvasCtx.fillRect(startX, startY, width, height);
    else this.canvasService.canvasCtx.strokeRect(startX, startY, width, height);
  }
}
