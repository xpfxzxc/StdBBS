import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  category: Category;

  constructor(private readonly categoryService: CategoryService, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { id: number }) => {
      this.category = this.categoryService.categories[data.id - 1];
    });
  }
}
