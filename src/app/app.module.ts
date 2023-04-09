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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnakeBarComponent } from './components/snake-bar/snake-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    DrawingBoardComponent,
    ToolsPanelComponent,
    OptionsPanelComponent,
    HeaderComponent,
    SnakeBarComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    NgxColorsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatMenuModule,
  ],
  providers: [DrawingDataService, MouseEventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
