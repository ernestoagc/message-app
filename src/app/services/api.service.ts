import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, catchError} from 'rxjs/operators'
import { of, Observable, throwError } from 'rxjs';

import{Message} from '../model/model.index'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlEndPoint:string="https://messageangular.herokuapp.com/message/";
  //private urlEndPoint:string="http://localhost:8600/message/";
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
 

  constructor(private http:HttpClient) { }


  fetch():Observable<any>{
    return this.http.get(this.urlEndPoint+'findall').pipe( 
      
     map (function(response:any) {    
         console.log("response: =>");
         console.log(response);            
       return   response;
       })
   );
   }

   create(message:Message):Observable<Message>{
    return this.http.post<Message>(this.urlEndPoint+'send',message,{headers:this.httpHeaders});
  }

  upload(file:File){
    let formData= new FormData();
    formData.append("file",file);
    return this.http.post<Message>(this.urlEndPoint+'file',formData);
  }
}
