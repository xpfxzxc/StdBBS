import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesResolverService } from './categories/categories-resolver.service';
import { TopicsWithoutRoutingModule } from '../topics/topics-without-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CategoriesRoutingModule, CommonModule, TopicsWithoutRoutingModule, SharedModule],
  providers: [CategoriesResolverService]
})
export class CategoriesModule {}
