import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ImageService } from '../../services/image.service';

@Injectable({ providedIn: 'root' })
export class ImageValidator {
  constructor(private readonly imageService: ImageService) {}

  Image = () => {
    return (formControl: FormControl): Observable<ValidationErrors | null> => {
      const file = formControl.value;

      if (!file) {
        return of(null);
      }

      return this.imageService.load(file).pipe(
        map(_ => null),
        catchError(_ => of({ image: true }))
      );
    };
  };

  dimension = (options: { minWidth?: number; minHeight?: number; maxWidth?: number; maxHeight?: number }) => {
    return (formControl: FormControl): Observable<ValidationErrors | null> => {
      const file = formControl.value;

      if (!file) {
        return of(null);
      }

      const { minWidth, minHeight, maxWidth, maxHeight } = options;

      return this.imageService.load(file).pipe(
        map(image => {
          const width = image.naturalWidth;
          const height = image.naturalHeight;

          return (minWidth ? width < minWidth : false) ||
            (minHeight ? height < minHeight : false) ||
            (maxWidth ? width > maxWidth : false) ||
            (maxHeight ? height > maxHeight : false)
            ? { imageDimension: true }
            : null;
        }),
        catchError(_ => of({ image: true }))
      );
    };
  };
}
