import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NEVER, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Partner } from 'src/app/model';
import { DataService } from 'src/app/service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {
  partner$!: Observable<Partner>;

  constructor(private _dataService: DataService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.partner$ = this._route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return id ? this._dataService.getById(id) : NEVER;
      })
    );
  }
}
