import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
interface ticketsData {
  name: string;
  created_dt: string;
  description: string;
  status_id:string;
  raised_by:string;
  
}



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  username: any;
  type:string;
   auth_token: any;
   response: any;
   url="https://support.openwingsit.com/api/v1/";
   ticketsData:ticketsData[];
   notificationData: any;
   segId='All';
   temp: any;
   status_id: any;
   Name:string;
   cHigh=0;
   cLow=0;
   cMed=0;
   totalReq: any;
 

  constructor(
    private storageService: StorageService,
    public menuCtrl: MenuController,
    private router: Router,
   private httpClient: HttpClient,
   private toast:ToastService,
   public modalCtlr: ModalController
  ) { }

  ngOnInit() {
    this.getAllTickets();
  }
  getAllTickets() {
    this.storageService.getString('session_token').then((res) => {
      this.auth_token = res.value;
  
      let header = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.auth_token,
      });
  
      let options = { headers: header };
      let ticketData = {
        "req": [
            {"name": ""}
        ]    };
      this.httpClient.post(this.url + 'getTickets', ticketData, options).subscribe(
        (res) => {
          this.response = res;
        this.ticketsData=this.response.data
        this.temp=this.response.data
        this.status_id=this.temp.status_id
        this.totalReq=this.response.count
          console.log(JSON.stringify(res));
          console.log("total"+this.totalReq);
  
        },
        (error) => {
          console.log(error);
        }
      );
    });   
  }
  count(){
  
  for (let elem of this.ticketsData) {
  if (elem.status_id=="0") 
    {this.cHigh += 1;}
  else if (elem.status_id=="1")
     {this.cMed+=1;}
  else if(elem.status_id=="2")
    {this.cLow+=1;}
  
  
  }console.log(this.cHigh)
  console.log(this.cMed)
  console.log(this.cLow)
  
  
  
  }
}



