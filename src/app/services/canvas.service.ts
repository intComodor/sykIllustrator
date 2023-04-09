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

  isFullScreenMode = false;

  /** Check if the window is inferior to minWidth or minHeight */
  isWindowTooSmall(): boolean {
    return (
      window.innerWidth < this.minWidth + 5 ||
      window.innerHeight < this.minHeight + 5
    );
  }

  /** Set the canvas to fullscreen mode with the resize function */
  setFullScreenMode(value: boolean) {
    this.isFullScreenMode = value;
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

    // Create a temporary canvas and store the current canvas image in it
    const tmpCanvas: HTMLCanvasElement = this.createTmpCanvas();

    // Resize the canvas
    if (this.isWindowTooSmall() || this.isFullScreenMode) {
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
      tmpCanvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  /**
   * Clear the canvas with a confirmation message.
   */
  clear(confirmation: 'withConfirmation' | 'withoutConfirmation') {
    if (
      confirmation === 'withConfirmation' &&
      confirm('Are you sure to clear the canvas')
    ) {
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  /**
   * Save the current canvas image in a temporary canvas.
   */
  createTmpCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(this.canvas, 0, 0);
    return canvas;
  }

  /**
   * Replace the current canvas with the canvas passed in parameter.
   */
  drawCanvas(canvas: HTMLCanvasElement | HTMLImageElement) {
    this.clear('withoutConfirmation');
    this.canvasCtx.drawImage(
      canvas,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  isInCanvas(x: number, y: number): boolean {
    const canvasRect = this.canvas.getBoundingClientRect();
    const canvasX = x - canvasRect.left;
    const canvasY = y - canvasRect.top;
    return (
      canvasX >= 0 &&
      canvasX < this.canvas.width &&
      canvasY >= 0 &&
      canvasY < this.canvas.height
    );
  }
}
