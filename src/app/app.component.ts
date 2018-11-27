import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreService } from './store/store.service';
import { LocalStorageService } from './services/localstorage.service';
import { Team, TournamentState } from './models/tournament.models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'kickerturnier';
    btnDisabled = false;
    isReady = false;

    tournamentState$: Observable<TournamentState>;
    teamNames$: Observable<string[]>;
    players$: Observable<string[]>;
    teams$: Observable<Team[]>;

    players: string[];
    teamNames: string[];

    constructor(
        private storeService: StoreService,
        private localStorage: LocalStorageService
    ) {
        this.tournamentState$ = this.storeService.getTournamentState$();
        this.teamNames$ = this.storeService.getTeamNames$();
        this.players$ = this.storeService.getPlayer$();
        this.teams$ = this.storeService.getTeams$();

        // observe tournament state
        this.tournamentState$.subscribe(state => {
            // set button to diabled if not enough players or team names are left to generate a further team
            this.btnDisabled = (state.player.length > 1 && state.teamNames.length > 0) ? false : true;

            if (this.btnDisabled) {
                // save tournament state to local storage
                this.localStorage.storeOnLocalStorage(String(new Date().getTime()), state)
            }
        });

        // get non observed arrays
        this.teamNames$.subscribe(teamNames => this.teamNames = teamNames);
        this.players$.subscribe(players => this.players = players);
    }

    randomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    onGenerateTeam(evt) {
        let index: number,
            team: Team = {
                name: '',
                player1: '',
                player2: ''
            };

            // Player 1
            index = this.randomIndex(this.players);
            team.player1 = this.players[index];
            // reduce/filter player array
            this.players = this.players.filter((player, idx) => idx !== index);

            // Player 2
            index = this.randomIndex(this.players);
            team.player2 = this.players[index];
            // reduce/filter player array
            this.players = this.players.filter((player, idx) => idx !== index);

            // Team-Name
            index = this.randomIndex(this.teamNames);
            team.name = this.teamNames[index];

            // dispatch action
            this.storeService.dispatchTournamentAddTeamAction(team);

            if (!(this.players.length > 1 && this.teamNames.length > 0)) {
                this.btnDisabled = true;
                this.isReady = true;
                return;
            }
        }

    preventDefault(evt) {
        evt.preventDefault();
    }

    togglePoolSection() {
        this.isReady = !this.isReady;
    }

    resetTeams() {
        this.storeService.dispatchTournamentReset();
        this.btnDisabled = false;
        this.isReady = false;
    }

    onResetStorage() {
        this.localStorage.removeFromStorage();
    }
}
