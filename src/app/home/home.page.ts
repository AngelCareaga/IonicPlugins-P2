import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Device } from '@ionic-native/device/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NativeStorageService } from '../native-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  optionsCamera: CameraOptions;
  base64Image: string;
  infoDevice: string;

  dataQR: string;
  dataBarcode: string;

  constructor(
    private camera: Camera,
    public platform: Platform,
    public device: Device,
    public barcodeScanner: BarcodeScanner,
    // tslint:disable-next-line:variable-name
    private _nativeStorage: NativeStorageService
    ) {

    this.optionsCamera = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };
    this.base64Image = '';
  }

  ngOnInit(): void {
    this.infoDevice = this.device.version;
  }

  openCamera() {
    this.platform.ready().then(() => {
      this.camera.getPicture(this.optionsCamera)
        .then(imageData => {
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
        },
          err => {
            console.log('Could not open the camera: ' + err);
          }
        );
    });
  }

  openCameraBarcode() {
   this.barcodeScanner.scan().then(barcodeData => {
      this.dataBarcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
