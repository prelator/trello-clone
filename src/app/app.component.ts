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
  categories = this._dataService.getCategoryNames();
  newCardCategory = this.categories[0];
  newCardText = '';

  constructor (private modalService: NgbModal, private _dataService: DataService) {}

  openModal (content) {
    this.modalService.open(content, {ariaLabelledBy: 'card-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(`${this.closeResult}, ${this.newCardCategory}, ${this.newCardText}`);
      this._dataService.createCard(this.newCardText, this.newCardCategory);
      this.resetModal();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
      this.resetModal();
    });
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

  private resetModal() {
    this.newCardCategory = this.categories[0];
    this.newCardText = '';
  }
}
