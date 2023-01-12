

import { Kategori } from '../../models/soru';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { FbservisService } from 'src/app/services/fbservis.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.scss']
})
export class KategoriComponent implements OnInit {
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secKat!: Kategori;
  kategori!:Kategori;
  frm: FormGroup = new FormGroup({
    adi: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public fbservice:FbservisService,
    public toast:HotToastService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Soru Ekle";
    this.modal.show();
  }
  Duzenle(kat: Kategori, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.secKat=kat;
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: Kategori, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Kategori Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  KategoriListele() {
    this.fbservice.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriEkle() {
    var kat: Kategori = this.frm.value
    var tarih = new Date();
    kat.kaytarih = tarih.getTime().toString();
    kat.duztarih = tarih.getTime().toString();
    console.log(kat);
    this.fbservice.KategoriEkle(kat);
    this.toast.success("Soru Başarıyla Eklendi");
    this.modal.toggle();
  }
  KategoriSil() {
    this.fbservice.KategoriSil(this.secKat);
    this.toast.success("Soru Başarıyla Silindi");
    this.modal.toggle();
  }
  KategoriDuzenle(){
this.kategori=this.secKat;
this.kategori.adi=this.frm.value.adi;
var tarih=new Date();
this.kategori.duztarih = tarih.getTime().toString();
this.fbservice.KategoriDuzenle(this.kategori);
this.toast.success("Soru Başarıyla Düzenlendi");
this.modal.toggle();
  }
}
