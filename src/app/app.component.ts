import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  ngOnInit(): void {
    let element = document.getElementById("app") as HTMLElement;
    html2canvas(element).then(function(canvas) {
        // Convert the canvas to blob
        canvas.toBlob(function(blob: any) {
            // To download directly on browser default 'downloads' location
            let link = document.createElement("a");
            link.download = "image.png";
            link.href = URL.createObjectURL(blob);
            link.click();

            // To save manually somewhere in file explorer
            // window.saveAs(blob, 'image.png');
            

        },'image/png');
    });

  }
  
  title = 'syk-illustrator';

  
}

