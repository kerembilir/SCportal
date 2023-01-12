import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {

  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;

  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adsoyad: new FormControl(),
    mail: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public servis: DataService,

  ) { }

  ngOnInit() {
    this.UyeListele();

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
    this.servis.UyeListele().subscribe(d => {
      this.uyeler = d;
    });
  }
  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value
    var tarih = new Date();
    if (!uye.uid) {
      var filtre = this.uyeler.filter(s => s.email == uye.email);
      if (filtre.length > 0) {
//toast
      } else {
        uye.kaytarih = tarih.getTime().toString();
        uye.duztarih = tarih.getTime().toString();
        this.servis.UyeEkle(uye).subscribe(d => {
//toast
          this.UyeListele();
          this.modal.toggle();
        });
      }
    } else {
      uye.duztarih = tarih.getTime().toString();
      this.servis.UyeDuzenle(uye).subscribe(d => {
   //toast
        this.UyeListele();
        this.modal.toggle();
      });
    }

  }
//   UyeSil() {
//     this.servis.UyeSil(this.secUye.uid).subscribe(d => {
//     //toast
//       this.UyeListele();
//       this.modal.toggle();
//     });
//   }
// 
}