import { Injectable } from '@angular/core';
import { Gene } from '../interfaces/gene';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public geneModal: any;
  public selectedGene: any;
  public uuid: string = '';
  public errorModal: any;
  public error: any = {
    code: null,
    message: '',
  }

  constructor() { }

  /**
   * Opens the gene modal with a certain gene
   *
   * @param {Gene} gene - Gene object to be displayed
   */
  public openGeneModal(gene: Gene) {
    this.selectedGene = gene;
    this.geneModal.nativeElement.setAttribute('style', 'display: block;')
  }

  /**
   * Closes the gene modal
   */
  public closeGeneModal() {
    this.geneModal.nativeElement.setAttribute('style', 'display: none;')
  }

  /**
   * Opens the error modal
   */
  public openErrorModal() {
    this.errorModal.nativeElement.setAttribute('style', 'display: block;')
  }

  /**
   * Closes the error modal
   */
  public closeErrorModal() {
    this.errorModal.nativeElement.setAttribute('style', 'display: none;')
  }
}
