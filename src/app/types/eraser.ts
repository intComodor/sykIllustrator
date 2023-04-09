import { CouplePoints } from './couplePoints';
import { Pencil } from './pencil';

export class Eraser extends Pencil {
  constructor() {
    super();
    this.name = 'Eraser';
    this.icon = 'eraser.svg';
  }

  override draw(coords: CouplePoints): void {
    const ctx = this.canvasService.canvasCtx;
    this.canvasService.canvasCtx.strokeStyle = '#ffffff';
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();
    ctx.beginPath();
    ctx.moveTo(coords.startX, coords.startY);
    ctx.lineTo(coords.endX, coords.endY);
    ctx.stroke();
  }
}
