import { Component, Input } from '@angular/core';
import { Category } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent {
  @Input() model!: Category
}
