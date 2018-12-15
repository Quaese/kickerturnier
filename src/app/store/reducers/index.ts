import { TournamentState } from './../../models/tournament.models';
import { tournamentReducer } from "./tournament.reducer";

// define state interface (expand with additional properties, e.g. user: UserState)
export interface State {
    tournament: TournamentState;
}

// define available reducers (expand with additional reducers, e.g. user: userReducer)
export const reducers = {
    tournament: tournamentReducer
}
