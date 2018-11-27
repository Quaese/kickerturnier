import { Actions, TOURNAMENT_ADD_TEAM, TOURNAMENT_ADD_TEAM_NAME, TOURNAMENT_RESET } from './../actions/tournament.actions';
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
                name: 'Terrifying Metal Wipeout',
                player1: 'Maik',
                player2: 'Fouad'
            }
        }
        */
        case TOURNAMENT_ADD_TEAM:
            // console.log('add_team (reducer): ', action.payload.name,  state.teamNames.filter(name => name !== action.payload.name));
            return {
                ...state,
                player: state.player.filter(name => action.payload.player1 !== name && action.payload.player2 !== name),
                teamNames: state.teamNames.filter(name => name !== action.payload.name),
                teams: [...state.teams, action.payload]
            };

        case TOURNAMENT_RESET:
            return InitialTournamenState;
    }

    return state;
}
