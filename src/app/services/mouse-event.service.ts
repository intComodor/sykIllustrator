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

/**
 * Mouse event service.
 * This service contains the observables of the mouse events.
 * These observables are used by tools to define her behavior.
 */
@Injectable({
  providedIn: 'root',
})
export class MouseEventService {
  /**
   * Observable for the mouse down event by fromEvent operator.
   * @param canvas the element to listen to the event.
   * @returns an observable of the mouse down event on the canvas element.
   */
  public mousedown$(canvas: HTMLCanvasElement): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(canvas, 'mousedown').pipe(share());
  }

  /**
   * Observable for the mouse move event by fromEvent operator.
   * @param canvas the element to listen to the event.
   * @returns an observable of the mouse move event on the canvas element.
   */
  public mousemove$(canvas: HTMLCanvasElement): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(canvas, 'mousemove').pipe(share());
  }

  /**
   * Observable for the mouse up event by fromEvent operator.
   * @returns an observable of the mouse up event on the window element.
   */
  public mouseup$: Observable<MouseEvent> = fromEvent<MouseEvent>(
    window,
    'mouseup'
  ).pipe(share());

  /**
   * Observable for the mouse drag event created by mousedown, mousemove and mouseup observables.
   * @param canvas the element to listen to the event.
   * @returns an observable of the mouse drag event on the canvas element.
   * The event contains the coordinates of each position of the mouse during the drag.
   */
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
}
