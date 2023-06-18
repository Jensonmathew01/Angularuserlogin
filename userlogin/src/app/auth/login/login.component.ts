import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/model/auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = '';
  password : string = '';
  role : string = '';

  auth: Auth = new Auth();
  roles : string[];

  constructor(private authService: AuthService,private route:Router){
    this.roles=[
      'admin',
      'user'
    ]
  }
  ngOnInit(): void {
    this.username='';
    this.password='';

  }
  login(){
    this.auth.username=this.username;
    this.auth.password=this.password;
    this.auth.role=this.role;

    this.authService.login(this.auth).subscribe(res=>{
      if(res==null){
        alert("Username or password is wrong");
        this.ngOnInit();
      }
      else{
        console.log("Login successful");
        localStorage.setItem("token",res.token);

      if(this.role=='user'){
        this.route.navigate(['/user']);
      }
      if(this.role=='admin'){
        this.route.navigate(['/admin']);
      }
    }

  }, err=>{
    alert("Login failed");
    this.ngOnInit();
  })
 }

}
