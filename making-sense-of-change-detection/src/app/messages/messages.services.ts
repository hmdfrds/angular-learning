import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private message = signal<string[]>([])
  allMessages = this.message.asReadonly();

  addMessage(message: string) {
    this.message.update((oldMessage) => [...oldMessage, message]);
  }
}
