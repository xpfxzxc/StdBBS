import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Scroller {
  constructor() {}

  visit(selector: string, arg: boolean | ScrollIntoViewOptions): void {
    const targetElement = document.querySelector(selector);
    if (targetElement) {
      targetElement.scrollIntoView(arg);
    }
  }
}
