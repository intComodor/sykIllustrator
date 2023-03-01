import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-tools-panel',
  templateUrl: './tools-panel.component.html',
  styleUrls: ['./tools-panel.component.scss'],
})
export class ToolsPanelComponent {
  constructor(private toolsService: ToolsService) {}

  changeTool() {
    this.toolsService.changeTool();
  }
}
