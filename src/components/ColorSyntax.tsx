import hljs from 'highlight.js/lib/core'
import lua from 'highlight.js/lib/languages/lua'
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('lua', lua)

export function Lua({ code, className = '' }: { code: string; className?: string }) {
  const html = hljs.highlight(code, { language: 'lua' }).value

  return <code className={className} dangerouslySetInnerHTML={{ __html: html }} />
}