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
      length: 247.5,
      centromere: 124.2,
    },
    2: {
      length: 243,
      centromere: 93.4,
    },
    3: {
      length: 199.5,
      centromere: 91.7,
    },
    4: {
      length: 191.3,
      centromere: 50.9,
    },
    5: {
      length: 180.9,
      centromere: 47.7,
    },
    6: {
      length: 171,
      centromere: 58.6,
    },
    7: {
      length: 158.8,
      centromere: 58.9,
    },
    8: {
      length: 146.3,
      centromere: 45.2,
    },
    9: {
      length: 140.3,
      centromere: 50.6,
    },
    10: {
      length: 135.4,
      centromere: 40.3,
    },
    11: {
      length: 134.5,
      centromere: 52.9,
    },
    12: {
      length: 132.4,
      centromere: 35.4,
    },
    13: {
      length: 114.4,
      centromere: 16,
    },
    14: {
      length: 106.4,
      centromere: 15.6,
    },
    15: {
      length: 100.4,
      centromere: 17,
    },
    16: {
      length: 88.8,
      centromere: 38.2,
    },
    17: {
      length: 78.8,
      centromere: 22.2,
    },
    18: {
      length: 76.1,
      centromere: 16.1,
    },
    19: {
      length: 63.8,
      centromere: 28.5,
    },
    20: {
      length: 62.4,
      centromere: 27.1,
    },
    21: {
      length: 46.9,
      centromere: 12.3,
    },
    22: {
      length: 49.7,
      centromere: 11.8,
    },
    'X': {
      length: 154.9,
      centromere: 59.4,
    },
    'Y':  {
      length: 57.7,
      centromere: 15,
    }
  }

  @Input() chromosomeNumber: any = 0;
  @Input() data: any;
  public data2: any;

  public geneElements: any = [];

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // console.log(document.getElementsByClassName('gene'));
    this.geneElements = document.getElementsByClassName('gene')
  }

  public calculateArmLength(chromosomeNumber: number | string, arm: string) {
    let length = 0

    if (arm == 'p') {
      length = (this.chromosomeData[chromosomeNumber].centromere - 20);
    } else {
      length = (this.chromosomeData[chromosomeNumber].length - this.chromosomeData[chromosomeNumber].centromere - 20);
    }

    return length
  }

  public calculatePArmEndMargin(chromosomeNumber: number | string){
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
    geneElement?.style.setProperty('background-color', this.colorGradientPicker(gene.posterior['PP.H4.abf']));
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
