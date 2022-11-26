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
  server: String = ConfigClass.getUrlApi().toString();

  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
    this.loadMonsters();
  }

  loadMonsters() {
    this.battleService.getTodos().subscribe(resp => {
        console.log(resp);
    });
  }
}