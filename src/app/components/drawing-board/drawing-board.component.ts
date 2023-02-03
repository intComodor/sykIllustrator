import { HeaderService } from 'src/app/services/header.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CanvasService } from 'src/app/services/canvas.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss'],
})
export class DrawingBoardComponent implements AfterViewInit {
  @ViewChild('board', { static: true }) _canvas: ElementRef | undefined;

  isFullScreen = false;

  constructor(
    private headerService: HeaderService,
    private canvasService: CanvasService,
    private toolsService: ToolsService
  ) {
    this.headerService.listenFormat.subscribe(_ => {
      this.canvasService.changeFormat();
    });

    this.headerService.listenClear.subscribe(_ => {
      this.canvasService.clear();
    });

    this.headerService.listenFullScreen.subscribe(_ => {
      this.isFullScreen = true;
      this.canvasService.resize();
    });
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.toolsService.tool.initTool();
  }

  changeTool() {
    this.toolsService.changeTool();
  }

  initCanvas() {
    if (!this._canvas) throw new Error('Canvas Element is not defined');
    this.canvasService.canvas = this._canvas.nativeElement as HTMLCanvasElement;
    this.canvasService.canvasCtx = this.canvasService.canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    this.canvasService.resize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.canvasService.resize();
  }

  @HostListener('mousedown', ['$event.target'])
  onClick() {
    this.isFullScreen = false;
    this.canvasService.resize();
  }
}
