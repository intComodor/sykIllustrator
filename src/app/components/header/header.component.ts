import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private data: DataService) { 
    
  }

  filename = new FormControl('');

  onSave() {
    let element = document.getElementById("board") as HTMLElement;

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
    this.data.changeFormat();
  }

  onZoom() {
    let element = document.querySelector('app-drawing-board') as HTMLElement;
    element.style.transform = 'scale(1.2)';
  }

}
