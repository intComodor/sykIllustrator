import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

  private formatsBoard: string[] = ["16/9", "4/3", "1/1", "21/9", "32/9"];
  private indexFormatBoard: number = 0;

  filename = new FormControl('');


  onSave() {
    let element = document.getElementById("title") as HTMLElement;

    html2canvas(element).then((canvas) => {
        // Convert the canvas to blob
        canvas.title = (this.filename.value || 'untitled') + ".png";
        canvas.toBlob(function(blob: any) {
            // To download directly on browser default 'downloads' location
            let link = document.createElement("a");
            link.download = canvas.title;
            link.href = URL.createObjectURL(blob);
            link.click();

        }, 'image/png');
    });
  }

  onChangeFormat() {
    let element = document.querySelector('app-drawing-board') as HTMLElement;
    let element2 = document.getElementById('board') as HTMLElement;

    this.indexFormatBoard = (this.indexFormatBoard + 1) % this.formatsBoard.length;

    element.style.aspectRatio = this.formatsBoard[this.indexFormatBoard];
    element2.style.aspectRatio = this.formatsBoard[this.indexFormatBoard];
  }

  onZoom() {
    let element = document.querySelector('app-drawing-board') as HTMLElement;
    element.style.transform = 'scale(1.2)';
  }

}
