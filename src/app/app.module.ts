import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { ToolsPanelComponent } from './components/tools-panel/tools-panel.component';
import { OptionsPanelComponent } from './components/options-panel/options-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawingBoardComponent,
    ToolsPanelComponent,
    OptionsPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
