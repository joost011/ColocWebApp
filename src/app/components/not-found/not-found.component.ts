import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  /**
   * Navigates to the previous page
   */
  public navigateToPreviousPage() {
    this.location.back();
  }

  /**
   * Navigates to the home page
   */
  public navigateToHomePage() {
    this.router.navigateByUrl('home');
  }
}
