import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { ToolsPanelComponent } from './components/tools-panel/tools-panel.component';
import { OptionsPanelComponent } from './components/options-panel/options-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './services/header.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DrawingDataService } from './services/drawing-data.service';
import { MouseEventService } from './services/mouse-event.service';

@NgModule({
  declarations: [
    AppComponent,
    DrawingBoardComponent,
    ToolsPanelComponent,
    OptionsPanelComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DrawingDataService,
    HeaderService,
    MouseEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
