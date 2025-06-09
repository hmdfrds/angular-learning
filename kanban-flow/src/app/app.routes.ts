import { Routes } from '@angular/router';
import { Board } from './board/components/board/board';

export const routes: Routes = [
    {
        path: '',
        component: Board
    },
    {
        path: '**',
        redirectTo: '',
    }
];
