import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http : HttpClient) { }

  api:string='http://127.0.0.1:8000';
  gameNumber:any = 0;
  player:any;

  getGameNumber() {
    return this.http.get(`${this.api}/getGameNumber`);
  }

  getQuestions():Observable<any>{
    return this.http.get(`${this.api}/getQuestions`);
  }
  
  deleteQuestion(qid : any, qno:any, pname:any, qStatus:any){
    console.log("current question "+qStatus);
    return this.http.put(`${this.api}/updateQuestionStatus`,{id :qid , game : qno , playerName : pname, questionStatus : qStatus});
  }

  sendFile(uploadData:FormData){
    return this.http.post(`${this.api}/upload`, {file:uploadData});
  }
}
