import { XsrfTokenService } from '../../services/xsrf-token.service';

export function xsrfTokenProviderFactory(provider: XsrfTokenService) {
  return () =>
    new Promise(resolve => {
      provider.fetch().subscribe(() => resolve());
    });
}
