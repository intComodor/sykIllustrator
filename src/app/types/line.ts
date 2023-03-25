import { CouplePoints } from './couplePoints';
import { Tool } from './tool';

export class Line extends Tool {
  constructor() {
    super('Line', 'line.svg');
  }

  lastState!: HTMLCanvasElement;
  isDrawing = false;
  line: CouplePoints = new CouplePoints(0, 0, 0, 0);

  initTool(): void {
    // behavior when the mouse is pressed
    this.eventsSubscription.push(
      this.mouseEventService
        .mousedown$(this.canvasService.canvas)
        .subscribe(event => {
          this.lastState = this.canvasService.createTmpCanvas();
          this.line.startX = event.offsetX;
          this.line.startY = event.offsetY;

          this.isDrawing = true;
        })
    );

    // behavior when the mouse is moved
    this.eventsSubscription.push(
      this.mouseEventService.mousemove$(window).subscribe(event => {
        if (!this.isDrawing) return;

        // check if the mouse is still on the canvas before drawing the preview of the line
        if (this.canvasService.isInCanvas(event.clientX, event.clientY)) {
          this.canvasService.drawCanvas(this.lastState);
          this.line.endX = event.offsetX;
          this.line.endY = event.offsetY;
          this.draw(this.line);
        }
        // else we stop previewing and draw the line
        else {
          this.isDrawing = false;
          this.drawingDataService.pushState();
          this.lastState = this.canvasService.createTmpCanvas();
        }
      })
    );

    // behavior when the mouse is released
    this.eventsSubscription.push(
      this.mouseEventService.mouseup$.subscribe(event => {
        if (!this.isDrawing) return;

        if (this.canvasService.isInCanvas(event.clientX, event.clientY)) {
          this.isDrawing = false;
          this.drawingDataService.pushState();
          this.lastState = this.canvasService.createTmpCanvas();
        }
      })
    );
  }

  draw(coords: CouplePoints): void {
    const ctx = this.canvasService.canvasCtx;
    this.canvasService.canvasCtx.strokeStyle =
      this.drawingDataService.getColor();
    this.canvasService.canvasCtx.lineWidth =
      this.drawingDataService.getLineWidth();
    ctx.beginPath();
    ctx.moveTo(coords.startX, coords.startY);
    ctx.lineTo(coords.endX, coords.endY);
    ctx.stroke();
  }
}
