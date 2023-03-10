import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';

/**
 * Drawing data service.
 * This service contains the options values of the tools.
 */
@Injectable({
  providedIn: 'root',
})
export class DrawingDataService {
  constructor(private canvasService: CanvasService) {}

  private color = 'red';
  private lineWidth = 2;
  private isDrawing = false;
  private fill = false;
  states: HTMLCanvasElement[] = [];
  indexState = 0;

  initStates(): void {
    this.states.push(this.canvasService.createTmpCanvas());
  }

  clearStates(): void {
    this.states = [];
    this.indexState = 0;
    this.initStates();
  }

  pushState(): void {
    while (this.indexState != this.states.length - 1) this.states.pop();

    this.states.push(this.canvasService.createTmpCanvas());
    this.indexState++;
  }

  undo(): void {
    if (this.indexState > 0) {
      this.indexState--;
      this.canvasService.drawCanvas(this.states[this.indexState]);
    }
  }

  redo(): void {
    if (this.indexState < this.states.length - 1) {
      this.indexState++;
      this.canvasService.drawCanvas(this.states[this.indexState]);
    }
  }

  getColor(): string {
    return this.color;
  }

  setColor(color: string): void {
    this.color = color;
  }

  getLineWidth(): number {
    return this.lineWidth;
  }

  setLineWidth(lineWidth: number): void {
    this.lineWidth = lineWidth;
  }

  getIsDrawing(): boolean {
    return this.isDrawing;
  }

  setIsDrawing(isDrawing: boolean): void {
    this.isDrawing = isDrawing;
  }

  isFill(): boolean {
    return this.fill;
  }

  setFill(fill: boolean): void {
    this.fill = fill;
  }
}
