import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/model/auth';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string = '';
  username: string = '';
  password: string = '';

  auth: Auth = new Auth();

  constructor(private authService: AuthService, private route: Router){

  }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.name = '';
  }

  signup(){
    this.auth.username = this.username;
    this.auth.password = this.password;
    this.auth.name = this.name;
    this.auth.role = "admin";



    this.authService.signUp(this.auth).subscribe(res => {
      if(res==null){
        alert("Registration failed");
        this.ngOnInit();
      }
      else{
        console.log("Registration successfull");
        alert("Registration successfull");
        this.route.navigate(['/']);
      }
    },err => {
      alert("Registration failed");
      this.ngOnInit();
    })
  }

}
