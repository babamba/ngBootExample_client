import { Component, OnInit } from "@angular/core";
import { Hero } from "../model/hero.model";
// import { HEROES } from "../mock-heroes";
import { HeroService } from "../service/hero/hero.service";

@Component({
  selector: "app-heros",
  templateUrl: "./heros.component.html",
  styleUrls: ["./heros.component.css"]
})
export class HerosComponent implements OnInit {
  heroes: Hero[];
  // selectedHero: Hero;
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  // onSelected(hero: Hero): void {
  //   console.log(hero);
  //   this.selectedHero = hero;
  // }

  //옵저버블 promise 사용전
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //옵저버블 구독상태로 수정
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      console.log("heroes : ", heroes);
    });
  }

  add(name: string, email: string): void {
    name = name.trim();
    email = email.trim();
    if (!name || !email) {
      return;
    }

    this.heroService.addHero({ name, email } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
