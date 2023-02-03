import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';
import { CanvasService } from 'src/app/services/canvas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private canvasService: CanvasService) {}

  filename = new FormControl('');

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

  onChangeFormat() {
    this.canvasService.changeFormat();
  }

  onClear() {
    this.canvasService.clear();
  }

  onFullScreen() {
    this.canvasService.setFullScreen(true);
  }
}
