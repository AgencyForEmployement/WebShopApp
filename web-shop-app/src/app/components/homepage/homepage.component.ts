import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  services : any[] = [];

  constructor(private servicesService : ServicesService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.servicesService.getAll().subscribe(
      response =>
        this.services = response
    )
  }

  order(service:string, price:number) {
    document.cookie = 'price =' + price.toString()
    document.cookie = 'description =' + service
    window.open('http://localhost:4200/', "_blank");
    
  }

}
