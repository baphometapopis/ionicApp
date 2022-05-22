import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IfStmt } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.page.html',
  styleUrls: ['./req-details.page.scss'],
})
export class ReqDetailsPage implements OnInit {
  url="https://support.openwingsit.com/api/v1/";
  taskName:string;
  taskDesc:string;
  taskPriority:any;
  auth_token: any;
  data: any;
  constructor(
    public modalCtlr: ModalController,
    private storageService:StorageService,
    private httpClient: HttpClient,
    private toast:ToastService
    ){}

  ngOnInit()
  {} 
  
   addTickets(){     
    console.log("priority"+this.taskPriority)  
    this.storageService.getString("session_token").then((res)=>{      
      this.auth_token = res.value  
        let header = new HttpHeaders({
          "Accept":'application/json',
          'Content-Type':'application/json',
          'Authorization': this.auth_token
        }); 
        let options = { headers: header }
        let deviceData ={
          req:{
              name:this.taskName,
              description:this.taskDesc,
              priority:this.taskPriority
          }}
         this.httpClient.post(this.url+"addTicket", deviceData ,options).subscribe((res) => {
          this.data=res;
          if(this.data.status=="success")
          {
            this.toast.presentToast("Task added Sucessfully")
            this.dismis()
          } else
          {this.toast.presentToast("Task Not Added")}
          console.log(this.data)
           })
        })  

    this.dismis()
  }
  async dismis(){
    await this.modalCtlr.dismiss()
  }

}