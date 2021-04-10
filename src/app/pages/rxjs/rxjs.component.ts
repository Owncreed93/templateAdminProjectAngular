import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;



  constructor() { }

  ngOnInit(): void {

    // this.retornarObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   (error) => console.warn('Error: ', error ),
    //   () => console.log('%c Obs terminado', 'color: #fee266')
    // );

    this.intervalSubs = this.retornaIntervalo()
                                .subscribe( console.log );



  }

  ngOnDestroy(): void {

    this.intervalSubs.unsubscribe();

  }

  retornaIntervalo(): Observable<number> {

    return interval(500)
                .pipe(
                  take(10),
                  map( valor => valor + 1),
                  filter(valor => (valor % 2 === 0) ? true : false ),
                );

  }

  retornarObservable(): Observable<number> {

    let i: number = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if ( i === 4 ) {

          clearInterval();
          observer.complete();

        }

        if ( i === 2 ) {

          observer.error( 'i llegó al valor de 2' );

        }

      }, 1000 );

    });

  }

}
