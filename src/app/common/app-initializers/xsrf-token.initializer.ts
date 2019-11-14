import { XsrfTokenService } from '../../services/xsrf-token.service';

export function xsrfTokenProviderFactory(provider: XsrfTokenService) {
  return () => provider.fetch().toPromise();
}
