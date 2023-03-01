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
  }

  draw({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
    this.canvasService.canvasCtx.strokeStyle =
      this.drawingDataService.getColor();
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();
    this.canvasService.canvasCtx.beginPath();
    this.canvasService.canvasCtx.moveTo(x1, y1);
    this.canvasService.canvasCtx.lineTo(x2, y2);
    this.canvasService.canvasCtx.stroke();
  }
}
