import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    public mainService: MainService,
  ) {}

}
