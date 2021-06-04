import { Component, Input } from '@angular/core';
import { Card } from '../data.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})

export class CardComponent {
  constructor (private _dataService: DataService) { }

  @Input() model!: Card

  categories = this._dataService.getCategoryNames();
  isEditMode = false;
  updatedCategory;
  updatedText;

  deleteCard () {
    this._dataService.deleteCard(this.model);
  }

  editCard () {
    this.isEditMode = true;
    this.updatedCategory = this.model.category;
    this.updatedText = this.model.text;
  }

  saveChanges () {
    this.isEditMode = false;
    this._dataService.updateCard(this.model, this.updatedText, this.updatedCategory)
  }
}
