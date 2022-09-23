import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PopUpComponent } from '../pop-up/pop-up.component';


@Component({
  selector: 'app-usuario',
   templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})



export class UsuarioComponent implements OnInit {
  
  listUsuarios:any[]=[
  ];

  form:FormGroup;
  closeResult = '';

  

  constructor(
    private _Usuarioservice:UsuarioService,
    private fb:FormBuilder,
   
  )
   { this.form = this.fb.group({
    nombre:[''],
    edad:[''],
    correo:[''],
    direccion:['']
  })}
  @ViewChild(PopUpComponent) addview !:PopUpComponent
 
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  agregarUsuario(){
    console.log(this.form);

    const user:any={
      nombre:this.form.get('nombre')?.value,
      edad:this.form.get('edad')?.value,
      correoElectronico:this.form.get('correo')?.value,
      direccion:this.form.get('direccion')?.value
    }

  
    this._Usuarioservice.SaveUser(user).subscribe(
      data=>{console.log(data);
        this.obtenerUsuarios();
        this.form.reset();
      },error=>{console.log(error)}
    );
  }

  eliminarusuario(id:number){
    this._Usuarioservice.DeleteUsuario(id).subscribe(
      data=>{
        this.obtenerUsuarios();
      
      },error=>{console.log(error)}
    );
  }

  public obtenerUsuarios(){
    this._Usuarioservice.getListUsuarios().subscribe(
      data=>{
        this.listUsuarios = data;
      
      },error=>{console.log(error)}
    );
  }

  saveUsuario(){
      
  }

  functionedit(code:number){
    
    this.addview.LoadEditData(code);

  }
  
}
