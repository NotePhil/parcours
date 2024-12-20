import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRessource } from 'src/app/modele/ressource';

@Injectable({
  providedIn: 'root',
})
export class RessourcesService {
  constructor(private http: HttpClient) {}

  getAllRessources(): Observable<IRessource[]> {
    return this.http.get<IRessource[]>('api/ressource').pipe(map((x) => x));
  }

  getRessourceById(id: string): Observable<IRessource> {
    return this.getAllRessources().pipe(
      map((x) => {
        return x.find((p) => p.id == id) as IRessource;
      })
    );
  }

  getRessourcesByLibelle(libelle: string): Observable<IRessource[]> {
    return this.http.get<IRessource[]>('api/ressource').pipe(
      map((x) => {
        return x.filter((p) => p.libelle.toLowerCase().startsWith(libelle));
      })
    );
  }

  getRessourcesFinds(libelleRessource?: string, libelleFamilly?: string, min?: number, max?: number, prixnimnim?: number, prixmaxim?: number): Observable<IRessource[]> {
    const params: any = {};
    if (libelleRessource) params.libelleRessource = libelleRessource;
    if (libelleFamilly) params.libelleFamilly = libelleFamilly;
    if (prixnimnim !== undefined) params.prixnimnim = prixnimnim;
    if (prixmaxim !== undefined) params.prixmaxim = prixmaxim;
    if (min !== undefined) params.min = min;
    if (max !== undefined) params.max = max;

    console.log('service elements :', libelleRessource, libelleFamilly, min, max, prixnimnim, prixmaxim);

    return this.http.get<IRessource[]>('api/ressource').pipe(
      map((resources) => {
        
        return resources.filter(
          (p) =>
            {
              // Vérifie les conditions des filtres
              const matchLibelleRessource = libelleRessource
                ? p.libelle.toLowerCase().startsWith(libelleRessource.toLowerCase())
                : true;
      
              const matchLibelleFamilly = libelleFamilly
                ? p.famille.libelle.toLowerCase().startsWith(libelleFamilly.toLowerCase())
                : true;
      
              const matchMin = min !== undefined ? p.quantite >= min : true;
              const matchMax = max !== undefined ? p.quantite <= max : true;
      
              // Retourne `true` si tous les filtres correspondent
              return matchLibelleRessource && matchLibelleFamilly && matchMin && matchMax;
            }
        );
      })
    );
  } 

  getRessourcesFamilleByLibelle(libelle: string): Observable<IRessource[]> {
    return this.http.get<IRessource[]>('api/ressource').pipe(
      map((x) => {
        return x.filter((p) => p.famille.libelle.toLowerCase().startsWith(libelle));
      })
    );
  }

  getRessourcesByScanBarCodeorLibelle(query: string): Observable<IRessource[]> {
    return this.http.get<IRessource[]>('api/ressource').pipe(
      map((resources) => {
        const lowerCaseQuery = query.toLowerCase();

        // Filter by ID or name
        return resources.filter(
          (p) =>
            p.libelle.toLowerCase().startsWith(query.toLowerCase()) ||
            p.scanBarCode.toLowerCase().startsWith(lowerCaseQuery)
        );
      })
    );
  }

  ajouterRessource(ressource: IRessource) {
    return this.http.post('api/ressource', ressource);
  }
}
