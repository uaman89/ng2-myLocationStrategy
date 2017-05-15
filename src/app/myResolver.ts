import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';
import {Location} from "@angular/common";


@Injectable()
export class MyResolver implements Resolve<any> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

    //console.log(`route:`, route);
    //console.log(`state:`, state);

    //emulate model data changing
    window['akaService'].modelId = state.url.substr(1);
    window['akaService'].link = state.url.substr(1) + '/' + window.history.length + ".html";

    return Promise.resolve(true);
  }
}
