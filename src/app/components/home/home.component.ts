import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColocAnalysis, ColocAnalysisStatus } from 'src/app/interfaces/coloc-analysis';
import { FileUploadRes } from 'src/app/interfaces/file-upload-res';
import { ColocService } from 'src/app/services/coloc.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  private subscriptions: Subscription[] = []
  public file = null
  public form = new FormGroup({
    file: new FormControl(''),
    referenceGenome: new FormControl('grch37'),
    type: new FormControl('cc'),
    numCases: new FormControl(''),
    numControls: new FormControl(''),
    sampleSize: new FormControl(''),
  });
  public submitted: boolean = false;
  public colocObject: any;
  public colocStatusList: ColocAnalysisStatus[] = [];
  public ticket: string = '';
  public inputTicket: string = '';
  public polling: boolean = false;
  public lastStatusOrder: number = 0;

  constructor(
    private fileService: FileService,
    private colocService: ColocService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  /**
* Sets file in class on file select event
*
* @param {any} event - File select event
*/
  public onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    } else {
      this.file = null;
    }
  }


  /**
 * Initializes the submission of the form
 */
  public onSubmit() {
    // Return if no file was uploaded
    if (!this.file) {
      return;
    }

    this.uploadFile(this.file)
  }


  /**
 * Uploads a GWAS file to the API
 *
 * @param {File} file - File to be uploaded
 */
  private uploadFile(file: File) {
    let formData = new FormData();
    formData.append('file', file)

    this.subscriptions.push(
      this.fileService.store(formData).subscribe((res: FileUploadRes) => {

        // If the response contains a property file_name, start polling for the status
        if (res['file_name']) {
          this.submitted = true;
          this.ticket = res['file_name'].split('.')[0];
          this.form.controls['file'].setValue(res['file_name']);
          this.polling = true;
          this.startPolling(res['file_name']);
          this.submit();
        }

      })
    );
  }


  /**
 * Removes file stored in class
 */
  public removeFile() {
    this.file = null;
  }


  /**
   * Initializes polling for analysis process status
   *
   * @param {string} fileName - Ticket
   */
  public startPolling(fileName: string) {
    this.polling = true;
    this.polStatus(fileName);
  }


  /**
   * Recursively requests the server for the status of an analysis process
   *
   * @param {string} fileName - Ticket
   */
  private polStatus(fileName: string) {
    if (this.polling) {
      setTimeout(() => {
        let uuid = fileName.split('.')[0]
        this.subscriptions.push(
          this.colocService.getStatus(uuid).subscribe((res: ColocAnalysis) => {
            this.colocObject = res;

            this.updateColocStatusList(res.status_list);

            if (this.colocObject.finished) {
              this.stopPolling();
              this.router.navigateByUrl('result/' + uuid);
            }
          })
        );

        this.polStatus(fileName)
      }, 500)
    }
  }


  /**
   * Stops the polling of the process status
   */
  private stopPolling() {
    this.polling = false;
  }


  /**
   * Updates the statuslist shown after analysis process is started
   *
   * @param {ColocAnalysisStatus[]} statusList - Updated status list
   */
  private updateColocStatusList(statusList: ColocAnalysisStatus[]) {
    for (let newStatusObject of statusList) {
      let objectToUpdate = this.colocStatusList.find((obj) => obj.status_order == newStatusObject.status_order);

      if (objectToUpdate) {
        objectToUpdate.status_message = newStatusObject.status_message;
      } else {
        this.colocStatusList.push(newStatusObject);
      }
    }

    this.lastStatusOrder = this.colocStatusList.reduce((max, obj) => (obj.status_order > max.status_order ? obj : max)).status_order;
    this.cdr.detectChanges();
  }


  /**
   * Copies the ticket to the clipboard
   */
  public copyTicket() {
    navigator.clipboard.writeText(this.ticket)
  }


  /**
   * Requests the server for the status of an analysis process
   *
   * @param {string} fileName - Ticket
   */
  public getStatus(fileName: string) {
    this.submitted = true;
    let uuid = fileName.split('.')[0];

    this.subscriptions.push(
      this.colocService.getStatus(uuid).subscribe((res: ColocAnalysis) => {
        this.colocObject = res;
        this.ticket = res['uuid']

        // If the finished property of the response is true, stop polling and navigate to result page
        if (this.colocObject['finished']) {
          this.polling = false;
          this.router.navigateByUrl('result/' + uuid);
        } else {
          // Else, resume polling
          this.polling = true;
          this.polStatus(this.colocObject['uuid']);
        }
      })
    );
  }

  /**
   * Submits the form to the API
   */
  private submit() {
    this.subscriptions.push(
      this.colocService.post(this.form.value).subscribe(res => {
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe on all subscriptions to free some memory
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }



}
