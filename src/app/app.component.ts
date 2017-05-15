import {Component,OnInit} from '@angular/core';
import {Router, NavigationStart, Event as NavigationEvent, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor( private router: Router) {
    window['akaService'] = {};
  }

  ngOnInit() {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        console.log(`history.state: `, window.history.state);
        console.log(`history.length: `, window.history.length);
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }
}
