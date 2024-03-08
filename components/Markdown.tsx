import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

const Markdown: FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => <a className="undeline" {...props} target="_blank" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
