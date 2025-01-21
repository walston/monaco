import * as monaco from "monaco-editor";
import { HTMLProps, MutableRefObject, PropsWithRef, useRef } from "react";

type Props = PropsWithRef<HTMLProps<HTMLDivElement>> & {
  options?: monaco.editor.IEditorOptions;
};

export default function Editor({ options = {}, ...props }: Props) {
  const editor_id = useRef<string>(null) as MutableRefObject<string>;
  return (
    <div {...props}>
      <div
        id="editor"
        style={{ height: "100%", width: "100%" }}
        ref={(el) => {
          if (!el) {
            monaco.editor.getEditors().forEach((editor) => {
              if (editor.getId() === editor_id.current) editor.dispose();
            });
            return;
          }
          const ed = monaco.editor.create(el, options);
          editor_id.current = ed.getId();
        }}
      />
    </div>
  );
}
