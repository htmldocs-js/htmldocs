import { Document, Footer } from "@htmldocs/react"
import MarkdownIt from 'markdown-it'
import fs from 'node:fs'
import path from "path"

import "~/index.css"

const content = fs.readFileSync(
  path.join(process.env.DOCUMENTS_DIR_RELATIVE_PATH ?? '', '/static/content.md'),
  'utf-8'
)

const md = new MarkdownIt({ html: true })

function Book() {
  const html = md.render(content)
  
  return (
    <Document size="6in 9in" orientation="portrait" margin="0.75in">
      <article className="prose max-w-none font-serif">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <Footer 
        position="bottom-center"
        className="font-serif text-sm"
        children={({ currentPage }) => currentPage}
        marginBoxStyles={{
          marginBottom: '0.25in',
        }}
      />
    </Document>
  )
}

Book.documentId = "book"

export default Book
