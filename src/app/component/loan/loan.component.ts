import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PartnerLimit } from 'src/app/model';
import { DataService, DialogService } from 'src/app/service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  partnerLimit: PartnerLimit | null = null;
  partnerLimits$: Observable<Array<PartnerLimit>> = of([]);
  loanForm: FormGroup = this._formBuilder.group({ amount: [0] });

  get amount() { return this.loanForm.get('amount'); }

  constructor(private _dataService: DataService, private _dialogService: DialogService, private _formBuilder: FormBuilder, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reset();
    this.partnerLimits$ = this._route.paramMap.pipe(
      switchMap(params => {
        const partnerId = params.get('partnerId');
        return partnerId
          ? this._dataService.getPartnerLimitById(partnerId).pipe(
            map(limit => {
              this.partnerLimit = limit;
              this.partnerChange();
              return [limit];
            })
          )
          : this._dataService.getPartnerLimit();
      })
    );
  }

  partnerChange(): void {
    if (this.partnerLimit && this.amount) {
      this.loanForm.reset();
      const { limitLeft: { daily, monthly } } = this.partnerLimit;
      const maxLimit = daily.amount > 0 && daily.numberOfLoans > 0 && monthly.amount > 0 && monthly.numberOfLoans
        ? daily.amount : 0;
      this.amount.setValue(0);
      this.amount.setValidators([Validators.required, Validators.min(1), Validators.max(maxLimit)]);
      this.amount.updateValueAndValidity();
    } else {
      this.reset();
    }
  }

  getHighlightClass(value: number) {
    return [value ? 'bg-success' : 'bg-danger', 'text-light'];
  }

  hasError(control: AbstractControl | null): boolean {
    return !!control && !!control.errors && (control.dirty || control.touched);
  }

  reset() {
    this.partnerLimit = null;
    this.loanForm = this._formBuilder.group({ amount: [0, [Validators.required, Validators.min(0), Validators.max(0)]] });
  }

  submit(): void {
    if (!this.loanForm.valid || !this.partnerLimit || !this.partnerLimit._id) return;
    const { amount = 0 } = this.loanForm.getRawValue();
    this._dataService.pushLoanById(this.partnerLimit._id, amount).subscribe(() => {
      this.ngOnInit();
      this.reset();
      this._dialogService.showMessage('Loan Approved', 'bg-success');
    });
  }
}
