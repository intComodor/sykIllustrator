import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import html2canvas from 'html2canvas';
import { DrawingDataService } from './drawing-data.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorageId = 'imgData';
  constructor(
    private canvasService: CanvasService,
    private drawingDataService: DrawingDataService
  ) {}

  exportToPng(filename: string | null): void {
    const canvas = this.canvasService.canvas;
    html2canvas(canvas).then(canvas => {
      // Convert the canvas to blob
      canvas.title = (filename || 'untitled') + '.png';
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) throw new Error('Blob is not defined');
        const link = document.createElement('a');
        link.download = canvas.title;
        link.href = URL.createObjectURL(blob);
        link.click();
      }, 'image/png');
    });
  }

  /**
   * save all states of the drawing in the local storage in webp format.
   */
  storeDrawing(): void {
    localStorage.clear(); // clear old drawings stored
    const canvasStates = this.drawingDataService.states;
    for (const [i, canvas] of canvasStates.entries()) {
      const imageDataUrl = canvas.toDataURL('image/webp', 1.0);
      localStorage.setItem(i + this.localStorageId, imageDataUrl);
    }
  }

  /**
   * check if a drawing exists in the local storage.
   * we check the second item because the first one is a empty canvas.
   */
  isDrawingStored(): boolean {
    return localStorage.getItem('1' + this.localStorageId) != null;
  }

  /**
   * restore the drawing from the local storage state by state.
   * we start from the second item because the first one is a empty canvas.
   */
  restoreDrawing(): void {
    if (!this.isDrawingStored()) return;

    let index = 1;
    let canvasId = localStorage.getItem(index + this.localStorageId);

    while (canvasId != null) {
      const img = new Image();
      img.onload = () => {
        this.canvasService.canvasCtx.drawImage(
          img,
          0,
          0,
          this.canvasService.canvas.width,
          this.canvasService.canvas.height
        );
        this.drawingDataService.pushState();
      };
      img.src = canvasId;
      index++;
      canvasId = localStorage.getItem(index + this.localStorageId);
    }
  }
}
