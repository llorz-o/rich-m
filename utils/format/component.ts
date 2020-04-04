import * as Xconf from '@/x.config'

export const getComponentName = (name: string): string => {
  return Xconf.tagPrefix ? Xconf.tagPrefix + name : name
}
