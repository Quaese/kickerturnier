import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.less']
})
export class ArchiveComponent implements OnInit {
    archive: any[];
    draws: any[];

    constructor(private localStorage: LocalStorageService) {}

    ngOnInit() {
        // get archives from local storage
        this.archive = this.localStorage.getFromStorage();

        // prepare archives for template
        this.getTeamsFromArchive();
    }

    getTeamsFromArchive() {
        // if archive data exists
        if (this.archive) {
            // map archive data to an "output array" containing outputable objects
            this.draws = this.archive.map(draw => {
                // key of draw corresponds to its save-date
                const key = Object.keys(draw)[0];

                // return ouputable object
                return {date: key, teams: draw[key].teams}
            });
        }
    }

}
