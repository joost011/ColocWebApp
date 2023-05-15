import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-chromosome',
  templateUrl: './chromosome.component.html',
  styleUrls: ['./chromosome.component.css']
})
export class ChromosomeComponent implements OnInit, AfterViewInit {

  constructor(
    public modalService: ModalService,
  ) { }

  public chromosomeData: any = {
    1: {
      length: 249,
      centromere: 121,
    },
    2: {
      length: 243,
      centromere: 92,
    },
    3: {
      length: 198,
      centromere: 90,
    },
    4: {
      length: 191,
      centromere: 50,
    },
    5: {
      length: 181,
      centromere: 84,
    },
    6: {
      length: 171,
      centromere: 58.6,
    },
    7: {
      length: 159,
      centromere: 61,
    },
    8: {
      length: 146,
      centromere: 45,
    },
    9: {
      length: 141,
      centromere: 49,
    },
    10: {
      length: 135,
      centromere: 40,
    },
    11: {
      length: 135,
      centromere: 53,
    },
    12: {
      length: 133,
      centromere: 35,
    },
    13: {
      length: 114,
      centromere: 18,
    },
    14: {
      length: 106,
      centromere: 22,
    },
    15: {
      length: 101,
      centromere: 37,
    },
    16: {
      length: 90,
      centromere: 33,
    },
    17: {
      length: 83,
      centromere: 24,
    },
    18: {
      length: 80,
      centromere: 17,
    },
    19: {
      length: 59,
      centromere: 26,
    },
    20: {
      length: 63,
      centromere: 28,
    },
    21: {
      length: 48,
      centromere: 14,
    },
    22: {
      length: 50,
      centromere: 16,
    },
  }

  @Input() chromosomeNumber: number = 0;
  @Input() data: any;
  public data2: any;

  public geneElements: any = [];

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // console.log(document.getElementsByClassName('gene'));
    this.geneElements = document.getElementsByClassName('gene')
  }

  public calculateArmLength(chromosomeNumber: number, arm: string) {
    let length = 0

    if (arm == 'p') {
      length = (this.chromosomeData[chromosomeNumber].centromere - 20);
    } else {
      length = (this.chromosomeData[chromosomeNumber].length - this.chromosomeData[chromosomeNumber].centromere - 20);
    }

    return length
  }

  public calculatePArmEndMargin(chromosomeNumber: number){
    if (this.calculateArmLength(chromosomeNumber, 'p') < 0){
      return -35;
    } else {
      return -20;
    }
  }

  public calculateGenePosition(gene: any){
    let geneCenter = gene.meta_data.start_position + ((gene.meta_data.stop_position - gene.meta_data.start_position) / 2);
    return geneCenter / 1000000;
  }

  public highlightGene(gene: any){
    let geneElement: HTMLElement | null = document.getElementById(gene.meta_data.gene_name);
    geneElement?.style.setProperty('background-color', '#3872C9');
    geneElement?.style.setProperty('z-index', '999');
  }

  public removeHighlightedGene(gene: any){
    let geneElement: HTMLElement | null = document.getElementById(gene.meta_data.gene_name);
    geneElement?.style.setProperty('background-color', '#525051');
    geneElement?.style.setProperty('z-index', '1');
  }

  public openGeneModal(gene: any) {
    this.modalService.openGeneModal(gene);
  }

  private RGBValueToHex(c: any) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  public colorGradientPicker(weight: number) {
    let lowerRange = [255, 255, 255];
    let upperRange = [2, 115, 186];
    var w1 = weight;
    var w2 = (1 - w1) * 2;
    var rgb = [
      Math.round(upperRange[0] * w1 + lowerRange[0] * w2),
      Math.round(upperRange[1] * w1 + lowerRange[1] * w2),
      Math.round(upperRange[2] * w1 + lowerRange[2] * w2)];
    return "#" + this.RGBValueToHex(rgb[0]) + this.RGBValueToHex(rgb[1]) + this.RGBValueToHex(rgb[2]);
  }

}
