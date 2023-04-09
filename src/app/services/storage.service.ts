import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import html2canvas from 'html2canvas';
import { DrawingDataService } from './drawing-data.service';
import { Subject } from 'rxjs';
import { SnakeBarComponent } from '../components/snake-bar/snake-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export type DrawingData = {
  title: string;
  states: string[];
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorageId = 'draw';
  constructor(
    private canvasService: CanvasService,
    private drawingDataService: DrawingDataService,
    private snackBar: MatSnackBar
  ) {}

  showMsg = (model: 'info' | 'error', msg: string) =>
    this.snackBar.openFromComponent(SnakeBarComponent, {
      data: {
        message: msg,
        model: model,
      },
    });

  export(filename: string | null, ext: string): void {
    const canvas = this.canvasService.canvas;
    html2canvas(canvas).then(canvas => {
      // Convert the canvas to blob
      canvas.title = (filename || 'untitled') + '.' + ext;
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) throw new Error('Blob is not defined');
        const link = document.createElement('a');
        link.download = canvas.title;
        link.href = URL.createObjectURL(blob);
        link.click();
      }, 'image/' + ext);
    });
  }

  // create a json file with the drawing data

  storeDrawingInFile(filename: string | null): void {
    const data: DrawingData = {
      title: filename || '',
      states: this.drawingDataService.states.map(canvas => {
        return canvas.toDataURL('image/webp', 1.0);
      }),
    };

    const link = document.createElement('a');
    link.download = (filename || 'untitled') + '.syk';
    link.href = URL.createObjectURL(
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );
    link.click();
  }

  /**
   * save all states of the drawing in the local storage in webp format.
   */
  storeDrawingInLocalStorage(): void {
    localStorage.clear(); // clear old drawings stored

    localStorage.setItem(
      this.localStorageId + 'Title',
      this.drawingDataService.title$.getValue()
    );

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
  restoreDrawingFromLocalStorage(): void {
    if (!this.isDrawingStored()) return;

    this.canvasService.clear('withoutConfirmation');
    this.drawingDataService.clearStates();

    this.drawingDataService.title$.next(
      localStorage.getItem(this.localStorageId + 'Title') || ''
    );

    let index = 1;
    let canvasId = localStorage.getItem(index + this.localStorageId);

    while (canvasId != null) {
      const img = new Image();
      img.onload = () => {
        this.canvasService.drawCanvas(img);
        this.drawingDataService.pushState();
      };
      img.onerror = () => {
        this.showMsg(
          'error',
          'Something went wrong, the drawing can not be loaded.'
        );
      };
      img.src = canvasId;
      index++;
      canvasId = localStorage.getItem(index + this.localStorageId);
    }

    this.showMsg('info', 'Your drawing has been loaded successfully !');
  }

  restoreDrawingFromFile(file: File): Subject<string> {
    this.canvasService.clear('withoutConfirmation');
    this.drawingDataService.clearStates();
    this.drawingDataService.title$.next('');

    const subject = new Subject<string>();
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const fileContent: string = reader.result as string;
        const drawingData: DrawingData = JSON.parse(fileContent);

        if (!drawingData.states || !Array.isArray(drawingData.states)) {
          this.showMsg('error', '1The file is invalid, he can not be loaded.');
          return;
        }

        subject.next(drawingData.title); // Émettre le titre de l'objet DrawingData

        for (const state of drawingData.states) {
          const img = new Image();
          img.onload = () => {
            this.canvasService.drawCanvas(img);
            this.drawingDataService.pushState();
          };

          img.onerror = () => {
            this.showMsg('error', 'The file is invalid, he can not be loaded.');
            subject.next('');
          };

          img.src = state;
        }
        this.showMsg('info', 'Your drawing has been loaded successfully !');
      } catch (error) {
        this.showMsg('error', 'The file is invalid, he can not be loaded.');
      }
    };

    reader.onerror = () => {
      this.showMsg('error', 'The file is invalid, he can not be loaded.');
    };

    reader.readAsText(file);

    return subject;
  }
}
