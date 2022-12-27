import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {
  constructor(private http : HttpClient) { }

  runData(data:any):Observable<any>{
    return this.http.post(`https://newapi-nine.vercel.app/compilecode`,data);
  }

}