import { Tool } from './tool';

export class Pencil extends Tool {
  constructor() {
    super('Pencil', 'pencil-icon.svg');
  }

  initTool(): void {
    this.eventsSubscription.push(
      this.mouseEventService
        .mousedrag$(this.canvasService.canvas)
        .subscribe(coords => {
          this.draw(coords);
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
        ) {
          this.drawingDataService.pushState();
        }
      })
    );
  }

  draw({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
    this.canvasService.canvasCtx.strokeStyle =
      this.drawingDataService.getColor();
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();
    this.canvasService.canvasCtx.lineCap = 'round';
    this.canvasService.canvasCtx.beginPath();
    this.canvasService.canvasCtx.moveTo(x1, y1);
    this.canvasService.canvasCtx.lineTo(x2, y2);
    this.canvasService.canvasCtx.stroke();
  }
}
