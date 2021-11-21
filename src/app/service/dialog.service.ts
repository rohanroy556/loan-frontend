import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { PartnerModalComponent } from '../component';
import { ConfirmComponent } from '../component/confirm/confirm.component';
import { Message, Partner } from '../model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  messages: Array<Message> = [];

  constructor(private _modalService: NgbModal) { }

  partnerModalOpen(partner?: Partner) {
    const partnerModalRef = this._modalService.open(PartnerModalComponent, { backdrop: 'static', size: 'lg' });
    (partnerModalRef.componentInstance as PartnerModalComponent).partner = partner;
    return from(partnerModalRef.result);
  }
  
  confirmDialog() {
    return from(this._modalService.open(ConfirmComponent, { backdrop: 'static' }).result);
  }

  showMessage(text: string, className: string) {
    this.messages.push({ text, className });
  }
}
