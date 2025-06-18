import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';

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

  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  private destroyRef = inject(DestroyRef);

  // private interval?: NodeJS.Timeout;

  ngOnInit(): void {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < .5) {
        this.currentStatus = 'online';
      } else if (rnd < .9) {
        this.currentStatus = 'offline'
      } else {
        this.currentStatus = 'unknown'
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
