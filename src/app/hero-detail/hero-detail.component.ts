import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Hero } from "../model/hero.model";
import { HeroService } from "../service/hero/hero.service";

// selector는 사용될 태그이고,
// templateUrl은 selector에 담을 html code,
// styleUrls는 css를 맡는다.

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    console.log("get Hero ID : ", id);
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
