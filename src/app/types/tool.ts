import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from '../services/canvas.service';
import { DrawingDataService } from '../services/drawing-data.service';
import { MouseEventService } from '../services/mouse-event.service';

export abstract class Tool {
  name: string;
  icon: string;
  canvasService: CanvasService;
  mouseEventService: MouseEventService;
  drawingDataService: DrawingDataService;
  eventsSubscription: Subscription[] = [];

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;

    this.canvasService = inject(CanvasService);
    this.mouseEventService = inject(MouseEventService);
    this.drawingDataService = inject(DrawingDataService);
  }

  abstract initTool(): void;

  abstract draw({
    x1,
    y1,
    x2,
    y2,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }): void;

  disableTool(): void {
    this.eventsSubscription.forEach(subscription => subscription.unsubscribe());
  }
}
