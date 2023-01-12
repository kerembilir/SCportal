import { Uye } from './../models/Uye';

import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { ilan } from '../models/cevap';
import { Kategori } from '../models/soru';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  aktifUye = authState(this.auth);
  constructor(
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage
  ) { }

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uye', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }

  ilanListele() {
    var ref = collection(this.fs, "İlan");
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('uid', '==', user?.uid)
        );
        return collectionData(myQuery, { idField: 'id' }) as Observable<ilan[]>;
      })
    );
  }
  ilanEkle(ilan: ilan) {
    var ref = collection(this.fs, "ilanler");
    return this.aktifUye.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          ilanadi: ilan.ilanadi,
          ilankredi: ilan.ilankredi,
          categoryId: ilan.categoryId,
          kaytarih: ilan.kaytarih,
          duztarih: ilan.duztarih,
          uid: user?.uid
        })
      ),
      map((ref) => ref.id)
    );
  }
  ilanDuzenle(ilan: ilan) {
    var ref = doc(this.fs, "ilanler/" + ilan.id);
    return updateDoc(ref, { ...ilan });
  }
  İlanSil(ilan: ilan) {
    var ref = doc(this.fs, "ilanler/" + ilan.id);
    return deleteDoc(ref);
  }

  UyeListele() {
    var ref = collection(this.fs, "Uye");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uye', uye.uid);
    return from(setDoc(ref, uye));
  }
  KategoriEkle(kategori: Kategori) {
    var ref = collection(this.fs, "Kategori");
    return addDoc(ref,kategori);  
  }
  KategoriListele() {
    var ref = collection(this.fs, "Kategori");
    return collectionData(ref, { idField: 'id' }) as Observable<Kategori[]>;

  }
    KategoriSil(kategori:Kategori){
    var ref = doc(this.fs, "Kategori/" + kategori.id);
    return deleteDoc(ref);
  }
    KategoriDuzenle(Kategori: Kategori) {
    var ref = doc(this.fs, "Kategori/" + Kategori.id);
    return from(updateDoc(ref, { ...Kategori }));
  }  
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Uye", uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, "Uye", uye.uid);
    return deleteDoc(ref);
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
