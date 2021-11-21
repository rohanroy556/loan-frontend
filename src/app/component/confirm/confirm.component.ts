import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  constructor(private _activeModal: NgbActiveModal) { }

  close(): void {
    this._activeModal.close();
  }

  dismiss(): void {
    this._activeModal.dismiss();
  }
}
