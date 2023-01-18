import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataService {

  private sendFormat = new Subject();
  listenFormat = this.sendFormat.asObservable();

  constructor() { }

  changeFormat() {
    this.sendFormat.next("")
  }

}