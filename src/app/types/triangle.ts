import { CouplePoints } from './couplePoints';
import { Shape } from './shape';

export class Triangle extends Shape {
  constructor() {
    super('Triangle');
  }

  draw(coords: CouplePoints): void {
    // Calculate the coordinates of the rectangle to draw
    const ctx = this.canvasService.canvasCtx;

    this.canvasService.canvasCtx.strokeStyle =
      this.drawingDataService.getColor();
    this.canvasService.canvasCtx.fillStyle = this.drawingDataService.getColor();
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();

    ctx.beginPath();
    ctx.moveTo(coords.startX, coords.startY);
    ctx.lineTo(coords.endX, coords.endY);
    ctx.lineTo(coords.startX - (coords.endX - coords.startX), coords.endY);
    ctx.closePath();
    if (this.drawingDataService.isFill()) ctx.fill();
    else ctx.stroke();
  }
}
