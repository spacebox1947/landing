import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs';

export interface Command {
  id: number;
  // type can only be 3 diffrnt strings
  type: 'success' | 'error' | 'clear';
  // ?: implies text is optional
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() { 
    // messagesInput uses a Subject to get data into the pipeline
    this.messagesInput = new Subject<Command>();
    // grab the observable from messageInput's pipe
    // messageOutput can be subscribed to, and always has the latest state of messageInput
    this.messagesOutput = this.messagesInput.pipe(
      // conventionally: scan((acc, value))
      scan((messages: Command[], command: Command) => {
        if (command.type === 'clear') {
          return messages.filter(message => message.id !== command.id);
        } 
        else {
          return [...messages, command];
        }
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'success'
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'error'
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear'
    });
  }

  private randomId(): number {
    return Math.round(Math.random() * 10000)
  }
}

