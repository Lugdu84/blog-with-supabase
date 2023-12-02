/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/no-unstable-nested-components */
import Markdown from 'react-markdown'
import rehypeHightlight from 'rehype-highlight'
import 'highlight.js/styles/arta.css'
import { PiTerminalThin } from 'react-icons/pi'
import { cn } from '@/lib/utils'
import CopyButton from './copy-button'

type MarkdownPreviewProps = {
  content: string
  className?: string
}

export default function MarkdownPreview({
  content,
  className,
}: MarkdownPreviewProps) {
  return (
    <Markdown
      rehypePlugins={[rehypeHightlight]}
      className={cn('space-y-5', className)}
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-3xl font-bold" />
        ),
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-2xl font-bold" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-xl font-bold" />
        ),
        // eslint-disable-next-line no-shadow
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '')
          if (match?.length) {
            const Icon = PiTerminalThin
            const meta = node?.data as { meta?: string }
            const id = (Math.floor(Math.random() * 100) + 1).toString()
            return (
              <div className="bg-gradient-dark text-gray-300 border rounded-md">
                <div className="px-5 py-2 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon />
                    <span>{meta?.meta}</span>
                  </div>
                  <CopyButton id={id} />
                </div>
                <div className="overflow-x-auto w-full">
                  <div className="p-5" id={id}>
                    {children}
                  </div>
                </div>
              </div>
            )
          }
          return <code className="bg-red-700 rounded-md px-2">{children}</code>
        },
      }}
    >
      {content}
    </Markdown>
  )
}
