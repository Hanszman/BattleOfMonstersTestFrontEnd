import { Component, OnInit } from '@angular/core';
import { BattleService } from '../../services/battle.service';
import { ConfigClass } from '../../classes/config-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    server: String = ConfigClass.getUrlApi().toString();
    imgDir = '../../../assets/imgs/';
    listMonsters: any;
    arrayIdMonsters: any[] = [];
    selectedPlayersMonster: any;
    selectedComputersMonster: any;
    playersMonsterSelected: boolean = false;
    computersMonsterSelected: boolean = false;
    winner: any;
    showMessage: boolean = false;

    constructor(private battleService: BattleService) { }

    ngOnInit(): void {
        this.loadMonsters();
    }

    loadMonsters() {
        this.battleService.getMonsters().subscribe(resp => {
            if (resp && resp.body && resp.body.dados) {
                this.listMonsters = resp.body.dados;
            } else {
                console.log('No response from API.');
            }
        });
    }

    selectPlayersMonster(monsterId: any) {
        this.showMessage = false;
        this.selectedPlayersMonster = this.listMonsters.find((m: { id: any; }) => m.id === monsterId);
        this.playersMonsterSelected = true;
        this.selectComputersMonster(monsterId);
    }

    selectComputersMonster(monsterId: any) {
        this.arrayIdMonsters = [];
        for (let i = 0; i < this.listMonsters.length; i++) {
            if (this.listMonsters[i].id !== monsterId) {
                this.arrayIdMonsters.push(this.listMonsters[i].id);
            }
        }
        let randomIdMonster = this.arrayIdMonsters[Math.floor(Math.random()*this.arrayIdMonsters.length)];
        this.selectedComputersMonster = this.listMonsters.find((m: { id: any; }) => m.id === randomIdMonster);
        this.computersMonsterSelected = true;
    }

    startBattle() {
        let body = {
            "monster1Id": this.selectedPlayersMonster.id,
            "monster2Id": this.selectedComputersMonster.id,
        }
        this.battleService.postBattle(body).subscribe(resp => {
            if (resp && resp.body && resp.body.dados) {
                let winnerId = parseInt(resp.body.dados, 10);
                this.winner = this.listMonsters.find((m: { id: any; }) => m.id === winnerId);
            } else {
                console.log('No response from API.');
            }
            
        });
        this.showMessage = true;
    }
}