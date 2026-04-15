import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
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
    return data ? JSON.parse(data) : [];
  }

  updateLangueData(langue: string) {
    this.langueDataSubject.next(langue);
    localStorage.setItem('langue', langue);
  }

  setActions(actions: IElements[]) {
    localStorage.setItem('actions', JSON.stringify(actions));
    this.actionsSubject.next(actions);
  }

  getActions(): Observable<IElements[]> {
    return this.actions$;
  }
}
