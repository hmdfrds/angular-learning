import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent, resolveTitle, resolveUserName } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/user.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes =
  [
    {
      path: '',
      component: NoTaskComponent,
      title: 'No task selected'
    },
    {
      path: 'users/:userId',
      component: UserTasksComponent,
      children: userRoutes,
      canMatch: [dummyCanMatch],
      resolve: {
        userName: resolveUserName
      },
      title: resolveTitle
    },
    {
      path: '**',
      component: NotFoundComponent
    }
  ]
