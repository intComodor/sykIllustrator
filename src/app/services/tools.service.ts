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
  /** Map of available tools */
  tools: Map<string, Tool> = new Map<string, Tool>([
    ['Line', new Line()],
    ['Pencil', new Pencil()],
    ['RectForm', new RectForm()],
  ]);

  defaultTool = 'Pencil';
  currentTool: Tool | undefined = this.tools.get(this.defaultTool);

  /**
   * Change the current tool.
   * Disable the current tool, calculate the next tool and enable it.
   */
  changeTool(nextTool: string) {
    if (!this.currentTool) throw new Error('No current tool');
    this.currentTool.disableTool();

    this.currentTool = this.tools.get(nextTool);

    if (!this.currentTool) throw new Error('No current tool');
    this.currentTool.initTool();
  }

  get tool(): Tool {
    if (!this.currentTool) throw new Error('No current tool');
    return this.currentTool;
  }
}
