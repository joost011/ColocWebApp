import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public geneModal: any;
  public selectedGene: any;
  public errorModal: any;
  public error: any = {
    code: null,
    message: '',
  }

  constructor() { }

  public openGeneModal(gene: any) {
    this.selectedGene = gene;
    this.geneModal.nativeElement.setAttribute('style', 'display: block;')
  }

  public closeGeneModal() {
    this.geneModal.nativeElement.setAttribute('style', 'display: none;')
  }

  public openErrorModal() {
    this.errorModal.nativeElement.setAttribute('style', 'display: block;')
  }

  public closeErrorModal() {
    this.errorModal.nativeElement.setAttribute('style', 'display: none;')
  }
}
