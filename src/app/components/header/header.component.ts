import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private data: HeaderService) { 
    
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

  onClear() {
    this.data.clear();
  }

  onFullScreen() {
    this.data.setFullScreen();
  }

}
