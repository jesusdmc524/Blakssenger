import { Component } from '@angular/core';

/**
 * Generated class for the FriendsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'friends',
  templateUrl: 'friends.html'
})
export class FriendsComponent {

  text: string;

  constructor() {
    console.log('Hello FriendsComponent Component');
    this.text = 'Hello World';
  }

}
