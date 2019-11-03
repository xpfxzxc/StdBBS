import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor() {}

  load(file: File): Observable<HTMLImageElement> {
    return new Observable(subscriber => {
      const fr = new FileReader();

      fr.onload = () => {
        const image = new Image();
        image.onload = () => {
          subscriber.next(image);
          subscriber.complete();
        };
        image.onerror = err => {
          subscriber.error('图片加载失败');
        };
        image.src = fr.result as string;
      };

      fr.readAsDataURL(file);
    });
  }
}
