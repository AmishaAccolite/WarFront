import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DataVal, passOn } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http:HttpClient) { }

  public getAllItems(request:any) : Observable<any>{
    const params = {page:request.page, size:request.size};
    return this.http.get('http://localhost:8081/showallitems',{params:params,responseType:'json'})
  }
  public getSelects(val: passOn,request:any) :Observable<any>{
    const params = {page:request.page, size:request.size};
    return this.http.post('http://localhost:8081/showitems',val,{params:params,responseType:'json'})
}
public getPdf(val:passOn) : Observable<Blob>{
  return this.http.post('http://localhost:8081/exportPdf',val,{responseType:'blob'})
}
public getExcel(val:passOn) : Observable<Blob>{
  return this.http.post('http://localhost:8081/exportExcel',val,{responseType:'blob'})
}
}
