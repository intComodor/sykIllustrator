import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawingDataService {
  private color: string = 'red';
  private lineWidth: number = 1;
  private isDrawing: boolean = false;

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
}
