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
  filename?: string;
  onChange?: (updated: string) => void;
  onFocus?: HTMLProps<HTMLInputElement>["onFocus"];
  onBlur?: HTMLProps<HTMLInputElement>["onBlur"];
  value?: string;
};
type ContainerProps = Omit<
  PropsWithRef<HTMLProps<HTMLDivElement>>,
  keyof EditorProps
>;

type Props = ContainerProps & EditorOptions & EditorProps;

type EditorRef =
  | { editor: null; model: null }
  | { editor: monaco.editor.IEditor; model: monaco.editor.IModel };

export default function Monaco({
  options = {},
  onChange,
  onFocus,
  onBlur,
  value,
  ...props
}: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorRef>({
    editor: null,
    model: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    controller.signal.addEventListener("abort", () => {
      const { editor, model } = editorRef.current;
      if (!editor) return;
      editor.dispose();
      model.dispose();
    });

    if (elementRef.current) {
      const el = elementRef.current;
      const ed = monaco.editor.create(el, { ...options, value });
      const model = ed.getModel()!;
      editorRef.current.editor = ed;
      editorRef.current.model = model;

      model.onDidChangeContent(() => {
        const next = model.getValue();
        if (next !== value) onChange?.(next);
      });
    }

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current]);

  return (
    <div {...props}>
      <div
        role="textbox"
        id="editor"
        style={{ height: "100%", width: "100%", textAlign: "initial" }}
        ref={elementRef}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}
