import { Injectable } from '@angular/core';
import { Tool } from 'src/app/types/tool';
import { Pencil } from 'src/app/types/pencil';
import { SquareForm } from 'src/app/types/square-form';
import { Line } from '../types/line';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  tools: Tool[] = [new Line(), new Pencil(), new SquareForm()];
  indexTool = 0;
  currentTool: Tool = this.tools[this.indexTool];

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
