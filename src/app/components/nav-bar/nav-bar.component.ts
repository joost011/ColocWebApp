import { Component } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  public menuItems: MenuItem[] = [
    {
      label: 'Home',
      path: 'home',
    },
    {
      label: 'Analysis',
      path: 'analysis',
    },
    {
      label: 'FAQ',
      path: 'faq',
    },
  ];

  constructor(
    public mainService: MainService,
  ) { }

}
