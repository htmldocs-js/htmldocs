const DocumentComponentImport = require("./Invoice")
console.log("DocumentComponentImport", DocumentComponentImport)
const DocumentComponent = DocumentComponentImport.default
const renderAsync = DocumentComponentImport.renderAsync
const fs = require('node:fs');
const path = require('node:path');

async function renderDocument() {
    const markup = await renderAsync(DocumentComponent(DocumentComponent.PreviewProps))
    const indexPath = path.join(__dirname, 'index.html');
    fs.writeFileSync(indexPath, markup);
}

renderDocument()
