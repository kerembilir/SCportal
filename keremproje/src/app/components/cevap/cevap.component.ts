import { ActivatedRoute } from '@angular/router';
import { Kategori } from '../../models/soru';

import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ilan } from 'src/app/models/cevap';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-cevap',
  templateUrl:'./cevap.component.html',
  styleUrls: ['./cevap.component.scss']
})
export class ilanComponent implements OnInit {
  ilanlar!: ilan[];
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secilan!: ilan;
  katId: number = 0;

  // sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    ilanadi: new FormControl(),
    ilankredi: new FormControl(),
    categoryId: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public fbservice: FbservisService,

    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();

      }
    });
    this.KategoriListele();
  }
  KatSec(katId: number) {
    this.katId = katId;
    this.KategoriGetir();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      categoryId: this.katId
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Cevabı Ekle";
    this.modal.show();
  }
  Duzenle(ilan: ilan, el: HTMLElement) {
    this.frm.patchValue(ilan);
    this.modalBaslik = "Cevabı Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ilan: ilan, el: HTMLElement) {
    this.secilan = ilan;
    this.modalBaslik = "Cevabı Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  ilanListele() {
    this.servis.ilanListeleByKatId(this.katId).subscribe(d => {
      this.ilanlar = d;
    });
  }
  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriGetir() {
    this.servis.KategoriById(this.katId).subscribe(d => {
      // this.secKat = d;
      this.ilanListele();
    });
  }
  ilanEkleDuzenle() {
    var ilan: ilan = this.frm.value
    var tarih = new Date();
    ilan.kaytarih = tarih.getTime().toString();
    ilan.duztarih = tarih.getTime().toString();
    this.fbservice.ilanEkle(ilan);
  }
  ilanSil() {
    this.servis.ilanSil(this.secilan.id).subscribe(d => {
   //toast
      this.ilanListele();
      this.modal.toggle();
    });
  }
}
