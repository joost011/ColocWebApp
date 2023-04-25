import { Component } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  public data: any | null = null;

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




  constructor(private location: Location) { }




  ngOnInit() {

    this.loading = true;
    this.data = this.location.getState();

    for (const key in this.data) {

      const gene = this.data[key];



      if (key != 'navigationId') {

        let chromosome = gene['location']['chromosome']

        if (chromosome in this.chromosomeGenes) {

          this.chromosomeGenes[chromosome].push(gene)

        } else {

          this.chromosomeGenes[chromosome] = [gene]

        }

      }


      this.loading = false;




    }

  }

}
