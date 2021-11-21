import { Component } from '@angular/core';
import { Message } from 'src/app/model';
import { DialogService } from 'src/app/service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  constructor(public dialogService: DialogService) {}

  remove(message: Message) {
    console.log(message);
    this.dialogService.messages = this.dialogService.messages.filter(m => m !== message);
  }
}
