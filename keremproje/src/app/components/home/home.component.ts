import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  favButon = 'false';
  favButon2 = "false";
  favButon3 = "false";
  favButon4 = "false";
  constructor(
    public servis: DataService
  ) {

  }

  ngOnInit(): void {

  }

  favbuton1(){
    if(this.favButon == 'false'){
      this.favButon = "true";
    } else if(this.favButon == 'true'){
      this.favButon = "false";
    }

  }
  favbuton2(){
    if(this.favButon2 == 'false'){
      this.favButon2 = "true";
    } else if(this.favButon2 == 'true'){
      this.favButon2 = "false";
    }
  }
  favbuton3(){
    if(this.favButon3 == 'false'){
      this.favButon3 = "true";
    } else if(this.favButon3 == 'true'){
      this.favButon3 = "false";
    }
  }
  favbuton4(){
    if(this.favButon4 == 'false'){
      this.favButon4 = "true";
    } else if(this.favButon4 == 'true'){
      this.favButon4 = "false";
    }
  }
}

