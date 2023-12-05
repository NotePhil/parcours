import { Injectable } from '@angular/core';
import { IObjetDates } from 'src/app/modele/objet-dates';

@Injectable({
  providedIn: 'root'
})
export class VerificationsdatesrolesService {

  constructor() { }

  /**
   * Methode qui permet de comparer deux intervalles de dates en utilisant un objet éphemaire et de valider un
   * enregistrement fictif si les intervalles ne se chevauchent pas
   * @param ancienneDate objet déjà existant dans le système
   * @param nouvelleDate objet que l'on veut enregistrer dans le système
   * @returns 
   */
  OncheckedDatesRoles(ancienneDate : IObjetDates, nouvelleDate: IObjetDates){

    let result: any;

    // si l'objet existant ou le nouvel objet n'a pas de date de fin
    if (ancienneDate.dateFin == undefined || nouvelleDate.dateFin == undefined) {

      // si la date de debut du nouvel objet commence après celle de l'objet existant
      if (ancienneDate.dateDebut < nouvelleDate.dateDebut) {
        result = {verif: true, textError: "OK"}
      }
      else return
    }
    else if (ancienneDate.dateDebut > ancienneDate.dateFin || nouvelleDate.dateDebut > nouvelleDate.dateFin) {
        result = {verif: false, textError: "La date de fin ne peut pas etre plus petite que la date de debut"}
    }
    else if (ancienneDate.dateDebut > nouvelleDate.dateDebut) { // si la date de debut du nouvel objet commence avant celle de l'objet existant
 
      // si la date de fin du nouvel objet se termine avant la date de debut de l'ancien objet
      if (nouvelleDate.dateFin < ancienneDate.dateDebut) {
        result = "la nouvelle date se termine avant le debut de l'ancienne"
      }else{ // si la date de fin du nouvel objet se termine après la date de debut de l'ancien objet
        result = "la nouvelle date doit se terminer avant le debut de l'ancienne"
      }       
    }else if (ancienneDate.dateDebut < nouvelleDate.dateDebut) { // si la date de debut du nouvel objet commence après celle de l'objet existant
      
      // si la date de debut du nouvel objet commence après la date de fin de l'objet existant
      if (ancienneDate.dateFin < nouvelleDate.dateDebut) {
        result = "la nouvelle date commence apres la date de fin de l'ancienne"
      }
      else{ // si la date de fin du nouvel objet se termine après celle de l'objet existant
        result = "la nouvelle date doit commencer apres la date de fin de l'ancienne"
      }
    }else {
      result = 'La date de début ne peut pas être vide'
    }

    return result
  }
}
