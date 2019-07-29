import { NgModule } from '@angular/core';
import { FriendsComponent } from './friends/friends';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [FriendsComponent],
	imports: [CommonModule],
	exports: [FriendsComponent]
})
export class ComponentsModule {}
