import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  listUsuarios:any[]=[
  ];

  form:FormGroup;

  constructor(
    private _Usuarioservice:UsuarioService,
    private fb:FormBuilder
  ) { this.form = this.fb.group({
    nombre:[''],
    edad:[''],
    correo:[''],
    direccion:['']
  })}

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  agregarUsuario(){
    console.log(this.form);

    const user:any={
      nombre:this.form.get('nombre')?.value,
      edad:this.form.get('edad')?.value,
      correoElectronico:this.form.get('correo')?.value,
      direccion:this.form.get('direccion')?.value
    }

    console.log(user);
    this._Usuarioservice.SaveUser(user).subscribe(
      data=>{console.log(data);
        this.obtenerTarjetas();
        this.form.reset();
      },error=>{console.log(error)}
    );
  }

  eliminarusuario(id:number){
    this._Usuarioservice.DeleteUsuario(id).subscribe(
      data=>{console.log(data);
        this.obtenerTarjetas();
      
      },error=>{console.log(error)}
    );
  }

  obtenerTarjetas(){
    this._Usuarioservice.getListUsuarios().subscribe(
      data=>{console.log(data);
        this.listUsuarios = data;
      
      },error=>{console.log(error)}
    );
  }

  saveUsuario(usuario:any){
      
  }

}
