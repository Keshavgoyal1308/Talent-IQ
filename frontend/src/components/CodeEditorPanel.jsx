import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onRunCode,
  sessionId,
  starterCode,
  isHost,
}) {
  const editorRef = useRef(null);
  const providerRef = useRef(null);
  const bindingRef = useRef(null);
  const docRef = useRef(null);

  // Clean up function to prevent memory leaks and multiple connections
  useEffect(() => {
    return () => {
      if (providerRef.current) providerRef.current.destroy();
      if (bindingRef.current) bindingRef.current.destroy();
      if (docRef.current) docRef.current.destroy();
    };
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // 1. Initialize Yjs Doc
    const ydoc = new Y.Doc();
    docRef.current = ydoc;

    // 2. Setup WebRTC Provider
    // Using a unique room name based on the sessionId
    const provider = new WebrtcProvider(`talent-iq-room-${sessionId}`, ydoc, {
      signaling: ["wss://signaling.yjs.dev"], 
    });
    providerRef.current = provider;

    // 3. Define shared text
    const yText = ydoc.getText("monaco");

    // 4. Bind Yjs to Monaco
    const binding = new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
    bindingRef.current = binding;

    // 5. Initial Code Injection (Host Only)
    // Only insert starter code if the document is empty and user is host
    if (isHost && yText.toString().length === 0 && starterCode) {
      yText.insert(0, starterCode);
    }
  };

  return (
    <div className="h-full bg-base-300 flex flex-col">
      {/* TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select 
            className="select select-sm" 
            value={selectedLanguage} 
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="btn btn-primary btn-sm gap-2" 
          disabled={isRunning} 
          onClick={() => onRunCode(editorRef.current?.getValue())}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;