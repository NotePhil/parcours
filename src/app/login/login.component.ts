import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentifications/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  returnUrl: string | undefined;
  error: string | undefined;
  forme: FormGroup;
  submitted: boolean | undefined;

  constructor(private authService: AuthentificationService, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute){
    this.forme = this.formBuilder.group({
      mail: [
        '',
        [
          Validators.required,
        ],
      ],
      pwd: [
        '',
        [
          Validators.required,
        ],
      ]
    });
  }
  /** URL de la page d'accueil par défaut après connexion */
  private readonly defaultHomeUrl = '/parcours/accueil';

  ngOnInit() {
    // Redirige directement vers la page d'accueil si l'utilisateur est déjà connecté
    if (this.authService.currentUserValue) {
      this.router.navigate([this.defaultHomeUrl]);
    } else {
      // Récupère l'URL demandée avant connexion, ou bascule sur la page d'accueil
      const requestedUrl = this.route.snapshot.queryParams['returnUrl'];
      this.returnUrl =
        requestedUrl && requestedUrl !== '/' && requestedUrl !== '/parcours'
          ? requestedUrl
          : this.defaultHomeUrl;
    }
  }

  get f() {
    return this.forme.controls;
  }

  login() {
    this.submitted = true;
    if (this.forme.invalid) return;
    
    this.authService.login(this.forme.value.mail, this.forme.value.pwd)
    .subscribe(
        res => {
          console.log("response :", res);
          
          // Redirige vers l'URL cible ou la page d'accueil après authentification réussie
          this.router.navigateByUrl(this.returnUrl || this.defaultHomeUrl);
        },
        error => {
          this.error = error;
          console.log("error :", error);
          
        });
  }

}
