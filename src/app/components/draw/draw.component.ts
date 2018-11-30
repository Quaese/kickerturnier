import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreService } from '../../store/store.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Team, TournamentState } from '../../models/tournament.models';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.less']
})
export class DrawComponent implements OnInit {
    btnDisabled = false;
    isReady = false;
    isRunning = false;

    tournamentState$: Observable<TournamentState>;
    teamNames$: Observable<string[]>;
    players$: Observable<string[]>;
    teams$: Observable<Team[]>;

    players: string[];
    teamNames: string[];

    activeTeamName = -1;
    activeParticipant1 = -1;
    activeParticipant2 = -1;

    constructor(
        private storeService: StoreService,
        private localStorage: LocalStorageService,
        private elRef: ElementRef
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

    ngOnInit() {
        console.log('ngOnInit (DrawComponent');
    }

    randomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    onGenerateTeamAnimated(evt) {
        // if animation is running
        if (this.isRunning) {
            return;
        }

        let index: number,
            team: Team = {
                name: '',
                player1: '',
                player2: ''
            },
            counter = 0,
            delayInterval = 300,
            delayTimeout = 600,
            loops = 5,
            hTimer;


        // animation is running
        this.isRunning = true;

        // Team-Name
        hTimer = setInterval(() => {
            index = this.randomIndex(this.teamNames);
            this.activeTeamName = index;

            counter++;

            if (counter > loops) {
                team.name = this.teamNames[index];

                counter = 0;
                clearTimeout(hTimer);

                setTimeout(() => {
                    // Player 1
                    hTimer = setInterval(() => {
                        index = this.randomIndex(this.players);
                        this.activeParticipant1 = index;

                        counter++;

                        if (counter > loops) {
                            team.player1 = this.players[index];
                            // reduce/filter player array
                            this.players = this.players.filter((player, idx) => idx !== index);

                            counter = 0;
                            clearInterval(hTimer);

                            setTimeout(() => {
                                // Player 2
                                hTimer = setInterval(() => {
                                    index = this.randomIndex(this.players);
                                    this.activeParticipant2 = index;

                                    counter++;

                                    if (counter > loops) {
                                        team.player2 = this.players[index];
                                        // reduce/filter player array
                                        this.players = this.players.filter((player, idx) => idx !== index);

                                        counter = 0;
                                        clearTimeout(hTimer);

                                        setTimeout(() => {
                                            this.activeParticipant1 = -1;
                                            this.activeParticipant2 = -1;
                                            this.activeTeamName = -1;

                                            // dispatch action
                                            this.storeService.dispatchTournamentAddTeamAction(team);

                                            // animation stopped
                                            this.isRunning = false;

                                            if (!(this.players.length > 1 && this.teamNames.length > 0)) {
                                                this.btnDisabled = true;
                                                this.isReady = true;
                                                return;
                                            }
                                        }, delayTimeout);
                                    }

                                }, delayInterval);
                            }, delayTimeout);

                        }

                    }, delayInterval);
                }, delayTimeout);

            }
        }, delayInterval);
    }



    onGenerateTeam(evt) {
        // console.log(this.elRef);

        // if animation is running
        if (this.isRunning) {
            return;
        }

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
