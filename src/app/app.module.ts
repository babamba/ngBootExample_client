import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HerosComponent } from "./heros/heros.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { MessagesComponent } from "./messages/messages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { HttpClientModule } from "@angular/common/http";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// import { InMemoryDataService } from "./in-memory-data.service"; 테스트용 db
import { HeroSearchComponent } from "./hero-search/hero-search.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  // declarations : 우리가 만든 클래스를 다른 파일에서 사용할수 있게끔 선언한다.
  declarations: [
    AppComponent,
    HerosComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  //imports : angular의 모듈에서 사용되는 클래스를 다른 파일에서 사용할수 있게끔 선언
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    // Material theme
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,

    HttpClientModule,
    BrowserAnimationsModule
    // HttpClientInMemoryWebApiModule 모듈은 HTTP 요청을 가로채고 서버의 응답을 흉내.
    // 실제 서버가 준비되면 이 부분을 제거.
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
