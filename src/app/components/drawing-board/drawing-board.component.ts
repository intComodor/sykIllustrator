import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss']
})
export class DrawingBoardComponent implements OnInit {

  constructor() { }

  click: boolean = false;

  ngOnInit(): void {
  }

  onclick() {
    if (this.click) {
      this.click = false;
    }
    else {
      this.click = true;
    }
  }

}
