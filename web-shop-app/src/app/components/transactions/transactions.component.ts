import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
 
showTransactions: boolean= false;
 @Input() transactions: Transaction[] = [];
 dates: String[] = [];
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getAllTransactions()
  }

  getAllTransactions(){
    this.transactionService.getAllTransactions().subscribe(res => {
      console.log(res);
      this.transactions = res;
      this.transactions.forEach((tr)=> {
        this.dates.push(tr.merchantOrderTimestamp[2] + "/" +
         tr.merchantOrderTimestamp[1] + "/" + tr.merchantOrderTimestamp[0] + " " 
         + tr.merchantOrderTimestamp[3] + ":" + tr.merchantOrderTimestamp[4] + ":" + tr.merchantOrderTimestamp[5]);})
      if(this.transactions)
        this.showTransactions = true;
      else this.showTransactions = false;
    })
  }
}
