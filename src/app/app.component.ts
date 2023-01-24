import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import { OrderServiceService } from './order-service.service';
import {Injectable} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export class passOn{
  public sprice:any;
    public eprice:any;
    public cat: String[]=[];
  constructor(sp:any,ep:any,arr:String[]){
    this.sprice=sp;
    this.eprice=ep;
    this.cat=arr;
  }
}
export class DataVal{
  constructor(
    public productId: number,
    public productName:String,
    public category:String,
    public price:number
  ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private ser:OrderServiceService){}
  public tinp:any
  public allItems: DataVal[]=[];
  public selects: String[]=[];
  public endrange: number=0;
  public dataToSend :any;
  public selectedItems: DataVal[]=[];
  // page: number = 1;
  // pageSize:number =7;
  totalElements: number = 0;

  // count: number = 0;
  // tableSize: number = 13;
  // onTableDataChange(event: any) {
  //   this.page = event;
  // }
  initflag:number=1;

  

  ngOnInit() {
    this.getData({ page: "0", size: "10" });
    this.initflag=1;
  }

  getData(request: { page: string; size: string; })
  {
    this.ser.getAllItems(request)
        .subscribe(data => {
            this.allItems = data['content'];
            this.totalElements = data['totalElements'];
        }
        , error => {
            console.log(error.error.message);
        }
        );
  }


  nextPage(event: PageEvent) {
    if(this.initflag==1){
    this.getData({ page: event.pageIndex.toString(), size: event.pageSize.toString() });
    }
    if(this.initflag==0){
      this.getSelectedData({page: event.pageIndex.toString(), size: event.pageSize.toString()});
    }
}

  flag: number=0;
  
  selectCat(val : any){
    this.flag=0;
    this.initflag=0;
    for(let i=0;i<this.selects.length;i++){
      if(val.target.value==this.selects[i]){
        this.selects.splice(i,1);
        this.flag=1;
      }
    }
    if(this.flag==0){
    this.selects.push(val.target.value);
    }

    this.dataToSend=new passOn(0,this.endrange,this.selects);
    this.getSelectedData({page: "0",size:"10"});
    // this.ser.getSelects(this.dataToSend).subscribe(data=>{
     
    // this.allItems.splice(0);
    //   for(let i=0;i<data.length;i++){
    //     this.allItems[i]=data[i];
    //     }
      
    // })

  }

  
  selectRange(val:any){
    this.initflag=0;
    this.endrange=val.target.value
    this.dataToSend=new passOn(0,this.endrange,this.selects);
    this.getSelectedData({page: "0",size:"10"});
  //   this.ser.getSelects(this.dataToSend).subscribe(data=>{
    
  //   this.allItems.splice(0);
  
  //     for(let i=0;i<data.length;i++){
  //       this.allItems[i]=data[i];
  //       }
    
  // })
}

getSelectedData(request: { page: string; size: string; })
{
  this.ser.getSelects(this.dataToSend,request)
      .subscribe(data => {
        this.allItems.splice(0);
          this.allItems = data['content'];
          this.totalElements = data['totalElements'];
      }
      , error => {
          console.log(error.error.message);
      }
      );
}

 newVariable: any = window.navigator;

pdfDownload(){
  this.ser.getPdf(this.dataToSend).subscribe(x=>{
    const blob= new Blob([x],{type:'application/pdf'});

    if(this.newVariable && this.newVariable.msSaveOrOpenBlob){
      this.newVariable.msSaveOrOpenBlob(blob);
    return;
    }
    const data=window.URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=data;
    link.download='items.pdf';
    link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    setTimeout(function(){
      window.URL.revokeObjectURL(data);
      link.remove();
    },100);
  });
}

excelDownload(){
  this.ser.getExcel(this.dataToSend).subscribe(x=>{
    const blob= new Blob([x],{type:'application/pdf'});

    if(this.newVariable && this.newVariable.msSaveOrOpenBlob){
      this.newVariable.msSaveOrOpenBlob(blob);
    return;
    }
    const data=window.URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=data;
    link.download='items.xlsx';
    link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    setTimeout(function(){
      window.URL.revokeObjectURL(data);
      link.remove();
    },100);
  });
}



}
