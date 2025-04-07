import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-letter',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  template: `
    <h2>Générer une lettre</h2>
    <form (submit)="onSubmit()">
      <input [(ngModel)]="formData.nom" name="nom" placeholder="Nom"/>
      <input [(ngModel)]="formData.date_resiliation" name="date_resiliation" placeholder="Date de résiliation"/>
      <button type="submit">Générer</button>
    </form>
    <div *ngIf="pdfUrl">
      <a [href]="pdfUrl" target="_blank">Télécharger le PDF</a>
    </div>
  `
})
export class GenerateLetterComponent {
  formData: any = {
    nom: '',
    date_resiliation: ''
  };
  pdfUrl?: string;

  constructor(private readonly http: HttpClient) {}

  onSubmit() {
    const payload = {
      templateId: 1, // à adapter selon ton backend
      formData: this.formData
    };

    this.http.post<any>('http://localhost:8080/api/generate', payload).subscribe({
      next: (res) => {
        this.pdfUrl = res.pdfUrl;
      },
      error: (err) => console.error('Erreur lors de la génération', err)
    });
  }
}
