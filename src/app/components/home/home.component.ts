import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileUploadRes } from 'src/app/interfaces/file-upload-res';
import { ColocService } from 'src/app/services/coloc.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  public file = null
  public form = new FormGroup({
    referenceGenome: new FormControl(''),
    file: new FormControl(''),
  });

  constructor(
    private fileService: FileService,
    private colocService: ColocService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      
  }

  public onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
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

        if(res['file_name']){
          this.form.controls['file'].setValue(res['file_name']);
          this.submit();
        }
              
      })
    );
  }

  private submit(){        
    this.subscriptions.push(
      this.colocService.post(this.form.value).subscribe(res => {
        console.log(res);
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
