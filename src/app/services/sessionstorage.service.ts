import { TournamentState } from "./../models/tournament.models";
import { Inject } from "@angular/core";
import { SESSION_STORAGE, StorageService } from "angular-webstorage-service";

const STORAGE_KEY = "kicker_tournament";

export class SessionStorageService {
    constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {}

    public storeOnLocalStorage(
        tournamentKey: string,
        tournamentState: TournamentState
    ): void {
        // get array of tournaments
        let currentTournamentsList = this.storage.get(STORAGE_KEY) || [];

        currentTournamentsList.push({
            [tournamentKey]: tournamentState
        });

        // save 10 tournament states only
        if (currentTournamentsList.length > 10) {
            currentTournamentsList = currentTournamentsList.filter((elem, index) => index > 0);
        }

        this.storage.set(STORAGE_KEY, currentTournamentsList);

        console.log(this.storage.get(STORAGE_KEY) || "local storage is empty");
    }

    public removeFromStorage() {
        this.storage.remove(STORAGE_KEY);
    }

    public getFromStorage() {
        return this.storage.get(STORAGE_KEY) || [];
    }
}
