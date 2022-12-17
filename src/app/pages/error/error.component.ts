import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  error : string ="";
  constructor(private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.initError();
  }

  initError() : void{
    //Get the error passed in the route
    if(history.state.data){
      this.error = history.state.data;
    }
    else {
      this.error="";
      this.router.navigateByUrl('not-found');
    }
    
  }

}
