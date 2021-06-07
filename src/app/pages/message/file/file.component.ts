import { Component, OnInit ,Output, EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Message} from '../../../model/model.index'
import swal from 'sweetalert2'
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html'
  
})
export class FileComponent implements OnInit {

  
  private fileSelected :File;

  @ViewChild('fileElement') userPhoto: ElementRef;

  @Output() newMessage: EventEmitter<Message> = new EventEmitter();

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  uploadFile(){
    this.apiService.upload(this.fileSelected).subscribe(
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

        this.fileSelected = null;    
        this.userPhoto.nativeElement.value = null;
      }
      
      
      );
  }
  
  changeFile(event){
    this.fileSelected = event.target.files[0];
    console.log( this.fileSelected);
  }

}
