import { createComponent } from './component'
import { createBEM, BEM } from './bem'
import { getComponentName } from '../format'

type createNamespaceReturn = [ReturnType<typeof createComponent>, BEM]

export function createNamespace(name: string): createNamespaceReturn {
  name = getComponentName(name)
  return [createComponent(name), createBEM(name)]
}
