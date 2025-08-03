import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { decrement, increment, init, set } from "./counter.actions";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable()
export class CounterEffects {
  private actions$ = inject(Actions);
  private store: Store<{ counter: number }> = inject(Store);

  loadCount = createEffect(() => this.actions$.pipe(
    ofType(init),
    switchMap(() => {
      const storedCounter = localStorage.getItem("count");
      if (storedCounter) {
        return of(set({ value: +storedCounter }));
      }
      return of(set({ value: 0 }));
    })
  ))


  saveCount = createEffect(() => this.actions$.pipe(
    ofType(increment, decrement),
    withLatestFrom(this.store.select('counter')),
    tap(([action, counter]) => {
      console.log(action);
      localStorage.setItem("count", counter.toString())
    })
  ), { dispatch: false });
}
