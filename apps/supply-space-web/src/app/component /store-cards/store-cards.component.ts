import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'supply-space-store-cards',
  templateUrl: './store-cards.component.html',
  styleUrls: ['./store-cards.component.scss']
})
export class StoreCardsComponent implements OnInit {
  @Input() store
  @Output() emitEditEvent:EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  editStore(id){
    this.emitEditEvent.emit(id)
  }
}
