"use client";
import { Fragment } from "react";
import { Highlight, themes } from "prism-react-renderer";

export function CodeHighlight({ codeBlock }: any) {
  return (
    <Highlight theme={themes.dracula} code={codeBlock} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
