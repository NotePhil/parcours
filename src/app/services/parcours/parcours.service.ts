import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParcours } from 'src/app/modele/parcours';
import { IEtape } from 'src/app/modele/etape';
import { GlobalVariables } from 'src/globalVariables';

@Injectable({
  providedIn: 'root',
})
export class ParcoursService {
  constructor(private http: HttpClient, private param: GlobalVariables) {}

  getAllParcours(): Observable<IParcours[]> {
    return this.http.get<IParcours[]>(this.param.api+ 'parcours').pipe(map((x) => x));
  }

  getParcoursById(id: string): Observable<IParcours> {
    return this.getAllParcours().pipe(
      map((x) => {
        return x.find((p) => p.id == id) as IParcours;
      })
    );
  }

  getParcoursBylibelle(libelle: string): Observable<IParcours[]> {
    return this.http.get<IParcours[]>(this.param.api+ 'parcours').pipe(
      map((x) => {
        return x.filter((p) => p.libelle.toLowerCase().startsWith(libelle));
      })
    );
  }

  ajouterParcours(parcours: IParcours) {
    return this.http.post(this.param.api+ 'parcours', parcours);
  }
  getEtapesByParcoursId(parcoursId: string): Observable<IEtape[]> {
    return this.http
      .get<IEtape[]>(this.param.api+ 'parcours/${parcoursId}/etapes')
      .pipe(map((x) => x));
  }
}
