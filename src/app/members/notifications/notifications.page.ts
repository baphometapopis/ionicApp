

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
interface apiData {
  title: string;
  created_dt: string;
  content: string;
  status:string}





@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage  {
  notificationData:apiData[];
  notify: any;
  page:number=1
  url="https://support.openwingsit.com/api/v1/";
  auth_token: any;
  class: string;

  constructor(
    private httpClient: HttpClient,
    private storageService:StorageService
  ){   
  this.notification(event);
  }

 notification(event) { 
 
    this.storageService.getString("session_token").then((res)=>{      
    this.auth_token = res.value

      let header = new HttpHeaders({
        "Accept":'application/json',
        'Content-Type':'application/json',
        'Authorization': this.auth_token
      }); 
      let options = { headers: header }
      let deviceData = {  
        req: {
          "page":this.page,
          "numRecs":20
      }
      }
       this.httpClient.post(this.url+"getNotifications", deviceData ,options).subscribe((res) => {
        this.notify=res;        
        this.notificationData=this.notify.data
         })
      })
    
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  getColor(status)
  {
      switch (status) {
        
        case "FAILED":
          return "FAILED"
        case "PENDING":
          return "PENDING"
         
        case "SENT":
          return "SENT"
          
        default:
          return "CANCELED" 
    }
   
 
}
getc(status)
{
    switch (status) {
      
      case "FAILED":
        return "F"
      case "PENDING":
        return "P"
       
      case "SENT":
        return "S"
        
      default:
        return "C" 
  }
}
}

  
  
