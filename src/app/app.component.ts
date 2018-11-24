import { StoreService } from './store/store.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './models/tournament.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'kickerturnier';

  teamNames$: Observable<string[]>;
  players$: Observable<string[]>;
  teams$: Observable<Team[]>;

  constructor(private storeService: StoreService) {
      this.teamNames$ = this.storeService.getTeamNames$();
      this.players$ = this.storeService.getPlayer$();
      this.teams$ = this.storeService.getTeams$();
    //   this.teamNames$.subscribe(val => console.log(val));
  }
}
