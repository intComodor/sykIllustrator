import { Component } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';

/**
 * Tools panel component.
 * This component contains the logic of changing the tools.
 */
@Component({
  selector: 'app-tools-panel',
  templateUrl: './tools-panel.component.html',
  styleUrls: ['./tools-panel.component.scss'],
})
export class ToolsPanelComponent {
  constructor(private toolsService: ToolsService) {}

  changeTool(nextTool: string) {
    this.toolsService.changeTool(nextTool);
  }

  currentTool(): string {
    return this.toolsService.tool.name;
  }
}
