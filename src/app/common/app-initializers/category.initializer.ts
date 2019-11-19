import { CategoryService } from "../../modules/categories/category.service";

export function categoryProviderFactory(provider: CategoryService) {
  return () => provider.load();
}
