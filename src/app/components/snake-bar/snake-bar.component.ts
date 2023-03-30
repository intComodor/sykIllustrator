import { Component, HostListener } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-snake-bar',
  templateUrl: './snake-bar.component.html',
  styleUrls: ['./snake-bar.component.scss'],
})
export class SnakeBarComponent {
  /** Value of the progress bar */
  progressBarValue = 100;
  /** Duration of the snackbar before it closes */
  duration = 8000;
  /** Interval id used to stop the countdown of the life of the snackbar
   * when the mouse is over the snackbar */
  intervalId!: NodeJS.Timeout;

  constructor(
    private snackBarRef: MatSnackBarRef<SnakeBarComponent>,
    private storageService: StorageService
  ) {
    this.runProgressBar();
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
    this.storageService.restoreDrawing();
    this.snackBarRef.dismiss();
  }

  onNo() {
    this.snackBarRef.dismiss();
  }
}
