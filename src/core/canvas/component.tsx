import * as React from "react";
import { createContext, useEffect, useRef, useCallback } from "react";

import { ReactImageEditor } from "./canvas";

export const ReactImageEditorCanvasContext = createContext<
  ReactImageEditor | undefined
>(undefined);

export type ReactImageEditorCanvasProps = {
  reactImageEditor: ReactImageEditor;
  children?: React.ReactNode;
};

export const ReactImageEditorCanvas = ({
  children,
  ...props
}: ReactImageEditorCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const setContainerSize = useCallback(() => {
    containerRef.current!.style.width = `${props.reactImageEditor.fabricCanvas.width}px`;
    containerRef.current!.style.height = `${props.reactImageEditor.fabricCanvas.height}px`;
  }, []);

  const insertCanvas = useCallback(() => {
    setContainerSize();
    containerRef.current!.appendChild(
      props.reactImageEditor.fabricCanvas.wrapperEl
    );
  }, []);

  const drawInitialObjects = useCallback(() => {
    const isChildrenExist = React.Children.toArray(children).length > 0;
    if (!isChildrenExist) {
        props.reactImageEditor.import(props.reactImageEditor.currentTab.getFabricJSON());
    }
  }, []);

  useEffect(() => {
    insertCanvas();
    drawInitialObjects();
  }, []);

  return (
    <ReactImageEditorCanvasContext.Provider value={props.reactImageEditor}>
      <div
        id={ReactImageEditor.REACT_IMAGE_EDITOR__CONTAINER_ID}
        ref={containerRef}
      ></div>
      {children}
    </ReactImageEditorCanvasContext.Provider>
  );
};
