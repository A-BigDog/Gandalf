/**
 * Gandalf theme — browser client half (v10: pure-CSS injection, no theme service).
 *
 * 用户需求（最终拍板）：界面保持 DSH 默认观感，只加
 * ① 甘道夫朝阳背景图（原图直出）
 * ② Cinzel 标题字体
 * ③ 半透明面板让背景透出。
 *
 * 实现：inject 空依赖 + apply 注入一张 <style>（data-plugin 归属，
 * loader 卸载时自动移除）。CSS 内用 body 级变量覆盖（!important 压过
 * presenter 的内联变量），不注册主题、不调用 theme 服务——绕开
 * cordis 服务解析/HMR 重载的时序问题（v9 实验证实 theme 服务路径不稳定，
 * 纯 CSS 路径稳定）。
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { GANDALF_TOKENS } from './tokens.ts'
import { GANDALF_CSS } from './theme.css.ts'

export const name = 'gandalf-theme'

/** No service dependencies — nothing to wait for, nothing to re-resolve. */
export const inject: string[] = []

const STYLE_TAG_ID = 'gandalf-theme-styles'

/** Build the body-level variable override block from the token table. */
function tokenOverridesCss(): string {
  const lines = Object.entries(GANDALF_TOKENS).map(([name, value]) => `  ${name}: ${value} !important;`)
  return `body {\n${lines.join('\n')}\n}`
}

/**
 * Client plugin body.
 * @param ctx - client cordis context.
 */
export function apply(_ctx: ClientContext): void {
  const style = document.createElement('style')
  style.id = STYLE_TAG_ID
  style.dataset.plugin = name
  style.textContent = tokenOverridesCss() + '\n' + GANDALF_CSS
  ;(document.head ?? document.documentElement).appendChild(style)
}
