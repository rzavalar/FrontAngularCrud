import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlapp ="http://www.crudusuarioang.somee.com/"
  apiurl ="api/User/"
  constructor(private http:HttpClient) { }

  getListUsuarios():Observable<any>{
    return this.http.get(this.urlapp + this.apiurl+"GetAll")
  }

  DeleteUsuario(id:number):Observable<any>{
    return this.http.delete(this.urlapp + this.apiurl+id)
  }

  SaveUser(usuario:any):Observable<any>{
    //, par on body
    return this.http.post(this.urlapp + this.apiurl,usuario)
  }
}
