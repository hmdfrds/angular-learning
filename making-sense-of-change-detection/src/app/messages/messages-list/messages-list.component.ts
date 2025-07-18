import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { MessagesService } from '../messages.services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  private messageService = inject(MessagesService);
  messages = this.messageService.allMessages;


  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
