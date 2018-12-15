import { Team } from './../../models/tournament.models';
import { Action } from "@ngrx/store";


export const TOURNAMENT_ADD_TEAM_NAME = '[Tournament] AddTeamName';
export const TOURNAMENT_ADD_TEAM = '[Tournament] AddTeam';
export const TOURNAMENT_RESET = '[Tournament] Reset';

export class TournamentAddTeamNameAction implements Action {
  readonly type = TOURNAMENT_ADD_TEAM_NAME;

  constructor(public payload: string) {}
}

/*
Test-Dispatch-Objekt:
{
    type: '[Tournament] AddTeam',
    payload: {
        name: 'Terrifying Metal Wipeout',
        player1: 'Maik',
        player2: 'Fouad'
    }
}
*/
export class TournamentAddTeamAction implements Action {
  readonly type = TOURNAMENT_ADD_TEAM;

  constructor(public payload: Team) {}
}

/* Test-Dispatch-Objekt: {type: '[Tournament] Reset'} */
export class TournamentResetAction implements Action {
    readonly type = TOURNAMENT_RESET;
}

export type Actions =
    TournamentAddTeamNameAction
    | TournamentAddTeamAction
    | TournamentResetAction;
