// Import all available components from the htmldocs library
import { Document, Head, Page, Footer, MarginBox, Spacer } from '@htmldocs/react';
import * as React from 'react';
// Import CSS for Tailwind support
import "~/index.css";

// Main template component showcasing all htmldocs features
export default function Index() {

  return (
    <Document size="A4" orientation="portrait" margin="0.75in">
      <Head>
        <title>Document Template</title>
        {/* 
          IMPORTANT FOR AI: 
          - Do NOT add Google Fonts links (may be blocked/slow loading)
          - Do NOT add local font files that don't exist 
          - Use only system fonts and Tailwind defaults
          - Keep Head section minimal for fast rendering
        */}
      </Head>

      {/* Page header in margin - shows on all pages */}
      <MarginBox 
        position="top-right" 
        runningName="header-info"
        className="text-xs text-gray-500"
      >
        Doc-001 | 2025
      </MarginBox>

      {/* Page footer with numbering */}
      <Footer className="text-xs text-gray-500 text-center">
        {({ currentPage, totalPages }) => (
          <span>Page {currentPage} of {totalPages}</span>
        )}
      </Footer>

      <Page className="text-gray-900">
        {/* Clean document header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Document Title</h1>
          <p className="text-gray-600 text-lg">Professional Document Template</p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </div>

        {/* Essential info section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Document Details</h3>
              <div className="space-y-2 text-sm">
                <div>Date: September 26, 2025</div>
                <div>Reference: DOC-001</div>
                <div>Status: Draft</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div>Company Name</div>
                <div>contact@company.com</div>
                <div>(555) 123-4567</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            This document template demonstrates clean, professional formatting with essential 
            components. It includes headers, footers, spacing controls, and multi-page support 
            while maintaining fast loading times and visual clarity.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          
          {/* Feature highlights in clean boxes */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-semibold text-blue-600 mb-2">Layout Control</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• A4 page sizing</li>
                <li>• Automatic page breaks</li>
                <li>• Margin management</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded p-4">
              <h4 className="font-semibold text-green-600 mb-2">Content Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Headers and footers</li>
                <li>• Page numbering</li>
                <li>• Spacing control</li>
              </ul>
            </div>
          </div>

          <Spacer height={24} />

          {/* Data presentation example */}
          <h2 className="text-2xl font-semibold mb-4">Sample Data Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Component A</td>
                  <td className="border border-gray-300 px-4 py-2">Essential feature</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">100%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Component B</td>
                  <td className="border border-gray-300 px-4 py-2">Optional feature</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clean conclusion */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            This template provides a solid foundation for professional documents with 
            clean formatting, essential features, and fast rendering. All components 
            use reliable system fonts and minimal external dependencies.
          </p>
        </div>
      </Page>

      {/* Second page example */}
      <Page className="text-gray-900">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Additional Content</h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Multi-page Support</h3>
            <p className="text-sm text-blue-700">
              Content automatically flows to new pages. Headers and footers 
              appear consistently across all pages.
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Section One</h3>
              <p className="text-gray-700 mb-4">
                Content for the first major section goes here. This demonstrates 
                how text flows naturally within the document structure.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Section Two</h3>
              <p className="text-gray-700 mb-4">
                Additional content sections can be added as needed. The template 
                maintains consistent formatting throughout.
              </p>
            </div>

            <Spacer height={32} />

            <div>
              <h3 className="text-xl font-semibold mb-3">Lists and Formatting</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Ordered List:</h4>
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Bullet List:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Key point one</li>
                    <li>Key point two</li>
                    <li>Key point three</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Spacer height={40} />
        </div>
      </Page>
    </Document>
  );
}