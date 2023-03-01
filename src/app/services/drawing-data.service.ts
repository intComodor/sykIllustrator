import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawingDataService {
  private color = 'red';
  private lineWidth = 2;
  private isDrawing = false;
  private fill = false;

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
