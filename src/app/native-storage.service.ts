import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

export interface NombreStorage {
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class NativeStorageService {

  constructor(private nativeStorage: NativeStorage) { }

  public addNombreByGroup(group: string, nombre: string) {

    const arrNames: NombreStorage[] = (this.getAllByGroup(group)) ? this.getAllByGroup(group) : [];
    arrNames.push({ nombre });
    localStorage.setItem(group, JSON.stringify(arrNames));

    // =========================================

    // Obtener grupo si es que existe
    // Si grupo existe
    // Convertir de JSON a Arreglo
    // Hacer push en arreglo con nuevo nombre
    // Convertir arreglo a JSON
    // Guardar JSON
    // Sino
    // Crear JSON con nombre
    // Guardar JSON

    // =========================================


  }

  public getAllByGroup(group: string) {
    let arrReturn: NombreStorage[];
    arrReturn = JSON.parse(localStorage.getItem(group));
    return arrReturn;
    // =========================================

    // Obtener grupo si es que existe
    // Si grupo existe
    // Convertir de JSON a Arreglo
    // Sino
    // Devolver []

    // =========================================
  }

}