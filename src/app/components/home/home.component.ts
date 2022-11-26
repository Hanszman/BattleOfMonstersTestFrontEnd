import { Component, OnInit } from '@angular/core';
import { BattleService } from '../../services/battle.service';
import { ConfigClass } from '../../classes/config-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listMonsters: any;
  imgDir = '../../../assets/imgs/';
  server: String = ConfigClass.getUrlApi().toString();

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
  
  showMonsterData() {

  }

  startBattle() {
    console.log('startBattle');
  }
}