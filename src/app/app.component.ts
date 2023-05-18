import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ColocWebApp';

  @ViewChild('errorModal', { read: ElementRef }) errorModal!: ElementRef;

  constructor(
    private modalService: ModalService,
  ) {}

  ngAfterViewInit(): void {
    this.modalService.errorModal = this.errorModal;
  }
}
