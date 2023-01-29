import { Component, OnInit } from '@angular/core';
import { ServiceItem } from 'src/app/interfaces/ServiceItem.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingChart: ServiceItem[] = [];
  showItems= false;

  constructor() {}

  ngOnInit(): void {
    this.addItems()
    this.loadShoppingChart()
  }

  addItems = () => {
    this.shoppingChart.push(new ServiceItem(1, "proizvod", 500))
    this.shoppingChart.push(new ServiceItem(1, "proizvod2", 500))
    this.shoppingChart.push(new ServiceItem(1, "proizvod3", 500))
    console.log(this.shoppingChart[0])
  }

  loadShoppingChart = () => {
    if (this.shoppingChart.length == 0) {
      this.showItems = false;
    }
    else {
      this.showItems = true;
    }
  }

  deleteItem = (id: number) => {

  }
}
