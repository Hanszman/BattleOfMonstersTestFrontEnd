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
    monsterSelected: boolean = false;

    constructor(private battleService: BattleService) { }

    ngOnInit(): void {
        this.loadMonsters();
    }

    loadMonsters() {
        this.battleService.getTodos().subscribe(resp => {
            if (resp && resp.body && resp.body.dados) {
                this.listMonsters = resp.body.dados;
                console.log(this.listMonsters);
            } else {
                console.log('No response from API.');
            }        
        });
    }

    selectPlayersMonster(index: any) {
        console.log(index);
        this.monsterSelected = true;
        this.selectComputersMonster();
    }

    selectComputersMonster() {

    }

    startBattle() {
        console.log('startBattle');
    }
}