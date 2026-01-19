import JSONEditor from "jsoneditor";
import { useRef, useEffect } from "react";

import "jsoneditor/dist/jsoneditor.css";
import "./SchemaEditor.css";
import { Playground } from "../Playground/Context/Context";

export default function SchemaEditor({
  isExtract = false,
}: {
  isExtract?: boolean;
}) {
  const containerRef = useRef(null);
  const editorRef = useRef<JSONEditor | undefined>(undefined);
  const form = Playground.useForm();

  useEffect(() => {
    editorRef.current = new JSONEditor(containerRef.current!, {
      mode: "code",
      mainMenuBar: false,
      statusBar: false,
      navigationBar: false,
      enableSort: false,
      enableTransform: false,
      history: false,
      onChange: () => {
        if (isExtract) {
          form.setValue("extractSchema", editorRef.current?.get());
        } else {
          form.setValue("jsonSchema", editorRef.current?.get());
        }
      },
    });

    if (isExtract) {
      editorRef.current.set(form.watch("extractSchema"));
    } else {
      editorRef.current.set(form.watch("jsonSchema"));
    }

    return () => editorRef.current?.destroy();
  }, [form]);

  return <div ref={containerRef} style={{ height: "100%" }} />;
}
