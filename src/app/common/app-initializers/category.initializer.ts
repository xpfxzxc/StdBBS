import { CategoryService } from '../../modules/categories/category.service';

export function CategoryProviderFactory(provider: CategoryService) {
  return () => provider.load();
}
