import { Component, Input } from '@angular/core';
import { Category } from '../data.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent {
  constructor (private _dataService: DataService) { }

  @Input() model!: Category;
  isEditMode = false;
  updatedName;

  deleteCategory () {
    this._dataService.deleteCategory(this.model);
  }

  editCategory () {
    this.isEditMode = true;
    this.updatedName = this.model.name;
  }

  saveChanges () {
    this._dataService.updateCategory(this.model, this.updatedName);
    this.isEditMode = false;
  }

  cancelChanges () {
    this.isEditMode = false;
    this.updatedName = this.model.name;
  }
}
