import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CanvasService } from 'src/app/services/canvas.service';
import { DrawingDataService } from 'src/app/services/drawing-data.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * Header component.
 * This component contains the logic of the header bar.
 * It contains the logic of the header bar options.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private canvasService: CanvasService,
    private drawingDataService: DrawingDataService,
    private storageService: StorageService
  ) {}

  /**
   * Form control for the filename input,
   * used to give a name to the canvas when it is saved.
   */
  filename = new FormControl('');

  /**
   * Function called when the user clicks on the save button.
   * It converts the canvas to a blob and then download it.
   */
  onSave() {
    this.storageService.exportToPng(this.filename.value);
  }

  /**
   * Function called when the user clicks on the change format button.
   * @see src/app/services/canvas.service.ts
   * for the logic of the change format.
   */
  onChangeFormat() {
    this.canvasService.changeFormat();
  }

  /**
   * Function called when the user clicks on the clear button.
   * @see src/app/services/canvas.service.ts
   * for the logic of the clear.
   */
  onClear() {
    this.canvasService.clear('withConfirmation');
    this.drawingDataService.clearStates();
  }

  /**
   * Function called when the user clicks on the full screen button.
   * @see src/app/services/canvas.service.ts
   * for the logic of the full screen.
   */
  onFullScreen() {
    this.canvasService.setFullScreenMode(true);
  }

  onUndo() {
    this.drawingDataService.undo();
  }

  onRedo() {
    this.drawingDataService.redo();
  }

  undoAvailable(): boolean {
    return this.drawingDataService.indexState > 0;
  }

  redoAvailable(): boolean {
    return (
      this.drawingDataService.indexState <
      this.drawingDataService.states.length - 1
    );
  }
}
