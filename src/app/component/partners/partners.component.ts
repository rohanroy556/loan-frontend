import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Partner } from 'src/app/model';
import { DataService, DialogService } from 'src/app/service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  partners$ = this._dataService.get();

  constructor(private _dataService: DataService, private _dialogService: DialogService) {}

  ngOnInit(): void {}

  partnerModalOpen(partner?: Partner) {
    this._dialogService.partnerModalOpen(partner).subscribe({
      next: () => (this.partners$ = this._dataService.get(), this._dialogService.showMessage('Save was successful!', 'bg-success')),
      error: () => this._dialogService.showMessage('Save was unsuccessful!', 'bg-danger')
    });
  }

  partnerDelete(partner: Partner) {
    this._dialogService.confirmDialog().pipe(
      switchMap(() => partner._id ? this._dataService.delete(partner._id) : throwError(false))
    ).subscribe({
      next: () => (this.partners$ = this._dataService.get(), this._dialogService.showMessage('Delete was successful!', 'bg-success')),
      error: () => this._dialogService.showMessage('Delete was unsuccessful!', 'bg-danger')
    });
  }
}
