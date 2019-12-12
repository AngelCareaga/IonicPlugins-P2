import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Usuario } from '../models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class NativeStorageService {

  constructor(private nativeStorage: NativeStorage) { }

  public addNombreByGroup(group: string, usuario: Usuario) {
    const arrNames: Usuario[] = (this.getAllByGroup(group)) ? this.getAllByGroup(group) : [];
    arrNames.push(usuario);
    localStorage.setItem(group, JSON.stringify(arrNames));
  }

  public getAllByGroup(group: string) {
    let arrReturn: Usuario[];
    arrReturn = JSON.parse(localStorage.getItem(group));
    return arrReturn;
  }

}