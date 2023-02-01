import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ShoppingChart } from 'src/app/models/ShoppingCart.model';
import { Transaction } from 'src/app/models/Transaction.model';
import { ShoppingChartService } from 'src/app/services/shopping-chart.service';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() shoppingCart: ShoppingChart = new ShoppingChart();
  showItems!: boolean;
  transactionList: Transaction[] = []

  constructor(private shoppingChartService: ShoppingChartService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadShoppingChart()
  }

  loadShoppingChart = () => {
    this.shoppingChartService.getUserCart().subscribe(res => {
      this.shoppingCart.id = res.id,
        this.shoppingCart.amount = res.amount,
        this.shoppingCart.services = res.services;
      if (this.shoppingCart.services.length > 0) {
        this.showItems = true;
      }
      else {
        this.showItems = false;
      }
    })
  }

  deleteItem = (id: number) => {
    this.shoppingChartService.removeServiceFromCart(id).subscribe(res => {
      this.shoppingCart = res;
      if (this.shoppingCart.services = []) this.showItems = false;
    })
  }
  errorAlert(message: string) {
    Swal.fire('Failed', message, 'error'
    )
  }
  successfullAlert(message: string) {
    Swal.fire('Successfull', message, 'success'
    )
  }
  createOrder = () => {
    this.transactionService.createTransaction().subscribe(res => {
      document.cookie = 'price =' + res.amount.toString()
      document.cookie = 'description = PAYMENT',
      document.cookie = 'pib = ' + environment.PIB,
      document.cookie = 'merchantOrderId = ' + res.merchantOrderId.toString(),
      document.cookie = 'merchantOrderTimestamp = ' + res.merchantOrderTimestamp.toString(),
      console.log(document.cookie)
      this.showItems = false;
      window.open('http://localhost:4200/', "_blank"); //psp front za metodu placanja
      this.transactionService.getAllTransactions().subscribe(res => this.transactionList = res)
    },
      err => {
        this.errorAlert("Something went wrong... You can't order right now, try again later")
      })

  }
}
