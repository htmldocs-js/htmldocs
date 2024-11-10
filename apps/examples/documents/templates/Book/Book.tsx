import { Document, Page, Head, Footer } from "@htmldocs/react"
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
    <Document size="A4" orientation="portrait" margin="1.5in">
      <article className="prose prose-lg max-w-none font-serif">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <Footer position="bottom-center" showPageNumbers={true} />
    </Document>
  )
}

Book.documentId = "book"

export default Book
