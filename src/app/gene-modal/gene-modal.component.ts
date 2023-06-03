import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-gene-modal',
  templateUrl: './gene-modal.component.html',
  styleUrls: ['./gene-modal.component.css']
})
export class GeneModalComponent {

  public csvDownloadLoading: boolean = false;

  constructor(
    public modalService: ModalService,
    private exportService: ExportService,
  ) { }

  public exportGeneToCSV(){
    // Show loading spinner
    this.csvDownloadLoading = true;

    this.exportService.exportGeneToCSV(this.modalService.uuid, this.modalService.selectedGene.meta_data.gene_id).subscribe(res => {
       // Create a blob URL for the downloaded file
       const downloadUrl = URL.createObjectURL(res);
  
       // Trigger the file download
       const link = document.createElement('a');
       link.href = downloadUrl;      
       link.download = this.modalService.selectedGene.meta_data.gene_id + '_' + this.modalService.uuid + '.csv';
       link.click();
 
       // Clean up the blob URL
       URL.revokeObjectURL(downloadUrl);

       // Hide loading icon for gene
       this.csvDownloadLoading = false;
    })
  }
}
