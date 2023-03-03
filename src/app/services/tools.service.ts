import { Injectable } from '@angular/core';
import { Tool } from 'src/app/types/tool';
import { Pencil } from 'src/app/types/pencil';
import { RectForm } from 'src/app/types/rect-form';
import { Line } from '../types/line';

/**
 * Tools service.
 * This service contains the logic of changing tools.
 */
@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  /** List of available tools */
  tools: Tool[] = [new Line(), new Pencil(), new RectForm()];

  indexTool = 0;
  currentTool: Tool = this.tools[this.indexTool];

  /**
   * Change the current tool.
   * Disable the current tool, calculate the next tool and enable it.
   */
  changeTool() {
    this.currentTool?.disableTool();
    this.indexTool = (this.indexTool + 1) % this.tools.length;
    this.currentTool = this.tools[this.indexTool];
    this.currentTool.initTool();
  }

  get tool(): Tool {
    return this.currentTool;
  }
}
