import { CouplePoints } from './couplePoints';
import { Shape } from './shape';

export class Circle extends Shape {
  constructor() {
    super('Circle');
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
    const radius =
      Math.abs(coords.endX - coords.startX + (coords.endY - coords.startY)) / 2;
    ctx.arc(coords.startX, coords.startY, radius, 0, 2 * Math.PI);
    ctx.closePath();
    if (this.drawingDataService.isFill()) ctx.fill();
    else ctx.stroke();
  }
}
