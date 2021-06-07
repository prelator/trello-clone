import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Category {

  name;
  children;

  constructor (name: String) {
    this.name = name;
    this.children = [
    ];
  }

  public getName () {
    return this.name;
  }

  public setName (name: string) {
    this.name = name;
    this.children.forEach(card => {
      card.setCategory(this.name);
    });
  }

  public getChildren () {
    return this.children;
  }

  public addChild (card:Card) {
    this.children.push(card);
  }

  public removeChild (card:Card) {
    const cardIndex = this.children.indexOf(card);
    this.children.splice(cardIndex, 1);
  }
}

export class Card {

  text;
  category;
  id;

  constructor (text:string, category:string, id:number) {
    this.text = text;
    this.category = category;
    this.id = id;
  }

  public getText () {
    return this.text;
  }

  public setText (text:string) {
    this.text = text;
  }

  public getCategory () {
    return this.category;
  }

  public setCategory (category:string) {
    this.category = category;
  }
}

export class DataService {
  private categoryList:Category[] = [];
  private lastCardId:number = 0;

  constructor () {}

  private populateCategories () {
    this.categoryList = [
      new Category('To Do'),
      new Category('In Progress'),
      new Category('Done')
    ];

    this.createCard('Do something and then something else.', 'To Do');
    this.createCard('Do all the things.', 'In Progress');
  }

  public getCategories () {
    if (this.categoryList.length === 0) {
      this.populateCategories();
    }

    return this.categoryList;
  }

  public getCategoryNames () {
    return this.getCategories().map(category => {
      return category.name;
    })
  }

  public createCategory (name: string) {
    const newCat = new Category(name);
    this.categoryList.push(newCat);
  }

  public deleteCategory (category: Category) {
    const matchingCatIndex = this.categoryList.indexOf(category);
    if (matchingCatIndex !== -1) {
      this.categoryList.splice(matchingCatIndex, 1);
    }
  }

  public createCard (text:string = '', category:string = '') {
    const card = new Card(text, category, this.lastCardId + 1);
    this.lastCardId = card.id;
    const matchingCategory = this.categoryList.find(cat => cat.name === card.category);
    if (matchingCategory) {
      matchingCategory.addChild(card);
    } else {
      console.error(`Invalid category for new card: ${category}`)
    }
  }

  public updateCard (card: Card, updatedText:string = '', updatedCategory:string = '') {
    if (card.text !== updatedText) {
      card.setText(updatedText);
    }
    if (card.category !== updatedCategory) {
      const oldMatchingCategory = this.categoryList.find(cat => cat.name === card.category);
      const newMatchingCategory = this.categoryList.find(cat => cat.name === updatedCategory);
      card.setCategory(updatedCategory);
      oldMatchingCategory?.removeChild(card);
      newMatchingCategory?.addChild(card);
    }
  }

  public deleteCard (card: Card) {
    const matchingCategory = this.categoryList.find(cat => cat.name === card.category);
    matchingCategory?.removeChild(card);
  }

}
