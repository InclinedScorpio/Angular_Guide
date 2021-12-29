import { Component } from '@angular/core';
import { AccountService } from '../service/account.service';
import { LoggingService } from '../service/logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent {
  constructor(private accountService: AccountService) {
    this.accountService.statusEmitter.subscribe((status)=>console.log("Subscribe result: ", status))
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.onAccountAdded({
      name: accountName,
      status: accountStatus
    })
  }
}
