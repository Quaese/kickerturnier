import { TournamentState } from './../../models/tournament.models';
import { tournamentReducer } from "./tournament.reducer";

export interface State {
    tournament: TournamentState;
}

export const reducers = {
    tournament: tournamentReducer
}
