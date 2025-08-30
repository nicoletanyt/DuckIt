'use client'

import React, { useState } from 'react';

// Simple markdown parser for basic features
const parseMarkdown = (text: string) => {
  if (!text) return '';
  
  // Split into lines for processing
  const lines = text.split('\n');
  const result: string[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check for list items
    const unorderedMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
    const orderedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    
    if (unorderedMatch) {
      if (!inUnorderedList) {
        result.push('<ul>');
        inUnorderedList = true;
      }
      if (inOrderedList) {
        result.push('</ol>');
        inOrderedList = false;
      }
      result.push(`<li>${unorderedMatch[2]}</li>`);
    } else if (orderedMatch) {
      if (!inOrderedList) {
        result.push('<ol>');
        inOrderedList = true;
      }
      if (inUnorderedList) {
        result.push('</ul>');
        inUnorderedList = false;
      }
      result.push(`<li>${orderedMatch[2]}</li>`);
    } else {
      // Close any open lists
      if (inUnorderedList) {
        result.push('</ul>');
        inUnorderedList = false;
      }
      if (inOrderedList) {
        result.push('</ol>');
        inOrderedList = false;
      }
      
      // Process regular line
      if (line.trim() === '') {
        result.push('<br />');
      } else {
        result.push(line);
      }
    }
  }
  
  // Close any remaining open lists
  if (inUnorderedList) result.push('</ul>');
  if (inOrderedList) result.push('</ol>');
  
  // Join and apply other markdown formatting
  let html = result.join('\n')
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Custom highlights
    .replace(/==red==(.*?)==\/red==/g, '<span class="highlight-red">$1</span>')
    .replace(/==green==(.*?)==\/green==/g, '<span class="highlight-green">$1</span>')
    .replace(/==yellow==(.*?)==\/yellow==/g, '<span class="highlight-yellow">$1</span>');
  
  return html;
};

const MarkdownRenderer = () => {
  const [markdownText, setMarkdownText] = useState(`# Markdown with Custom Highlights

This is a **bold** text and this is *italic* text.

## Code Example
Here's some \`inline code\` in the text.

## Lists Support

### Unordered Lists (using - or *)
- First item with ==red==red highlight==/red==
- Second item
* Third item using asterisk
* Fourth item with ==green==green highlight==/green==

### Ordered Lists
1. First numbered item
3. Second item (numbers don't need to be in order)
2. Third item with ==yellow==yellow highlight==/yellow==
5. Fourth item

## Mixed Content
You can combine lists with other formatting:

- **Bold list item**
- *Italic list item*  
- List item with \`code\`
- ==red==Highlighted list item==/red==

1. **First** numbered item
2. Item with ==green==success highlight==/green==
3. Final item

### Custom Highlighting
You can highlight text in different colors:
- ==red==Important warning text==/red==
- ==green==Success messages==/green==  
- ==yellow==Notes and tips==/yellow==

You can also combine **bold** with ==red==highlighted red text==/red== for emphasis.`);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <style dangerouslySetInnerHTML={{
        __html: `
          .highlight-red {
            background-color: #fee2e2;
            color: #dc2626;
            padding: 2px 4px;
            border-radius: 3px;
          }
          .highlight-green {
            background-color: #dcfce7;
            color: #16a34a;
            padding: 2px 4px;
            border-radius: 3px;
          }
          .highlight-yellow {
            background-color: #fef3c7;
            color: #d97706;
            padding: 2px 4px;
            border-radius: 3px;
          }
          .markdown-content h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 1rem 0;
            color: #1f2937;
          }
          .markdown-content h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0.75rem 0;
            color: #374151;
          }
          .markdown-content h3 {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0.5rem 0;
            color: #4b5563;
          }
          .markdown-content {
            color: #000000ff;
          }
          .markdown-content code {
            background-color: #f3f4f6;
            color: #374151;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.875rem;
          }
          .markdown-content ul {
            list-style-type: disc;
            margin: 0.5rem 0;
            padding-left: 1.5rem;
          }
          .markdown-content ol {
            list-style-type: decimal;
            margin: 0.5rem 0;
            padding-left: 1.5rem;
          }
          .markdown-content li {
            margin: 0.25rem 0;
            line-height: 1.5;
          }
          .markdown-content strong {
            font-weight: bold;
          }
          .markdown-content em {
            font-style: italic;
          }
        `
      }} />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Markdown Editor with Custom Highlighting
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Input Section */}
          <div className="border-r border-gray-200">
            <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
              Markdown Input
            </div>
            <textarea
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
              className="w-full h-96 p-4 font-mono text-sm border-none resize-none focus:outline-none"
              placeholder="Enter your markdown here..."
            />
          </div>
          
          {/* Output Section */}
          <div>
            <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
              Rendered Output
            </div>
            <div 
              className="h-96 p-4 overflow-auto markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: parseMarkdown(markdownText) 
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Highlighting Syntax:</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div><code className="bg-white px-2 py-1 rounded">==red==text==//red==</code> → Red highlight</div>
          <div><code className="bg-white px-2 py-1 rounded">==green==text==//green==</code> → Green highlight</div>
          <div><code className="bg-white px-2 py-1 rounded">==yellow==text==//yellow==</code> → Yellow highlight</div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownRenderer;