import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-get-info',
  templateUrl: './get-info.page.html',
  styleUrls: ['./get-info.page.scss'],
})
export class GetInfoPage implements OnInit {
  @Input() Details;

  url="https://support.openwingsit.com/api/v1/";
  taskName:string;
  taskDesc:string;
  taskPriority:any;
  auth_token: any;
  data: any;
  constructor(
    public modalCtlr: ModalController,  
    ){}

  ngOnInit()
  {} 
  
   getTickets()
   {this.dismis()}
  async dismis(){
    await this.modalCtlr.dismiss()
  }

}