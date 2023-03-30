import { CouplePoints } from './couplePoints';
import { Tool } from './tool';

export class RectForm extends Tool {
  constructor() {
    super('RectForm', 'black');
  }

  /** Coordinates of the rectangle to draw */
  coords: CouplePoints = new CouplePoints(0, 0, 0, 0);
  lastState!: HTMLCanvasElement;
  isDrawing = false;

  initTool(): void {
    // behavior when the mouse is pressed
    this.eventsSubscription.push(
      this.mouseEventService
        .mousedown$(this.canvasService.canvas)
        .subscribe(event => {
          this.coords.startX = event.offsetX;
          this.coords.startY = event.offsetY;

          this.lastState = this.canvasService.createTmpCanvas();
          this.isDrawing = true;
        })
    );

    // behavior when the mouse is moved
    this.eventsSubscription.push(
      this.mouseEventService.mousemove$(window).subscribe(event => {
        if (!this.isDrawing) return;

        if (this.canvasService.isInCanvas(event.clientX, event.clientY)) {
          this.canvasService.drawCanvas(this.lastState);
          this.coords.endX = event.offsetX;
          this.coords.endY = event.offsetY;
          this.draw(this.coords);
        } else {
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

        this.coords.endX = event.offsetX;
        this.coords.endY = event.offsetY;

        // Check if the mouse is still on the canvas before drawing
        if (this.canvasService.isInCanvas(event.clientX, event.clientY)) {
          this.draw(this.coords);
          this.drawingDataService.pushState();
          this.isDrawing = false;
          this.lastState = this.canvasService.createTmpCanvas();
        }
      })
    );
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
