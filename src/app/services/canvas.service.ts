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

  public canvas!: HTMLCanvasElement;
  public canvasCtx!: CanvasRenderingContext2D;

  resize() {
    if (!this.canvas || !this.canvasCtx) {
      throw new Error('Canvas || canvasCtx is not defined');
    }

    // Create a temporary canvas to store the current canvas image
    const inMemCanvas: HTMLCanvasElement = document.createElement('canvas');
    const inMemCtx: CanvasRenderingContext2D = inMemCanvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    // Store the current canvas image in the temporary canvas
    inMemCanvas.width = this.canvas.offsetWidth;
    inMemCanvas.height = this.canvas.offsetHeight;
    inMemCtx.drawImage(this.canvas, 0, 0);

    // Resize the canvas
    if (
      window.innerWidth < this.minWidth ||
      window.innerHeight < this.minHeight
    ) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    } else {
      this.canvas.width = window.innerWidth * 0.9 - 2 * 120;
      this.canvas.height = window.innerHeight * 0.7;
    }

    // Adjust the canvas size to the format
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    if (width / height !== this.format) {
      if (width / height > this.format) {
        this.canvas.width = height * this.format;
      } else {
        this.canvas.height = width / this.format;
      }
    }

    // Restore the previous canvas image to the resized canvas
    this.canvasCtx.drawImage(
      inMemCanvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  changeFormat() {
    this.indexFormatBoard =
      (this.indexFormatBoard + 1) % this.formatsBoard.length;
    this.format = this.formatsBoard[this.indexFormatBoard];

    this.resize();
  }

  clear() {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
