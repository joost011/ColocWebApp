import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent {

  @Input() data: any | null = null;
  @Input() xLabel: string = '';
  @Input() yLabel: string = '';
  @Input() type: string = '';
  @Input() height: number = 0;
  @Input() width: number = 0;
  public plot: any | null = null;

  ngOnChanges(changes: SimpleChanges) {
    // Check for data changes
    if ('data' in changes) {
      this.data = changes['data'].currentValue;
    }

    // Check for yLabel changes
    if ('xLabel' in changes) {
      this.xLabel = changes['xLabel'].currentValue;
    }

    // Check for xLabel changes
    if ('yLabel' in changes) {
      this.yLabel = changes['yLabel'].currentValue;
    }

    this.drawPlot();
  }

  ngOnInit(): void {
    this.drawPlot();
  }

  private sortSnipsAndPValues(snips: string[], pValues: number[]) {
    let combined = snips.map((val, index) => ({ val1: val, val2: pValues[index] }));
    combined.sort((a, b) => a.val1.localeCompare(b.val1));
    let sortedSnips = combined.map((obj) => obj.val1);
    let sortedPValues = combined.map((obj) => obj.val2);
    return {
      snips: sortedSnips,
      pValues: sortedPValues,
    }
  }

  private drawPlot() {
    let x: any;
    let y: any;
    let snips: any;

    if (this.type == 'eqtl') {
      x = this.data.SNPPos
      snips = this.data.snp;
      y = this.data.logp
    }

    if (this.type == 'gwas') {
      x = this.data.base_pair_location;
      snips = this.data.snp;
      y = this.data.logp;
    }

    if (this.type == 'combined') {
      x = this.sortSnipsAndPValues(this.data.gwas.snp, this.data.gwas.logp)['pValues'];
      y = this.sortSnipsAndPValues(this.data.eqtls.snp, this.data.eqtls.logp)['pValues'];
      snips = this.sortSnipsAndPValues(this.data.gwas.snp, this.data.gwas.logp)['snips'];
    }

    this.plot = {
      data: [
        {
          x: x,
          y: y,
          mode: 'markers',
          text: snips,
          marker: {
            size: 7,
            opacity: 0.8,
          },
          hoverinfo: 'text',
        },
      ],
      layout: {
        height: this.height,
        width: this.width,
        xaxis: {
          showgrid: false,
          linecolor: 'lightgrey',
          linewidth: 1,
          mirror: true,
          title: {
            text: this.xLabel,
            font: {
              family: 'sans-serif',
              size: 15,
            }
          },
        },
        yaxis: {
          showgrid: false,
          linecolor: 'lightgrey',
          linewidth: 1,
          mirror: true,
          title: {
            text: this.yLabel,
            font: {
              family: 'sans-serif',
              size: 15,
            }
          },
        },
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
          pad: 4
        },
      },

    }
  }

}
