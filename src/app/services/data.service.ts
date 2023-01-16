import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private sendFormat = new BehaviorSubject('');
  listenFormat = this.sendFormat.asObservable();

  constructor() { }

  changeFormat() {
    this.sendFormat.next("")
  }

}