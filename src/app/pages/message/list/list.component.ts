import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Message} from '../../../model/model.index'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  @Input()messageList:Message[];

  constructor() { }

  ngOnInit(): void {
 //   this.loadMessages();
  }

 

}
