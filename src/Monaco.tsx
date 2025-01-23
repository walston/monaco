import * as monaco from "monaco-editor";
import {
  HTMLProps,
  PropsWithRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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

export default function Monaco({
  options = {},
  onChange,
  onFocus,
  onBlur,
  value,
  ...props
}: Props) {
  const [editor, setEditor] = useState<monaco.editor.IEditor | null>(null);

  useEffect(() => {
    if (!editor) return;
    return () => editor.dispose();
  }, [editor]);

  const refHandler = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      const editor = monaco.editor.create(el, { ...options, value });
      const model = editor.getModel()!;
      model.onDidChangeContent(() =>
        onChange ? onChange(model.getValue()) : null
      );
      setEditor(editor);
    },
    [onChange, options, value]
  );

  return (
    <div {...props}>
      <div
        role="textbox"
        id="editor"
        style={{ height: "100%", width: "100%", textAlign: "initial" }}
        ref={refHandler}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}
