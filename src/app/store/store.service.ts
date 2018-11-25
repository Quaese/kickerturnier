import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TournamentAddTeamAction, TournamentResetAction } from './actions/tournament.actions';
import { TournamentState } from './../models/tournament.models';
import { State } from './reducers/index';
import { Team } from '../models/tournament.models';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    tournamentState$: Observable<TournamentState>;
    teams$: Observable<Team[]>;
    teamNames$: Observable<string[]>;
    player$: Observable<string[]>;

    constructor(private store: Store<State>) {
        this.tournamentState$ = this.store.select(part => part.tournament);
        this.teams$ = this.store.select(part => part.tournament.teams);
        this.teamNames$ = this.store.select(part => part.tournament.teamNames);
        this.player$ = this.store.select(part => part.tournament.player);
    }

    getTournamentState$() {
        return this.tournamentState$;
    }
    getTeams$() {
        return this.teams$;
    }
    getTeamNames$() {
        return this.teamNames$;
    }
    getPlayer$() {
        return this.player$;
    }

    dispatchTournamentAddTeamAction(team: Team) {
        this.store.dispatch(new TournamentAddTeamAction(team));
    }

    dispatchTournamentReset() {
        this.store.dispatch(new TournamentResetAction());
    }
}
