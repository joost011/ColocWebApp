import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('canvas', { read: ElementRef }) canvas!: ElementRef<HTMLCanvasElement>;

  public data2: any;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.draw();

    if (this.data.length > 10) {
      this.data2 = this.data.splice(10, this.data.length);
    }

  }


  public drawGene(gene: any) {
    let bandHeight = this.getLocation(gene);
    let color = 'yellow';
    let offset = 25;
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx!.beginPath();
    ctx!.rect(135, bandHeight + offset, 30, 3);
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();
  }

  public resetCanvas() {
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx!.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.draw();
  }

  private getLocation(gene: any) {
    let geneCenter = gene.location.start_position + ((gene.location.stop_position - gene.location.start_position) / 2)
    return geneCenter / 1000000;
  }

  private draw() {
    let centromeHeight = this.chromosomeData[this.chromosomeNumber]['centromere']
    let totalHeight = this.chromosomeData[this.chromosomeNumber]['length']
    let color = '#AAAAAA';
    let ctx = this.canvas.nativeElement.getContext('2d');
    let offset = 25;

    ctx!.beginPath();
    ctx!.arc(150, offset, 15, 0, 2 * Math.PI);
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();

    ctx!.beginPath();
    ctx!.arc(150, totalHeight + offset, 15, 0, 2 * Math.PI);
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();

    ctx!.beginPath();
    ctx!.rect(135, offset, 30, centromeHeight - offset + 1);
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();

    ctx!.beginPath();
    ctx!.rect(135, centromeHeight + (offset * 2) - 5, 30, totalHeight - centromeHeight - 25);
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();

    let height = 25 * Math.cos(Math.PI / 6);

    ctx!.beginPath();
    ctx!.moveTo(135, centromeHeight + (offset * 2 - 5));
    ctx!.lineTo(165, centromeHeight + (offset * 2 - 5));
    ctx!.lineTo(150, centromeHeight + offset);
    ctx!.closePath();
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();

    ctx!.beginPath();
    ctx!.moveTo(135, (height + centromeHeight) - offset + 5);
    ctx!.lineTo(165, (height + centromeHeight) - offset + 5);
    ctx!.lineTo(150, centromeHeight + offset - 5);
    ctx!.closePath();
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();

    ctx!.beginPath();
    ctx!.arc(150, centromeHeight + offset, 8, 0, 2 * Math.PI);
    ctx!.strokeStyle = color;
    ctx!.stroke();
    ctx!.fillStyle = color;
    ctx!.fill();
  }


  public openGeneModal(gene: any) {
    this.modalService.openGeneModal(gene);
  }
}
