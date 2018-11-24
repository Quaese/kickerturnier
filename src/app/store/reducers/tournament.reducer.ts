import { Actions, TOURNAMENT_ADD_TEAM, TOURNAMENT_ADD_TEAM_NAME } from './../actions/tournament.actions';
import { TournamentState, teamNames, player } from './../../models/tournament.models';


export const InitialTournamenState: TournamentState = {
    teams: [],
    teamNames: teamNames,
    player: player
}


export function tournamentReducer(state: TournamentState = InitialTournamenState, action: Actions): TournamentState {
    switch(action.type) {
        // Test-Dispatch-Objekt: {type: "[Tournament] AddTeamName", payload: "tolles team"}
        case TOURNAMENT_ADD_TEAM_NAME:
        return {
            ...state,
            teamNames: [...state.teamNames, action.payload]
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
        case TOURNAMENT_ADD_TEAM:
            return {
                ...state,
                teams: [...state.teams, action.payload]
            };

    }

    return state;
}
