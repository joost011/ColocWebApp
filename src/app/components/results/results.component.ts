import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ColocService } from 'src/app/services/coloc.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { Result } from 'src/app/interfaces/result';
import { Gene } from 'src/app/interfaces/gene';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  @ViewChild('geneModal', { read: ElementRef }) geneModal!: ElementRef;
  public data: Result | null = null;
  private subscriptions: Subscription[] = [];
  public loading: boolean = true;
  public selectedView: string = 'chromosome';
  public csvAllExportLoading: boolean = false;
  public csvGenesExportLoading: string[] = [];
  public dtOptions: DataTables.Settings = {};

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
    'X': [],
    'Y': [],
  };

  public selectedGene: any;
  public uuid: string = '';

  constructor(
    public modalService: ModalService,
    private colocService: ColocService,
    private route: ActivatedRoute,
    public mainService: MainService,
    private exportService: ExportService,
  ) { }

  ngOnInit() {
    this.mainService.loading = true;
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;

    // Get result
    this.subscriptions.push(
      this.colocService.getResult(this.uuid).subscribe(res => {
        this.data = res;
        let genes: Gene[] = [];

        // Add gene ID to gene object
        for (const key in this.data['genes']) {
          let gene: Gene = this.data.genes[key];
          gene.meta_data.gene_id = key;
          genes.push(gene);
        }

        this.data.genes = genes;

        // Separate genes by chromosome
        for (let gene of this.data.genes) {
          let chromosome: number = gene.meta_data.chromosome;

          if (chromosome in this.chromosomeGenes) {
            this.chromosomeGenes[chromosome].push(gene);
          } else {
            this.chromosomeGenes[chromosome] = [gene];
          }
          this.setDataTableSettings();
          this.mainService.loading = false;
        }
      })
    );

  }

  ngAfterViewInit(): void {
    this.modalService.geneModal = this.geneModal;
    this.modalService.uuid = this.uuid;
  }

  /**
   * Sets the settings of the sortable data table
   */
  private setDataTableSettings() {
    this.dtOptions = {
      columnDefs: [
        { orderable: true, targets: [0, 1, 2, 3, 4] },
        { orderable: false, targets: '_all' },
      ],
      pagingType: 'full_numbers',
      dom: 'f',
      lengthMenu: [[-1], ['All']],
      order: [[4, 'desc']],
      orderClasses: true,
    }
  }

  /**
   * Moves the chromosome view/list view tab
   *
   * @param {HTMLElement} tabContainer - The HTML element containing the tabs
   * @param {HTMLElement} chromosomeTab - The HTML element containing the chromosome tab
   * @param {HTMLElement} listTab - The HTML element containing the list tab
   * @param {HTMLElement} activeTab - The HTML element containing the active tab
   */
  public moveTab(tabContainer: HTMLElement, chromosomeTab: HTMLElement, listTab: HTMLElement, activeTab: HTMLElement) {

    if (activeTab == chromosomeTab && chromosomeTab.classList.contains('active')) {
      return;
    }

    if (activeTab == listTab && listTab.classList.contains('active')) {
      return;
    }

    this.selectedView = activeTab.getAttribute('id')!;

    let direction = activeTab.getAttribute('direction');
    tabContainer.classList.remove('left', 'right');
    tabContainer.classList.add(direction!);
    chromosomeTab.classList.remove('active');
    listTab.classList.remove('active');
    activeTab.classList.add('active');
  }


  /**
     * Requests the CSV export for all genes
     */
  public exportAllToCSV() {
    // Show loading icon
    this.csvAllExportLoading = true;

    this.subscriptions.push(
      this.exportService.exportAllToCSV(this.uuid).subscribe(res => {
        // Create a blob URL for the downloaded file
        const downloadUrl = URL.createObjectURL(res);

        // Trigger the file download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = this.uuid + '.csv';
        link.click();

        // Clean up the blob URL
        URL.revokeObjectURL(downloadUrl);

        // Hide loading icon
        this.csvAllExportLoading = false;
      })
    );
  }

  /**
     * Requests the CSV export for a single gene
     * 
     * @param {string} gene - Gene ID of the gene that needs to be exported
     */
  public exportGeneToCSV(gene: string) {
    // Show loading icon for gene
    this.csvGenesExportLoading.push(gene);

    this.subscriptions.push(
      this.exportService.exportGeneToCSV(this.uuid, gene).subscribe(res => {
        // Create a blob URL for the downloaded file
        const downloadUrl = URL.createObjectURL(res);

        // Trigger the file download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = gene + '_' + this.uuid + '.csv';
        link.click();

        // Clean up the blob URL
        URL.revokeObjectURL(downloadUrl);

        // Hide loading icon for gene
        this.csvGenesExportLoading = this.csvGenesExportLoading.filter(item => item !== gene);
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe on all subscriptions to free some memory
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
