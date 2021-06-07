import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Message} from '../../../model/model.index'
import swal from 'sweetalert2'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  messageDetail:Message;
  private fileSelected :File;

  @Output() newMessage: EventEmitter<Message> = new EventEmitter();

  constructor(private apiService:ApiService) { 

    this.messageDetail = new Message();
  }

  ngOnInit(): void {
  }

  logMessage(){
    console.log( this.messageDetail);
  }

 

  saveMessage(){

    let idCreacion:number=0;

    this.apiService.create(this.messageDetail).subscribe(
      (response)=>{      
        
        swal.fire({
          icon: 'success',
          title: 'Operation Done',
          text: 'Created new message'
        });
      
        this.newMessage.emit(response);
      
      },
      error=>{
  
  
      },
      ()=>{

        this.messageDetail = new Message();     
      }
  
    );

  }

}
