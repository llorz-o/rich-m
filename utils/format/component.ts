import * as Xconf from '@/config'

export const getComponentName = (name: string): string => {
  return Xconf.tagPrefix ? Xconf.tagPrefix + name : name
}
