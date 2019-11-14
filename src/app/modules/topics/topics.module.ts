import { NgModule } from '@angular/core';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsWithoutRoutingModule } from './topics-without-routing.module';

@NgModule({
  imports: [TopicsRoutingModule, TopicsWithoutRoutingModule]
})
export class TopicsModule {}
