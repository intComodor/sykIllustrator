import { Component } from '@angular/core';
import { DrawingDataService } from 'src/app/services/drawing-data.service';

/**
 * Options panel component.
 * This component contains the logic of changing the tools options.
 */
@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss'],
})
export class OptionsPanelComponent {
  constructor(private drawingDataService: DrawingDataService) {}

  /** Get the current line width with the drawing data service */
  lineWidth = this.drawingDataService.getLineWidth();
  /** Get the current filling state with the drawing data service */
  filling = this.drawingDataService.isFill();

  setFilling(value: boolean) {
    this.drawingDataService.setFill(value);
  }

  /** List of available colors */
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
