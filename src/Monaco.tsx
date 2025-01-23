import * as monaco from "monaco-editor";
import { HTMLProps, PropsWithRef, useEffect, useRef } from "react";

monaco.editor.createWebWorker({
  moduleId: "monaco-web-worker",
});

// /*
declare global {
  interface Window {
    monaco: typeof monaco;
  }
}
window["monaco"] = monaco;
// */

type EditorOptions = { options?: monaco.editor.IEditorOptions };
type EditorProps = {
  onChange?: (updated: string) => void;
  onFocus?: HTMLProps<HTMLInputElement>["onFocus"];
  onBlur?: HTMLProps<HTMLInputElement>["onBlur"];
  value?: string;
  ref?:
    | { current: monaco.editor.IEditor | null }
    | ((editor: monaco.editor.IEditor | null) => void);
};
type ContainerProps = Omit<
  PropsWithRef<HTMLProps<HTMLDivElement>>,
  keyof EditorProps
>;
type Props = ContainerProps & EditorOptions & EditorProps;

export default function Monaco({
  options = {},
  onChange,
  onFocus,
  onBlur,
  value,
  ref,
  ...props
}: Props) {
  const element = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IEditor | null>(null);

  useEffect(() => {
    if (typeof ref === "function") {
      ref(editor.current);
    } else if (typeof ref === "object" && "current" in ref) {
      ref.current = editor.current;
    }
  }, [ref]);

  useEffect(() => {
    if (element.current) {
      const el = element.current;
      const ed = monaco.editor.create(el, { ...options, value });
      const model = ed.getModel()!;

      editor.current = ed;
      model.onDidChangeContent(() => {
        const next = model.getValue();
        if (next !== value) onChange?.(next);
      });
    }

    return () => editor.current?.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div {...props}>
      <div
        role="textbox"
        id="editor"
        style={{ height: "100%", width: "100%", textAlign: "initial" }}
        ref={element}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}
