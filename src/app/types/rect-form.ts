import { CouplePoints } from './couplePoints';
import { Shape } from './shape';

export class RectForm extends Shape {
  constructor() {
    super('RectForm');
  }

  draw(coords: CouplePoints): void {
    // Calculate the coordinates of the rectangle to draw
    const startX = Math.min(coords.startX, coords.endX);
    const startY = Math.min(coords.startY, coords.endY);
    const width = Math.abs(coords.endX - coords.startX);
    const height = Math.abs(coords.endY - coords.startY);

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
