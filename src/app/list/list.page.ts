import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NativeStorageService } from '../native-storage.service';

export interface NombreStorage {
  nombre: string;
}

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  nombreInput: string;
  dataStorage: NombreStorage[];
  selectGrupo: any;

  // tslint:disable-next-line:variable-name
  constructor(private _nativeStorage: NativeStorageService) {}

  ngOnInit() {
  }

  addNombre() {
    this._nativeStorage.addNombreByGroup(this.selectGrupo, this.nombreInput);
    this.dataStorage = this._nativeStorage.getAllByGroup(this.selectGrupo);
  }

  updateList(){
    this.dataStorage = this._nativeStorage.getAllByGroup(this.selectGrupo);
  }
}
