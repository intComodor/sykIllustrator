import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private minWidth = 700;
  private minHeight = 400;

  private formatsBoard: number[] = [16 / 9, 4 / 3, 1 / 1, 21 / 9, 32 / 9];
  private indexFormatBoard = 0;
  format: number = this.formatsBoard[this.indexFormatBoard];

  resize(
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D,
    changeFormat?: boolean
  ) {
    if (!canvas || !canvasCtx) {
      throw new Error('Canvas || canvasCtx is not defined');
    }

    if (changeFormat) {
      this.indexFormatBoard =
        (this.indexFormatBoard + 1) % this.formatsBoard.length;
      this.format = this.formatsBoard[this.indexFormatBoard];
    }

    // Create a temporary canvas to store the current canvas image
    const inMemCanvas: HTMLCanvasElement = document.createElement('canvas');
    const inMemCtx: CanvasRenderingContext2D = inMemCanvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    // Store the current canvas image in the temporary canvas
    inMemCanvas.width = canvas.offsetWidth;
    inMemCanvas.height = canvas.offsetHeight;
    inMemCtx.drawImage(canvas, 0, 0);

    // Resize the canvas
    if (
      window.innerWidth < this.minWidth ||
      window.innerHeight < this.minHeight
    ) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } else {
      canvas.width = window.innerWidth * 0.9 - 2 * 120;
      canvas.height = window.innerHeight * 0.7;
    }

    // Adjust the canvas size to the format
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width / height !== this.format) {
      if (width / height > this.format) {
        canvas.width = height * this.format;
      } else {
        canvas.height = width / this.format;
      }
    }

    // Restore the previous canvas image to the resized canvas
    canvasCtx.drawImage(inMemCanvas, 0, 0, canvas.width, canvas.height);
  }

  clear(canvas: HTMLCanvasElement, canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
