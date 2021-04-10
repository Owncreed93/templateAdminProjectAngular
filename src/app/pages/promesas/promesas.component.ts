import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuario =>  {

      console.log( usuario );

    });

    // const promesa = new Promise(
    //   ( resolve, reject ) => {

    //     console.group('%c Promise Component', 'color: #68b983');

    //     if ( false ) {
    //       console.log('hola mundo');
    //       resolve('Hola mundo');
    //     } else {

    //       reject('Algo salió mal');

    //     }

    //     console.groupEnd();
    //   }
    // );

    // promesa.then(

    //   ( mensaje ) => {
    //     console.log( mensaje );
    //   }

    // )
    // .catch(

    //   error => console.error('Error en mi promesa ', error)

    // );

    // console.log('Fin del Init');

  }

  getUsuarios(): Promise<any> {

    return new Promise<JSON>( resolve => {

      fetch('https://reqres.in/api/users?page=2')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ));

    } );


  }

}
