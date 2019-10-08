import { Injectable } from "@angular/core";
import { Hero } from "../../model/hero.model";
import { Observable, of } from "rxjs";
import { MessageService } from "../message/message.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private userUrl = "http://localhost:8080/users";
  //private heroesUrl = "api/heroes"; // 웹 API 형식의 URL로 사용

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** HeroService에서 보내는 메시지는 MessageService가 화면에 표시합니다. */
  private log(message: string) {
    this.messageService.add(`Hero service :  ${message}`);
  }

  private openSnack(message: string, action: string) {
    this.messageService.openSnackBar(message, action);
  }

  /** GET: 서버에서 히어로 목록 가져오기 */
  getHeroes(): Observable<Hero[]> {
    // TODO: 메시지는 히어로 데이터를 가져온 _후에_ 보내야 합니다.
    //this.messageService.add("Hero Service : fetched heroes");
    //return of(HEROES);

    return this.http.get<Hero[]>(this.userUrl).pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>("getHeroes", []))
    );
  }

  getUsers() {
    return this.http.get<Hero[]>(this.userUrl);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.userUrl}/${id}`;

    //this.messageService.add(`Heroservice : fetch hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id));
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`get Hero id= ${id}`))
    );
  }

  /** GET: id에 해당하는 히어로 데이터를 가져옵니다. 존재하지 않으면 `undefined`를 반환합니다. */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.userUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]), // 배열에 있는 항목 중 하나만 반환합니다.
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: 서버에 저장된 히어로 데이터를 변경합니다. */
  // HttpClient.put() 메소드는 3개의 인자를 받습니다.

  // URL
  // 수정할 데이터 (수정된 히어로 데이터)
  // 옵션
  updateHero(hero: Hero): Observable<Hero> {
    console.log("hero : ", hero);
    const url = `${this.userUrl}/${hero.id}`;

    return this.http.put<Hero>(url, hero, httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      tap(_ => this.log(`update hero id=${hero.id}`)),
      catchError(this.handleError<Hero>("updateHero"))
    );
  }

  /** POST: 서버에 새로운 히어로를 추가합니다. */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.userUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      tap(_ => this.openSnack("ADD Hero", "close")),

      catchError(this.handleError<Hero>(`addHero`))
    );
  }

  /** DELETE: 서버에서 히어로를 제거합니다. */
  deleteHero(hero: Hero | number): Observable<Hero> {
    console.log("hero : ", hero);
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`delete hero id=${id}`)),
      tap(_ => this.openSnack("Delete Hero", "close")),
      catchError(this.handleError<Hero>("delete hero"))
    );
  }

  /* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
  searchHeros(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 입력된 내용이 없으면 빈 배열을 반환합니다.
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.userUrl}/search/?term=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>("searchHeroes", []))
    );
  }

  /**
   * HTTP 요청이 실패한 경우를 처리합니다.
   * 애플리케이션 로직 흐름은 그대로 유지됩니다.
   * @param operation - 실패한 동작의 이름
   * @param result - 기본값으로 반환할 객체
   */

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
}
