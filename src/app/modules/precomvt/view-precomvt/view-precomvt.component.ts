import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPrecoMvt } from 'src/app/modele/precomvt';
import { IPrecoMvtQte } from 'src/app/modele/precomvtqte';
import { PrecoMvtsService } from 'src/app/services/precomvts/precomvts.service';

@Component({
  selector: 'app-view-precomvt',
  templateUrl: './view-precomvt.component.html',
  styleUrls: ['./view-precomvt.component.css']
})
export class ViewPrecomvtComponent implements OnInit {

  PrecoMvt:IPrecoMvt={
    id: '',
    libelle:'',
    type: '',
    etat:false,
    precomvtqte:[],
  }


  constructor(private router:Router, private infosPath:ActivatedRoute, private precoMvtService:PrecoMvtsService) { }

  ngOnInit(): void {
    let idPrecomvt = this.infosPath.snapshot.paramMap.get('idPrecomvt');
    console.log("idPrecomvt :" + idPrecomvt);
    if((idPrecomvt != null) && idPrecomvt!==''){
      this.precoMvtService.getPrecomvtById(idPrecomvt).subscribe(
        x =>{
          this.PrecoMvt = x;
          console.log("Voici le precomvt", this.PrecoMvt);
        });
    }
  }

}
