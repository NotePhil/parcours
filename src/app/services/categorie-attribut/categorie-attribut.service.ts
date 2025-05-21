import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICategoriesAttributs } from 'src/app/modele/categories-attributs';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class CategorieAttributService {

  constructor(private http:HttpClient, private param: GlobalVariables) { }

  getAllCategoriesAttributs():Observable<ICategoriesAttributs[]>
  {
    return this.http.get<ICategoriesAttributs[]>(this.param.api+ 'categoriesAttributs');
  }

  getCategoriesAttributsById(id:string):Observable<ICategoriesAttributs>{
    return this.getAllCategoriesAttributs().pipe(
      map(x=>
        {
          return x.find(d=>d.id==id) as ICategoriesAttributs 
        })
    );
  }
  
  getCategoriesAttributsByNom(nom:string): Observable<ICategoriesAttributs[]> {
    return this.http.get<ICategoriesAttributs[]>(this.param.api+ 'categoriesAttributs').pipe(
      map(x=>
        {
          return x.filter(d=> d.nom.toLowerCase().startsWith(nom))
        })
    );        
  }
 
   ajouterCategoriesAttributs(categoriesAttributs:ICategoriesAttributs )
   {
     return this.http.post(this.param.api+ 'categoriesAttributs',categoriesAttributs);
   }
}
