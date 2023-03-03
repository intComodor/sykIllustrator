import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';
import { CanvasService } from 'src/app/services/canvas.service';

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
  constructor(private canvasService: CanvasService) {}

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
    const canvas = this.canvasService.canvas;

    html2canvas(canvas).then(canvas => {
      // Convert the canvas to blob
      canvas.title = (this.filename.value || 'untitled') + '.png';
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
    this.canvasService.clear();
  }

  /**
   * Function called when the user clicks on the full screen button.
   * @see src/app/services/canvas.service.ts
   * for the logic of the full screen.
   */
  onFullScreen() {
    this.canvasService.setFullScreen(true);
  }
}
