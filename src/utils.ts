import { computed, type Ref } from 'vue'
import { COMPUTED_ATTR_STYLES } from './constants'

export const useComputedStyle = (target: Ref<HTMLElement>, { attrs }: any) => {
  const _style: Record<string, string> = {}

  const targetComputedStyle = getComputedStyle(target.value)
  COMPUTED_ATTR_STYLES.forEach((key: string) => {
    _style[key] = targetComputedStyle[key as any]
  })

  const attrStyle = computed(() => attrs?.style ?? {})

  const style = computed(() => ({ ..._style, ...attrStyle.value }))

  return { style }
}
