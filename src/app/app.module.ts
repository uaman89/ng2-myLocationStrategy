import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { GammaComponent } from './gamma/gamma.component';
import {Routes, RouterModule} from "@angular/router";
import {Location, LocationStrategy, HashLocationStrategy} from "@angular/common";
import {MyLocationStrategy} from "app/myLocationStarategy";
import {MyResolver} from "./myResolver";


const appRoutes: Routes = [
  { path: 'alfa', component: AlphaComponent, resolve: {data: MyResolver } },
  { path: 'beta', component: BetaComponent,  resolve: {data: MyResolver } },
  { path: 'gama', component: GammaComponent, resolve: {data: MyResolver } },
];

@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    BetaComponent,
    GammaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [
    Location,
    {provide: LocationStrategy, useClass: MyLocationStrategy},
    MyResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
