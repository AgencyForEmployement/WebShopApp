import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material';
import { Route, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  services: any[] = [];
  panelOpenState = false;
  constructor(private servicesService: ServicesService, private route: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.servicesService.getAll().subscribe(
      response =>
        this.services = response
    )
  }

  order(service: string, price: number) {
    document.cookie = 'price =' + price.toString()
    document.cookie = 'description =' + service
    window.open('http://localhost:4200/', "_blank"); //psp front za metodu placanja

  }
  logOut = () => {
    localStorage.clear()
    this.route.navigate(['/'])
  } 
}
