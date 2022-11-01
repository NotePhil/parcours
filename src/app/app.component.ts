import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IElementInit } from 'src/app/modele/element-init';
import { ElementInitService } from 'src/app/services/element-init/element-init.service';
import {OverlayContainer, OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 
export class AppComponent {
  title = 'Parcours client - clinique de ...';
  langues : string[] = ['en','fr','sp','de'];

  iElementInit : IElementInit = {};
  libelle = this.elementInitService.iElementInit.libelle;


  constructor(private translate: TranslateService, private overlay: OverlayContainer, private elementInitService: ElementInitService) {
    translate.addLangs(this.langues);
    translate.setDefaultLang('en'); 
    translate.use('en');
  }
  
  ngOnInit(): void {
    
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  valeurChange(event:any):void{
    this.useLanguage(event.target.value);
  }

  toggle:boolean = true;

  change(){
    this.toggle = !this.toggle;
  }
      
}
