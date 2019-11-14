import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoriesResolverService } from './categories/categories-resolver.service';

const categoriesRoutes: Routes = [
  {
    path: ':id',
    component: CategoriesComponent,
    resolve: {
      topicPagination: CategoriesResolverService
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoriesRoutes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
