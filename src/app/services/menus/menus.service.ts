import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMenus } from 'src/app/modele/menus';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private http:HttpClient, private param: GlobalVariables) { }

  getMenu():Observable<IMenus[]>
  {
    return this.http.get<IMenus[]>(this.param.api+ 'menus').pipe(map(x=>x));
  }

  getMenuByUserAndLangue(login:string, langue:string):Observable<IMenus>{
    return this.getMenu().pipe(
      map(x=>
        {
          return x.find(p=>p.idUser==login && p.langue==langue) as IMenus
        })
    );
  }

  ajouterMenu(menu:IMenus)
  {
    return this.http.post(this.param.api+ 'menus',menu);
  }

}
