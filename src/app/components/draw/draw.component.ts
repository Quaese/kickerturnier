import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { StoreService } from '../../store/store.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { Team, TournamentState } from '../../models/tournament.models';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.less']
})
export class DrawComponent implements OnInit, OnDestroy {
    btnDisabled = false;
    isReady = false;
    isRunning = false;

    tournamentState$: Observable<TournamentState>;
    teamNames$: Observable<string[]>;
    players$: Observable<string[]>;
    teams$: Observable<Team[]>;

    tournamentSubscription: Subscription;
    teamNamesSubScription: Subscription;
    playersSubScription: Subscription;
    teamsSubScription: Subscription;

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
        this.tournamentSubscription = this.tournamentState$.subscribe(state => {
            // set button to disabled if not enough players or team names are left to generate a further team
            this.btnDisabled = (state.player.length > 1 && state.teamNames.length > 0) ? false : true;

            if (this.btnDisabled) {
                // save tournament state to local storage
                this.localStorage.storeTournamentOnLocalStorage(String(new Date().getTime()), state)
            }
        });

        // get non observed arrays
        this.teamNamesSubScription = this.teamNames$.subscribe(teamNames => this.teamNames = teamNames);
        this.playersSubScription = this.players$.subscribe(players => this.players = players);
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.resetTeams();

        // unsubscriptions
        this.tournamentSubscription && this.tournamentSubscription.unsubscribe();
        this.teamNamesSubScription && this.teamNamesSubScription.unsubscribe();
        this.playersSubScription && this.playersSubScription.unsubscribe();
        this.teamsSubScription && this.teamsSubScription.unsubscribe();
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
