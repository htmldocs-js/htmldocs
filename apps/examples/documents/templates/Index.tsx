import { Document, Head, Page, Footer } from '@htmldocs/react';
import * as React from 'react';

export default function Index() {
  return (
    <Document size="A4" orientation="portrait">
      <Head>
        <title>My Document</title>
        <style>{`
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 40px;
            background: #f9f9f9;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 60px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
          }
          .title {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #2c3e50;
          }
          .subtitle {
            font-size: 1.2em;
            color: #7f8c8d;
          }
          .content {
            font-size: 16px;
            margin-bottom: 30px;
          }
          .highlight {
            background: #fff3cd;
            padding: 20px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
          }
        `}</style>
      </Head>
      
      <Page>
        <div className="container">
          <div className="header">
            <h1 className="title">Welcome to HTMLDocs 666 98623</h1>
            <p className="subtitle">Single File Mode</p>
          </div>
          
          <div className="content">
            <p>
              This is your <strong>Index.tsx</strong> file. Edit this file to see changes in real-time!
            </p>
            
            <div className="highlight">
              <p><strong>📝 Note:</strong> This application now only monitors changes to this Index.tsx file. 
              All other UI elements have been simplified for a clean, focused experience.</p>
            </div>
            
            <h2>Features:</h2>
            <ul>
              <li>✅ Single file monitoring</li>
              <li>✅ Clean, minimal UI</li>
              <li>✅ Hot reload for Index.tsx only</li>
              <li>✅ Direct rendering without navigation</li>
            </ul>
            
            <p>
              Try editing this file to see the hot reload in action! The changes will appear 
              instantly without any need to refresh the page.
            </p>
          </div>
        </div>
      </Page>
    </Document>
  );
}