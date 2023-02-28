import { Injectable } from '@angular/core';
import {
  fromEvent,
  merge,
  mergeMap,
  Observable,
  scan,
  share,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MouseEventService {
  public mousedown$(canvas: HTMLCanvasElement): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(canvas, 'mousedown').pipe(share());
  }

  public mousemove$(canvas: HTMLCanvasElement): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(canvas, 'mousemove').pipe(share());
  }

  public mouseup$: Observable<MouseEvent> = fromEvent<MouseEvent>(
    window,
    'mouseup'
  ).pipe(share());

  public mousedrag$(canvas: HTMLCanvasElement): Observable<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }> {
    return this.mousedown$(canvas).pipe(
      mergeMap(downEvent =>
        this.mousemove$(canvas).pipe(
          takeUntil(merge(this.mouseup$, fromEvent(canvas, 'mouseleave'))),
          scan(
            (lastPosition, moveEvent) => ({
              x1: lastPosition.x2,
              y1: lastPosition.y2,
              x2: moveEvent.offsetX,
              y2: moveEvent.offsetY,
            }),
            {
              x1: downEvent.offsetX,
              y1: downEvent.offsetY,
              x2: downEvent.offsetX,
              y2: downEvent.offsetY,
            }
          )
        )
      )
    );
  }

  // let mousedrag$: Observable<{
  //   x1: number;
  //   y1: number;
  //   x2: number;
  //   y2: number;
  // }> = mousedown$.pipe(
  //   mergeMap(downEvent => {
  //     let lasPosition = { x: downEvent.offsetX, y: downEvent.offsetY };
  //     return mousemove$.pipe(
  //       takeUntil(mouseup$),
  //       map(moveEvent => {
  //         let res = {
  //           x1: lasPosition.x,
  //           y1: lasPosition.y,
  //           x2: moveEvent.offsetX,
  //           y2: moveEvent.offsetY,
  //         };
  //         lasPosition = { x: moveEvent.offsetX, y: moveEvent.offsetY };
  //         return res;
  //       })
  //     );
  //   })
  // );
}
