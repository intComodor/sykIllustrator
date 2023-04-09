import { Component, HostListener, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-snake-bar',
  templateUrl: './snake-bar.component.html',
  styleUrls: ['./snake-bar.component.scss'],
})
export class SnakeBarComponent {
  message = '';
  model = 'info';

  /** Value of the progress bar */
  progressBarValue = 100;
  /** Duration of the snackbar before it closes */
  duration = 8000;
  /** Interval id used to stop the countdown of the life of the snackbar
   * when the mouse is over the snackbar */
  intervalId!: NodeJS.Timeout;

  constructor(
    private snackBarRef: MatSnackBarRef<SnakeBarComponent>,
    private storageService: StorageService,
    @Inject(MAT_SNACK_BAR_DATA)
    public data: {
      message: string;
      model: 'info' | 'question' | 'error';
    }
  ) {
    this.message = data.message;
    this.model = data.model;
    this.runProgressBar();
  }

  colorModel(): string {
    switch (this.model) {
      case 'info':
        return 'green';
      case 'question':
        return 'black';
      case 'error':
        return 'red';
      default:
        return 'black';
    }
  }

  /**
   * We start the countdown of the life of the snackbar
   */
  runProgressBar() {
    const step = this.duration / 1000000;
    this.intervalId = setInterval(() => {
      this.progressBarValue -= 100 * step;
      if (this.progressBarValue <= 0) {
        this.snackBarRef.dismissWithAction();
      }
    }, this.duration * step);
  }

  /**
   * We stop the countdown exiting the snackbar when the mouse is over the snackbar
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    clearInterval(this.intervalId);
  }

  /**
   * We resume the countdown when the mouse leaves the snackbar
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    this.runProgressBar();
  }

  onYes() {
    this.storageService.restoreDrawingFromLocalStorage();
    this.snackBarRef.dismiss();
  }

  onNo() {
    this.snackBarRef.dismiss();
  }
}
