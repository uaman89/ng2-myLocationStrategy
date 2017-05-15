/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, Injectable, Optional} from '@angular/core';


import {Location} from "@angular/common";
import {APP_BASE_HREF, LocationStrategy} from "@angular/common";
import {LocationChangeListener, PlatformLocation} from '@angular/common';



/**
 * @whatItDoes Use URL hash for storing application location data.
 * @description
 * `HashLocationStrategy` is a {@link LocationStrategy} used to configure the
 * {@link Location} service to represent its state in the
 * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
 * of the browser's URL.
 *
 * For instance, if you call `location.go('/foo')`, the browser's URL will become
 * `example.com#/foo`.
 *
 * ### Example
 *
 * {@example common/location/ts/hash_location_component.ts region='LocationComponent'}
 *
 * @stable
 */
@Injectable()
export class MyLocationStrategy extends LocationStrategy {
  private _baseHref: string = '';
  constructor(
    private _platformLocation: PlatformLocation,
    @Optional() @Inject(APP_BASE_HREF) _baseHref?: string) {
    super();

    if (_baseHref != null) {
      this._baseHref = _baseHref;
      console.log(`_baseHref:`, _baseHref);
    }
  }

  onPopState(fn: LocationChangeListener): void {
    console.log(`fn:`, fn);
    this._platformLocation.onPopState(fn);
    this._platformLocation.onHashChange(fn);
  }

  getBaseHref(): string {
    console.log(`getBaseHref() this._baseHref: `, this._baseHref);
    return this._baseHref;
  }

  path(includeHash: boolean = false): string {
    // the hash value is always prefixed with a `#`
    // and if it is empty then it will stay empty
    let path = this._platformLocation.hash;
    if (path == null) path = '#';

    let res =  path.length > 0 ? path.substring(1) : path;
    console.log(`path() return:`, res);
    return res;
  }

  prepareExternalUrl(internal: string): string {
    const url = Location.joinWithSlash(this._baseHref, internal);
    let res = url.length > 0 ? ('#' + url) : url;
    // this is call few times, why?
    //console.log(`prepareExternalUrl() return url:`, res);
    return res;
  }

  pushState(state: any, title: string, path: string, queryParams: string) {
    let url: string|null =
      this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
    if (url.length == 0) {
      url = this._platformLocation.pathname;
    }

    //get data from "service"
    state = window['akaService'];
    this._platformLocation.pushState(state, title, state.link + '/'+ url);

    console.log(`pushState(): `, state, title, url);
  }

  replaceState(state: any, title: string, path: string, queryParams: string) {
    let url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
    if (url.length == 0) {
      url = this._platformLocation.pathname;
    }
    console.log(`replaceState: history.state`, window.history.state);

    //get data from history.state
    state = window.history.state || { modelId: 'default', link: 'індекс.хтмл' };
    this._platformLocation.replaceState(state, title, state.link + '/'+ url);
    // for oportunity getting state


    console.log(`replaceState(): `, state, title, url);
  }

  forward(): void {
    console.log(`forward`);
    this._platformLocation.forward(); }

  back(): void {
    console.log(`back`);
    this._platformLocation.back(); }
}
