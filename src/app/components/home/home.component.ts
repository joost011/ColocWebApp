import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColocAnalysis } from 'src/app/interfaces/coloc-analysis';
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
  public ticket: string = '';
  public inputTicket: string = '';
  public polling: boolean = false;


  constructor(
    private fileService: FileService,
    private colocService: ColocService,
    private router: Router,
  ) { }

  public onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    } else {
      this.file = null;
    }
  }

  public onSubmit() {
    if (!this.file) {
      return;
    }

    this.uploadFile(this.file)
  }

  private uploadFile(file: File) {
    let formData = new FormData();
    formData.append('file', file)

    this.subscriptions.push(
      this.fileService.store(formData).subscribe((res: FileUploadRes) => {

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

  public removeFile() {
    this.file = null;
  }

  public changeRadio() {
    console.log('change');

  }

  public startPolling(fileName: string) {
    this.polling = true;
    this.polStatus(fileName);
  }

  private polStatus(fileName: string) {
    if (this.polling) {
      setTimeout(() => {
        let uuid = fileName.split('.')[0]
        this.subscriptions.push(
          this.colocService.getStatus(uuid).subscribe((res: ColocAnalysis) => {
            this.colocObject = res;

            if (this.colocObject['finished']) {
              this.stopPolling();
              this.router.navigateByUrl('coloc/' + uuid);
            }
          })
        );

        this.polStatus(fileName)
      }, 500)
    }
  }

  private stopPolling() {
    this.polling = false;
  }

  public getStatus(fileName: string) {
    this.submitted = true;
    let uuid = fileName.split('.')[0];

    this.subscriptions.push(
      this.colocService.getStatus(uuid).subscribe((res: ColocAnalysis) => {
        this.colocObject = res;
        this.ticket = res['uuid']

        if (this.colocObject['finished']) {
          this.router.navigateByUrl('result/' + uuid);
        } else {
          this.polling = true;
          this.polStatus(this.colocObject['uuid']);
        }
      })
    );
  }

  private submit() {
    this.subscriptions.push(
      this.colocService.post(this.form.value).subscribe(res => {
        this.stopPolling();
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
