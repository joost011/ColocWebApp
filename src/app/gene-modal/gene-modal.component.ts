import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-gene-modal',
  templateUrl: './gene-modal.component.html',
  styleUrls: ['./gene-modal.component.css']
})
export class GeneModalComponent {

  constructor(
    public modalService: ModalService,
  ) { }

}
