import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import APP from '../common/constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private titleService: Title) {}

  setTitle(title: string) {
    this.titleService.setTitle(title ? `${title} - ${APP.NAME}` : APP.NAME);
  }
}
