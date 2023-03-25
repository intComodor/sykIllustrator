import { CouplePoints } from './couplePoints';
import { Tool } from './tool';

export class Pencil extends Tool {
  private isDrawing = false;

  constructor() {
    super('Pencil', 'pencil-icon.svg');
  }

  initTool(): void {
    // behavior when the mouse is pressed and moved
    this.eventsSubscription.push(
      this.mouseEventService
        .mousedrag$(this.canvasService.canvas)
        .subscribe(coords => {
          this.draw(coords);
          this.isDrawing = true;
        })
    );

    // behavior when the mouse is released
    this.eventsSubscription.push(
      this.mouseEventService.mouseup$.subscribe(() => {
        if (this.isDrawing) {
          this.drawingDataService.pushState();
          this.isDrawing = false;
        }
      })
    );
  }

  draw(coords: CouplePoints): void {
    this.canvasService.canvasCtx.strokeStyle =
      this.drawingDataService.getColor();
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();
    this.canvasService.canvasCtx.lineCap = 'round';
    this.canvasService.canvasCtx.beginPath();
    this.canvasService.canvasCtx.moveTo(coords.startX, coords.startY);
    this.canvasService.canvasCtx.lineTo(coords.endX, coords.endY);
    this.canvasService.canvasCtx.stroke();
  }
}
