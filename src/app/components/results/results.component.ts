import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { ModalService } from 'src/app/services/modal.service';
import { ColocService } from 'src/app/services/coloc.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  @ViewChild('geneModal', { read: ElementRef }) geneModal!: ElementRef;
  public data: any | null = null;
  private subscriptions: Subscription[] = [];
  public loading: boolean = true;

  public chromosomeGenes: any = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    18: [],
    19: [],
    20: [],
    21: [],
    22: [],
  };


  public selectedGene: any;
  public uuid: string = '';

  constructor(
    public modalService: ModalService,
    private colocService: ColocService,
    private route: ActivatedRoute,
    public mainService: MainService,
  ) { }

  ngOnInit() {
    this.mainService.loading = true;
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;

    this.subscriptions.push(
      this.colocService.getResult(this.uuid).subscribe(res => {
        console.log(res);
        this.data = res;

        for (const key in this.data['genes']) {
          const gene = this.data['genes'][key];
          let chromosome = gene['meta_data']['chromosome']

          if (chromosome in this.chromosomeGenes) {
            this.chromosomeGenes[chromosome].push(gene)
          } else {
            this.chromosomeGenes[chromosome] = [gene]
          }

          this.mainService.loading = false;
        }
      })
    );

  }

  ngAfterViewInit(): void {
    this.modalService.geneModal = this.geneModal;
  }

  ngOnDestroy(): void {
    // Unsubscribe on all subscriptions to free some memory
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
