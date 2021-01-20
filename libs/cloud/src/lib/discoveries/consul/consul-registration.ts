import { Registration, Service } from '../../interfaces';
import { ConsulDiscoveryOptions } from './interfaces';
import { ConsulUtils } from './utils';

export class ConsulRegistration implements Registration {
  constructor(
    private newService: Service,
    private discoveryOptions: ConsulDiscoveryOptions
  ) {}

  getService(): Service {
    return this.newService;
  }

  getInstanceId(): string {
    return this.newService.id || '';
  }

  getServiceId(): string {
    return this.newService.name;
  }

  getHost(): string {
    return this.newService.address || '';
  }

  getPort(): number {
    return this.newService.port || 0;
  }

  isSecure(): boolean {
    return this.discoveryOptions.scheme === 'https';
  }

  getUri(): string {
    const scheme = this.getScheme();
    return `${scheme}://${this.getHost()}:${this.getPort()}`;
  }

  getScheme(): string {
    return this.discoveryOptions.scheme || 'http';
  }

  getMetadata(): Map<string, string> {
    const tags = this.newService.tags || [];
    return ConsulUtils.getMetadata(tags);
  }
}