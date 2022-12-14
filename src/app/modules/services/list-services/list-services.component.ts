import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';
import { IService } from 'src/app/modele/service';
import { ServicesService } from 'src/app/services/services/services.service';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {

  services$:Observable<IService[]>=EMPTY;

  constructor(private translate: TranslateService, private router:Router, private serviceService:ServicesService) { }

  ngOnInit(): void {
    this.services$ = this.getAllServices();
  }

  private getAllServices(){
    return this.serviceService.getAllServices();
  }
}
