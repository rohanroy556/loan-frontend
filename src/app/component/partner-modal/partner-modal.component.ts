import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Partner } from 'src/app/model';
import { DataService } from 'src/app/service';

@Component({
  selector: 'app-partner-modal',
  templateUrl: './partner-modal.component.html',
  styleUrls: ['./partner-modal.component.scss']
})
export class PartnerModalComponent implements OnInit {
  @Input() partner?: Partner;

  partnerForm: FormGroup = this._formBuilder.group({});

  get name() { return this.partnerForm.get('name'); }
  get limit() {
    return {
      daily: {
        amount: this.partnerForm.get('limit.daily.amount'),
        numberOfLoans: this.partnerForm.get('limit.daily.numberOfLoans')
      },
      monthly: {
        amount: this.partnerForm.get('limit.monthly.amount'),
        numberOfLoans: this.partnerForm.get('limit.monthly.numberOfLoans')
      }
    }
  }

  constructor(private _activeModal: NgbActiveModal, private _formBuilder: FormBuilder, private _dataService: DataService) {}

  ngOnInit(): void {
    this.partnerForm = this._formBuilder.group({
      _id: [{ value: this.partner?._id, disabled: true }],
      name: [this.partner?.name || '' , [Validators.required]],
      limit: this._formBuilder.group({
        daily: this._formBuilder.group({
          amount: [this.partner?.limit.daily.amount || 0, [Validators.required]],
          numberOfLoans: [this.partner?.limit.daily.numberOfLoans || 0, [Validators.required]]
        }),
        monthly: this._formBuilder.group({
          amount: [this.partner?.limit.monthly.amount || 0, [Validators.required]],
          numberOfLoans: [this.partner?.limit.monthly.numberOfLoans || 0, [Validators.required]]
        })
      }),
      loans: [{ value: this.partner?.loans || [], disabled: true }, [Validators.required]]
    });
  }

  hasError(control: AbstractControl | null): boolean {
    return !!control && !!control.errors && (control.dirty || control.touched);
  }

  submit(): void {
    console.log(this.partner, this.partnerForm, this.partnerForm.getRawValue());
    if (!this.partnerForm.valid) return;
    const partner = this.partnerForm.getRawValue();
    const save$ = partner && partner._id ? this._dataService.update(partner) : this._dataService.create(partner);
    save$.subscribe(() => this._activeModal.close());
  }

  dismiss(): void {
    this._activeModal.dismiss();
  }
}
