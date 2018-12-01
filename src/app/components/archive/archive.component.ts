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
        this.archive = this.localStorage.getFromStorage();

        this.getTeamsFromArchive();
    }

    getTeamsFromArchive() {
        if (this.archive) {
            this.draws = this.archive.map(draw => {
                const key = Object.keys(draw)[0];
                return {date: key, teams: draw[key].teams}
            });
        }
    }

}
