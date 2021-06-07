import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Message} from '../../model/model.index'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

  messageList:Message[];
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.loadMessages();
  }


  saveSuccess(message: Message) {
    console.log("from the emit");
    console.log(message);
    this.loadMessages();
  }

  loadMessages(){
    this.apiService.fetch().subscribe(

      response =>{
        this.messageList=response;
      }

    )
  }
}
