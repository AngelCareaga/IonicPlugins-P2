import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Usuario } from '../models/usuario.model';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class NativeStorageService {

  constructor(private nativeStorage: NativeStorage, public platform: Platform) { }

  public addNombreByGroup(group: string, usuario: Usuario) {
    return new Promise<any>((resolve, reject) => {
      this.getAllByGroup(group)
      .then((res) => {
        const arrNames: Usuario[] = (res) ? res : [];
        arrNames.push(usuario);
        this.platform.ready().then((resPlatform) => {
          if (resPlatform === 'cordova') {
            this.nativeStorage.setItem(group, JSON.stringify(arrNames))
            .then(() => {
              this.getAllByGroup(group)
                .then((resGroup) => {
                  resolve(resGroup);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
          } else if (resPlatform === 'dom') {
            localStorage.setItem(group, JSON.stringify(arrNames));
            this.getAllByGroup(group)
                .then((resGroup) => {
                  resolve(resGroup);
                })
                .catch((err) => {
                  reject(err);
                });
          }
        })
          .catch((err) => {
          });
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

  public getAllByGroup(group: string) {
    return new Promise<Usuario[]>((resolve, reject) => {
      this.platform.ready()
        .then((resPlatform) => {
          console.log('Es: ' + resPlatform);
          if (resPlatform === 'cordova') {
            this.nativeStorage.getItem(group)
              .then((res) => {
                resolve(JSON.parse(res));
              })
              .catch((err) => {
                reject(err);
              });
          } else if (resPlatform === 'dom') {
            resolve(JSON.parse(localStorage.getItem(group)));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}
