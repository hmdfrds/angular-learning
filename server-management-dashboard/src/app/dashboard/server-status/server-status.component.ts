import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  host: {
    id: 'status'
  }
})
export class ServerStatusComponent implements OnInit {

  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline')
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    })
  }

  // private interval?: NodeJS.Timeout;

  ngOnInit(): void {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < .5) {
        this.currentStatus.set('online');
      } else if (rnd < .9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.interval);
  // }
}
