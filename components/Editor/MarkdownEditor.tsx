import React from "react";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "./Editor.css";
import html2pdf from "html2pdf.js";
import { marked } from "marked";

const mkdStr = `# Markdown Editor
---
**Hello world!!!**
[![avatar](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)
\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';
\`\`\``;

const Editor = () => {
  const [value, setValue] = React.useState(mkdStr);

  const handleExportPDF = () => {
    const html = marked(value, { breaks: true });
    const date = new Date();
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const opt = {
      margin: 1,
      filename: `markdown_${dateString}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" }, // Set page size to A4 and orientation to landscape
    };
    html2pdf().from(html).set(opt).save();
  };

  return (
    <div>
      <MDEditor value={value} onChange={setValue} />
      <button onClick={handleExportPDF}>Export as PDF</button>
    </div>
  );
};

export default Editor;
