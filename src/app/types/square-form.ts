import { Tool } from './tool';

export class SquareForm extends Tool {
  constructor() {
    super('Square', 'square-icon.svg');
  }

  initTool(): void {
    console.log('init tool square');
    this.mouseDragSubscription = this.mouseEventService
      .mousedrag$(this.canvasService.canvas)
      .subscribe(coords => {
        this.draw(coords);
      });
  }

  draw({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
    console.log('draw square');
  }

  disableTool(): void {
    if (!this.mouseDragSubscription)
      throw new Error('No subscription yet in pencil');
    this.mouseDragSubscription.unsubscribe();
  }
}
