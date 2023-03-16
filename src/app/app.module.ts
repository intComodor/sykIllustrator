import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { ToolsPanelComponent } from './components/tools-panel/tools-panel.component';
import { OptionsPanelComponent } from './components/options-panel/options-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrawingDataService } from './services/drawing-data.service';
import { MouseEventService } from './services/mouse-event.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxColorsModule } from 'ngx-colors';

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
    FormsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    NgxColorsModule,
  ],
  providers: [DrawingDataService, MouseEventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
