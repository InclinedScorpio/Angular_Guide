import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe;
  @Output() receipeClicked = new EventEmitter<void>();

  receipeClickedFn() {
    this.receipeClicked.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
