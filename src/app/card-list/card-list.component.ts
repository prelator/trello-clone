import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass']
})
export class CardListComponent implements OnInit {

  constructor (private _dataService: DataService) { }

  categories;

  ngOnInit() {
    this.categories = this._dataService.getCategories();
    console.log(this.categories);
  }

}
