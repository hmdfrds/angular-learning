import { Component, DestroyRef, OnInit, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  // userName = computed(() =>
  //   this.usersService.users.find((u) => u.id === this.userId())?.name
  // );
  userName = input.required<string>();
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // const subscription = this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap) => {
    //     this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
    //   },
    // })
    //
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
};


export const resolveTitle: ResolveFn<string> = (activatedRoute, routerState) => {
  return resolveUserName(activatedRoute, routerState) + '\'s Tasts';
}
