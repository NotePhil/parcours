import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDocEtats } from "src/app/modele/doc-etats";
import { IExemplaireDocument } from 'src/app/modele/exemplaire-document';

@Injectable({
  providedIn: 'root'
})
export class ExemplaireDocumentService {

  constructor(private http:HttpClient) { }

  getAllExemplaireDocuments():Observable<IExemplaireDocument[]>
  {
    return this.http.get<IExemplaireDocument[]>('api/exemplaires');
  }

  getExemplaireDocumentById(id:string):Observable<IExemplaireDocument>{
    return this.getAllExemplaireDocuments().pipe(
      map(x=>
        {
          return x.find(d=>d.id==id) as IExemplaireDocument 
        })
    );
  }

  getExemplaireDocumentByOrder(exemplaire:IExemplaireDocument){
    let res : boolean;
    let i = null;
    let docEtat! : IDocEtats;
    
    docEtat = exemplaire.DocEtats[0];
    for (let index = 0; index < exemplaire.DocEtats.length; index++) {
      if (exemplaire.DocEtats[index].ordre > docEtat.ordre) {
        docEtat = exemplaire.DocEtats[index];
        i = index;
      }  
    console.log(index);
    }

    
    if (docEtat.validation != undefined) {
      res = true;   
    } else {
      res = false;
    }

    return {ele: docEtat, sol: res, in: i};
  }
  
  getExemplaireDocumentByTitre(titre:string): Observable<IExemplaireDocument[]> {
    return this.http.get<IExemplaireDocument[]>('api/exemplaires').pipe(
      map(x=>
        {
          return x.filter(e=> e.titre.toLowerCase().startsWith(titre))
        })
    );        
  }

   ajouterExemplaireDocument(exemplaire:IExemplaireDocument )
   {
     return this.http.post("api/exemplaires",exemplaire);
   }
}
