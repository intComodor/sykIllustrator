import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HeaderService {
  private sendFormat = new Subject();
  private sendClearBoard = new Subject();
  private sendFullScreen = new Subject();

  listenFormat = this.sendFormat.asObservable();
  listenClear = this.sendClearBoard.asObservable();
  listenFullScreen = this.sendFullScreen.asObservable();

  changeFormat() {
    this.sendFormat.next('');
  }

  clear() {
    this.sendClearBoard.next('');
  }

  setFullScreen() {
    this.sendFullScreen.next('');
  }
}
