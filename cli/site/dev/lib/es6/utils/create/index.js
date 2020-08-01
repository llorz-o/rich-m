import { createComponent } from './component';
import { createBEM } from './bem';
import { getComponentName } from '../format';
export function createNamespace(name) {
  name = getComponentName(name);
  return [createComponent(name), createBEM(name)];
}