import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NativeStorageService } from '../../services/native-storage.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  inputNombre: string;
  inputEdad: number;
  dataStorage: Usuario[];
  selectGrupo: any;

  constructor(
    // tslint:disable-next-line:variable-name
    private _nativeStorage: NativeStorageService,
    public alertController: AlertController) {}

  ngOnInit() {
  }

  addNombre() {

    if (this.selectGrupo) {
      this._nativeStorage.addNombreByGroup(this.selectGrupo, {nombre: this.inputNombre, edad: this.inputEdad})
      .then((res: Usuario[]) => {
        this.dataStorage = res;
      })
      .catch((err) => {
        this.dataStorage = [];
        console.log(err);
      });
    } else {
      this.presentAlert();
    }
  }

  updateList() {
    this._nativeStorage.getAllByGroup(this.selectGrupo)
    .then((res) => {
      this.dataStorage = res;
    })
    .catch((err) => {
      this.dataStorage = [];
      console.log(err);
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Importante',
      subHeader: 'Selecciona un grupo',
      message: 'Debes seleccionar un grupo.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
