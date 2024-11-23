import { Document, Head } from "@htmldocs/react"

function CustomFont() {
  return (
    <Document size="A4" orientation="portrait">
      <Head>
        <style>
            {`
            @font-face {
                font-family: 'PPEiko';
                src: url('/static/fonts/PPEiko-Medium.otf') format('opentype');
                font-weight: normal;
                font-style: normal;
            }
            `}
        </style>
      </Head>
      <div style={{ fontFamily: 'PPEiko' }}>
        Text using custom font
      </div>
    </Document>
  )
}

CustomFont.documentId = "CustomFont"

export default CustomFont