import { Component } from '@angular/core';
import { DataService } from './data.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [ DataService ]
})
export class AppComponent {
  title = 'Trello Clone';

  closeResult;
  newCardCategory = this.getCategories()[0];
  newCardText = '';
  newCatName = '';

  constructor (private modalService: NgbModal, private _dataService: DataService) {}

  openCardModal (content) {
    this.modalService.open(content, {ariaLabelledBy: 'card-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this._dataService.createCard(this.newCardText, this.newCardCategory);
      this.resetCardModal();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
      this.resetCardModal();
    });
  }

  openCategoryModal (content) {
    this.modalService.open(content, {ariaLabelledBy: 'category-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this._dataService.createCategory(this.newCatName);
      this.resetCategoryModal();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
      this.resetCategoryModal();
    });
  }

  getCategories () {
    return this._dataService.getCategoryNames();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private resetCardModal() {
    this.newCardCategory = this.getCategories()[0];
    this.newCardText = '';
  }

  private resetCategoryModal() {
    this.newCatName = '';
  }
}
