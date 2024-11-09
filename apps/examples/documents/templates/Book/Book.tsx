import { Document, Page, Head } from "@htmldocs/react"
import MarkdownIt from 'markdown-it'
import fs from 'node:fs'
import path from 'node:path'

import "~/index.css"

const content = fs.readFileSync(
  path.join(__dirname, 'content.md'),
  'utf-8'
)

const md = new MarkdownIt({ html: true })

function Book() {
  const html = md.render(content)
  
  return (
    <article className="prose prose-sm max-w-none">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}

Book.documentId = "book"

export default Book
