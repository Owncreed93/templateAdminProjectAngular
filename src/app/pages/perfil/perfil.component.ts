import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// ********************************* THIRD PARTY ******************************** //

import Swal from 'sweetalert2';

// ********************************* MODELS ******************************** //

import { Usuario } from '../../../models/usuario.models';

// ********************************* SERVICES ******************************** //

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { catchError } from 'rxjs/operators';

// *************************************************************************** //

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor(
      private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private fileUploadService: FileUploadService
     ) {

        this.usuario = this.usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({

      nombre: [ this.usuario.nombre, Validators.required ],
      email: [  this.usuario.email , [ Validators.required, Validators.email ] ]

    });

  }

  actualizarPerfil(): any {

    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe(

          () => {

            const { nombre, email } = this.perfilForm.value;

            this.usuario.nombre = nombre;
            this.usuario.email = email;

            Swal.fire({
              icon: 'success',
              title: 'Guardado',
              text: 'Cambios fueron guardados'
            });

          },

          ( err ) => {
            console.error( err.error.msg );
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error.msg
            });
          }

        );

  }

  cambiarImagen( file: File ) {

    this.imagenSubir = file;

    if ( !file ) { return this.imgTemp = null ; }

    const reader = new FileReader();

    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {

      this.imgTemp = reader.result;
      // console.log( reader.result );

    }

  }

  subirImagen() {

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
      .then(
        img => {
          this.usuario.img = img;
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Imagen de usuario actualizada'
          });
       }
      )
      .catch(
        ( err ) => {
          console.error( err );
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo subir la imagen'
          });
        }
      );

  }

}
