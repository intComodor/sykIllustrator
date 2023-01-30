import { Component } from '@angular/core';
import { DrawingDataService } from 'src/app/services/drawing-data.service';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss'],
})
export class OptionsPanelComponent {
  constructor(private drawingDataService: DrawingDataService) {}
  lineWidth = 2;

  setColor(color: string) {
    this.drawingDataService.setColor(color);
  }

  setLineWidth(width: number) {
    this.drawingDataService.setLineWidth(width);
  }
}
