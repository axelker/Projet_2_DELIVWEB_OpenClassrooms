import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  subscribe! : Subscription;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.subscribe = this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }

  ngOnDestroy() : void {
    this.subscribe.unsubscribe();
  }
}
