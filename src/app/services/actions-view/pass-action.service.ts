import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IElements } from 'src/app/modele/elements';

@Injectable({
  providedIn: 'root'
})
export class PassActionService {

  private langueDataSubject = new BehaviorSubject<string>(localStorage.getItem('langue') || 'fr');
  langueData$: Observable<string> = this.langueDataSubject.asObservable();

  private actionsSubject = new BehaviorSubject<IElements[]>(this.getInitialActions());
  actions$: Observable<IElements[]> = this.actionsSubject.asObservable();

  constructor() { }

  private getInitialActions(): IElements[] {
    const data = localStorage.getItem('actions');
    console.log("PassActionService - Initialisation depuis le localStorage. Data brute :", data);
    try {
      if (data && data !== 'undefined' && data !== 'null') {
        const parsed = JSON.parse(data);
        console.log("PassActionService - Data parsée proprement :", parsed);
        return parsed;
      }
    } catch (e) {
      console.error("PassActionService - Erreur de parsing :", e);
    }
    console.warn("PassActionService - Fallback : retour d'un tableau vide []");
    return [];
  }

  updateLangueData(langue: string) {
    this.langueDataSubject.next(langue);
    localStorage.setItem('langue', langue);
  }

  setActions(actions: IElements[]) {
    console.log("PassActionService - setActions appelé avec :", actions);
    if (actions) {
      localStorage.setItem('actions', JSON.stringify(actions));
      this.actionsSubject.next(actions);
    } else {
      localStorage.setItem('actions', '[]');
      this.actionsSubject.next([]);
    }
  }

  getActions(): Observable<IElements[]> {
    console.log("PassActionService - getActions() appelé. Retourne le BehaviorSubject.");
    return this.actions$;
  }
}
