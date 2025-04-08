import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SafePipe } from '../core/pipes/safe.pipe';
import { Modele, ModeleService } from '../core/services/modele.service';

@Component({
  selector: 'app-generate-lettre',
  templateUrl: './generate-lettre.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    SafePipe
  ],
  styleUrls: ['./generate-lettre.component.scss']
})
export class GenerateLettreComponent implements OnInit {
  modele?: Modele;
  form = new FormGroup({});
  variables: string[] = [];
  pdfUrl: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly modeleService: ModeleService,
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.modeleService.getTemplateById(id).subscribe((modele) => {
      console.log(modele)
      this.modele = modele;
      this.variables = this.extractVariables(modele.contentTemplate);
      this.buildForm(this.variables);
    });
  }

  extractVariables(template: string): string[] {
    const regex = /\${(.*?)}/g;
    const matches = [...template.matchAll(regex)];
    return matches.map(m => m[1].trim());
  }

  buildForm(vars: string[]): void {
    const group: any = {};
    vars.forEach(variable => {
      group[variable] = new FormControl('');
    });
    this.form = new FormGroup(group);
  }

  onSubmit(): void {
    const payload = {
      templateId: this.modele?.id,
      formData: this.form.value
    };

    this.http.post('http://localhost:8080/api/generate', payload, {
      responseType: 'blob'
    }).subscribe((pdfBlob) => {
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      console.log(blob)
      this.pdfUrl = URL.createObjectURL(blob);  // 👈 Assignation locale
    });
  }
}
