import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public geneModal: any;
  public selectedGene: any;

  constructor() { }

  public openGeneModal(gene: any) {
    this.selectedGene = gene;    
    this.geneModal.nativeElement.setAttribute('style', 'display: block;')
  }

  public closeGeneModal() {
    this.geneModal.nativeElement.setAttribute('style', 'display: none;')
  }
}
