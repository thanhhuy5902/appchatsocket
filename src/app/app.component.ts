import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { Observable } from 'rxjs';
import { ChatModel } from './models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private chatService: ChatService) {}

  chat$!: Observable<any>;
  messages: any[] = [];
  roomId: string = '';
  newMassage: string = '';
  userName: string = '';

  joinRoom(roomId: string) {
    if (roomId || this.userName) {
      console.log('Already joined in: ', roomId);
      this.chat$ = this.chatService.getMessagesByRoomId(roomId);
      this.chat$.subscribe((message: any) => {
        this.messages.push(message);
      });
    } else {
      console.log('Please enter username and room id');
    }
  }

  sendMessage(message: string) {
    let newMassageData: ChatModel = {
      roomId: this.roomId,
      msg: message,
      date: Date.now(),
      from: this.userName,
    };
    this.chatService.sendMessageByRoomId(newMassageData);
  }
  title = 'socket';
}
