import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ReqDetailsPage } from '../req-details/req-details.page';
import { GetInfoPage } from '../get-info/get-info.page';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};



interface ticketsData {
  name: string;
  created_dt: string;
  description: string;
  status_id:string;
  raised_by:string;
  
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage  {

  public chartOptions: Partial<ChartOptions>;
  username: any;
  type:string;
  auth_token: any;
  response: any;
  url="https://support.openwingsit.com/api/v1/";
  ticketsData:ticketsData[];
  temp: any;
  status_id: any;
  Name:string;
  cHigh:number=0;
  cLow=0;
  cMed=0;
  totalReq: any;
  newSeries=[]


 


 

  constructor(
    private storageService: StorageService,
    public menuCtrl: MenuController,
    public fcm: FcmService,
    private router: Router,
   private httpClient: HttpClient,
   private toast:ToastService,
   public modalCtlr: ModalController

  ) {
   this.bar();
   this.getAllTickets(event);
  }
  async addNewItem() {
    const modal = await this.modalCtlr.create({
      component: ReqDetailsPage,cssClass:'modal-transparent'})
    modal.onDidDismiss().then(newTask =>{
    })
    return await modal.present()
  }
  async getInfo(name,desc,status,raised_by,date) {
    const modalInfo = await this.modalCtlr.create({
      
      component:GetInfoPage,
      componentProps:{Details:{Name:name,Desc:desc,Status:status,Raised_by:raised_by,Date:date}},
     
     initialBreakpoint:0.6,
     breakpoints:[0,0.6],
      cssClass:'modal-transparent'})
      console.log(name,desc,status,raised_by,date)
    modalInfo.onDidDismiss().then(newTask =>{
    })
    return await modalInfo.present()
  }

  

  getAllTickets(event) {
    this.menuCtrl.enable(true);
    this.storageService.name().then((res) => {
      this.username = res.value;
      this.fcm.fcmInit();
    });
    console.log("username"+this.username)
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
          //this.newSeries.push(this.totalReq,2,3)

          this.count()
        },
        (error) => {
          console.log(error);
        }
      );
    });  
    setTimeout(() => {
      event.target.complete();
    }, 2000); 
    

    
  }
  count(){ 


const count = {};

for (const element of this.ticketsData) {
  if (count[element.status_id]) {
    count[element.status_id] += 1;
  } else {
    count[element.status_id] = 1;
  }
}
console.log(count[0]);
this.newSeries.push(this.totalReq,count[0],count[1],count[2])

  }
  bar(){
    this.chartOptions = {
      series: this.newSeries,
      chart: {
        height: 250,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#0077B5", "#D12323", "#FF961F", "#078843"],
      labels: ["Total", "Pending", "In progress", "Sucess"],
      legend: {
        show: true,
        floating: true,
        fontSize: "12px",
        position: "left",
        offsetX: 30,
        offsetY: -20,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 1
        }
      },
      responsive: [
        {
          breakpoint: 300,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
    
    
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



}

