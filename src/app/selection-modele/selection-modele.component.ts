import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modele, ModeleService } from '../core/services/modele.service';

@Component({
  selector: 'app-selection-modele',
  templateUrl: './selection-modele.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./selection-modele.component.scss']
})
export class SelectionModeleComponent implements OnInit {
  modeles: Modele[] = [];

  constructor(private readonly modeleService: ModeleService, private readonly router: Router) {}

  ngOnInit(): void {
    this.modeleService.getAllModeles().subscribe((data) => {
      this.modeles = data;
    });
  }

  utiliserModele(id: number) {
    this.router.navigate(['/generate', id]);
  }
}
