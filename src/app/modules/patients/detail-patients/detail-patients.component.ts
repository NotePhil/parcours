import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/services/patients/patients.service';

@Component({
  selector: 'app-detail-patients',
  templateUrl: './detail-patients.component.html',
  styleUrls: ['./detail-patients.component.css'],
})
export class DetailPatientsComponent implements OnInit {
  patientId!: string;
  patient: any;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.patientId = params['idPatient'];
      this.getDetailPatients();
    });
  }
  getDetailPatients() {
    this.patientService.getPatientById(this.patientId).subscribe((data) => {
      this.patient = data;
    });
  }
}
