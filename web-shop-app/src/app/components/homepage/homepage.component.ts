import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Route, Router } from '@angular/router';
import { ServiceItem } from 'src/app/models/ServiceItem.model';
import { ShoppingChart } from 'src/app/models/ShoppingCart.model';
import { ServicesService } from 'src/app/services/services.service';
import { ShoppingChartService } from 'src/app/services/shopping-chart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  services: any[] = [];
  shoppingCart=new ShoppingChart();
  
  constructor(private servicesService: ServicesService, 
    private route: Router, private cartService: ShoppingChartService) { }

  ngOnInit(): void {
    this.getAll();
    this.loadShoppingChart();
  }

  getAll() {
    this.servicesService.getAll().subscribe(
      response =>
        this.services = response
    )
  }

  order(service: any) {
    this.cartService.addServiceToCart(service).subscribe(
      res => {
        this.shoppingCart = res
        this.successAlert("Service added to cart!");
     },
       err => {
        this.errorAlert("You have already add this service")
     
      })
      
  }

  logOut = () => {
    localStorage.clear()
    this.route.navigate(['/'])
  }

  loadShoppingChart = () => {
    this.cartService.getUserCart().subscribe(res => {
      this.shoppingCart.id = res.id,
      this.shoppingCart.amount = res.amount,
      this.shoppingCart.services = res.services;
    } )

  }
  errorAlert(message:string) {
    Swal.fire( 'Failed',message,'error')
  }
  successAlert(message:string) {
    Swal.fire( "Sucess", message,"success").then( ()=>{ 
        location.reload();});
   
  }
}
