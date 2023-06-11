import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';
import { ChromosomeComponent } from './components/chromosome/chromosome.component';
import { ScatterPlotComponent } from './components/scatter-plot/scatter-plot.component';
import { GeneModalComponent } from './gene-modal/gene-modal.component';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { AboutComponent } from './components/about/about.component';
import { NgPipesModule } from 'ngx-pipes';
import { CommonModule } from '@angular/common';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    ChromosomeComponent,
    ScatterPlotComponent,
    GeneModalComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    ErrorModalComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PlotlyModule,
    NgPipesModule,
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
