import { Injectable } from '@angular/core';

/**
 * Canvas service.
 * This service contains the logic of the canvas behavior.
 */
@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  /** Minimum width of the canvas before switching to fullscreen mode */
  private minWidth = 700;
  /** Minimum height of the canvas before switching to fullscreen mode */
  private minHeight = 400;
  /** List of available formats of the canvas */
  private formatsBoard: number[] = [16 / 9, 4 / 3, 1 / 1, 21 / 9, 32 / 9];

  private indexFormatBoard = 0;
  format: number = this.formatsBoard[this.indexFormatBoard];

  /** Canvas element initialized in the drawing component */
  public canvas!: HTMLCanvasElement;
  /** Canvas context initialized in the drawing component */
  public canvasCtx!: CanvasRenderingContext2D;

  isFullScreen = false;

  /** Set the canvas to fullscreen mode with the resize function */
  setFullScreen(value: boolean) {
    this.isFullScreen = value;
    this.resize();
  }

  /** Change the format of the canvas with the resize function */
  changeFormat() {
    this.indexFormatBoard =
      (this.indexFormatBoard + 1) % this.formatsBoard.length;
    this.format = this.formatsBoard[this.indexFormatBoard];

    this.resize();
  }

  /**
   * Resize the canvas to the window size.
   * If the window is too small, the canvas will be in fullscreen mode.
   * The size of the canvas is calculated with the format of the canvas
   * and adjusted to the window size.
   */
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
      window.innerHeight < this.minHeight ||
      this.isFullScreen
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

  /**
   * Clear the canvas with a confirmation message.
   */
  clear() {
    if (confirm('Are you sure to clear the canvas')) {
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
