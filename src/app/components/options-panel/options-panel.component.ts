import { Component, OnInit } from '@angular/core';
import { DrawingDataService } from 'src/app/services/drawing-data.service';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss'],
})
export class OptionsPanelComponent {
  constructor(private drawingDataService: DrawingDataService) {}
  lineWidth = this.drawingDataService.getLineWidth();
  filling = true;

  setFilling(value: boolean) {
    this.filling = value;
  }

  colors: string[] = [
    'black',
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'purple',
    'brown',
  ];

  currentColor(): string {
    return this.drawingDataService.getColor();
  }

  setColor(color: string) {
    this.drawingDataService.setColor(color);
  }

  setLineWidth(width: number) {
    this.drawingDataService.setLineWidth(width);
  }
}
