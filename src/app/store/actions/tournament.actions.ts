import { Team } from './../../models/tournament.models';
import { Action } from "@ngrx/store";


export const TOURNAMENT_ADD_TEAM_NAME = '[Tournament] AddTeamName';
export const TOURNAMENT_ADD_TEAM = '[Tournament] AddTeam';

export class TournamentAddTeamNameAction implements Action {
  readonly type = TOURNAMENT_ADD_TEAM_NAME;

  constructor(public payload: string) {}
}

/*
Test-Dispatch-Objekt:
{
    type: '[Tournament] AddTeam',
    payload: {
        name: 'Rumms Bumms',
        player1: 'Ding',
        player2: 'Dong'
    }
}
*/
export class TournamentAddTeamAction implements Action {
  readonly type = TOURNAMENT_ADD_TEAM;

  constructor(public payload: Team) {
      console.log(payload);
  }
}

export type Actions =
    TournamentAddTeamNameAction
    | TournamentAddTeamAction;
