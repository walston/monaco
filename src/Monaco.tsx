import * as monaco from "monaco-editor";
import { HTMLProps, PropsWithRef, useEffect, useRef } from "react";

type ContainerProps = PropsWithRef<HTMLProps<HTMLDivElement>>;
type EditorOptions = { options?: monaco.editor.IEditorOptions };
type EditorProps = Pick<HTMLProps<HTMLInputElement>, "onClick" | "value">;

type Props = ContainerProps & EditorOptions & EditorProps;

export default function Monaco({
  options = {},
  onClick,
  value,
  ...props
}: Props) {
  const editor_id = useRef<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    controller.signal.addEventListener("abort", () => {
      monaco.editor.getEditors().forEach((ed) => {
        if (ed.getId() === editor_id.current) ed.dispose();
      });
    });
  }, [value, onClick]);

  return (
    <div {...props}>
      <div
        role="textbox"
        id="editor"
        style={{ height: "100%", width: "100%", textAlign: "initial" }}
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
