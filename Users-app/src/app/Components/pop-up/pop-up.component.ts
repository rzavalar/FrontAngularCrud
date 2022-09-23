import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioComponent } from '../usuario/usuario.component';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(private modalService: NgbModal,private _Usuarioservice:UsuarioService, private _usercomp:UsuarioComponent) { }
  @ViewChild('content') addview !: ElementRef

  ngOnInit(): void {
  }

  editdata: any;

  LoadEditData(id: number) {
    
    this.open();
    this._Usuarioservice.getUsuario(id).subscribe(result => {
      this.editdata = result;
      this.usform.setValue({id:this.editdata.id,nombre:this.editdata.nombre,correo:this.editdata.correoElectronico,direccion:this.editdata.direccion,edad:this.editdata.edad});
    });
  }

    
    open() {
      this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      }, (reason) => {
      });
      
    }

    usform = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      edad: new FormControl(''),
      direccion: new FormControl(),

  
    });

    SaveEmployee() {
      if (this.usform.valid) {
        const user:any={
          id:this.usform.get('id')?.value,
          nombre:this.usform.get('nombre')?.value,
          edad:this.usform.get('edad')?.value,
          correoElectronico:this.usform.get('correo')?.value,
          direccion:this.usform.get('direccion')?.value
        }
    
      
        this._Usuarioservice.UpdateUser(user).subscribe(
          data=>{
           this._usercomp.obtenerUsuarios();
            this.modalService.dismissAll();
           
          },error=>{console.log(error)}
        );
          }
        
    }
}
