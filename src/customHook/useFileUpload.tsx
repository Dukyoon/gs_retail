import { useCallback, useEffect, useRef, useState } from 'react';

/** 어디선가 줏어온 파일 업로드 관련 소스. 심플하게 기능이 잘 적용되어 잇는 거 같아서 테스트 중. */

interface IOptions {
  accept: string;
  multiple: boolean;
}

function useFileUpload(options?: IOptions) {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File>();

  const onChangeFile = useCallback(
    (e: Event) => {
      if (!(e.target as HTMLInputElement).files) return;
      const convertTarget = (e.target as HTMLInputElement); 

      const selectFiles = convertTarget.files as FileList;
      const uploadFiles = Array.from(selectFiles);
      
      console.log(selectFiles);
      console.log(uploadFiles);
      //기존 기능에서 추가. file의 주소를 input text에 넣어준다. TEXT 부분은 파일의 ID와 동일하게 + DESC로 통일.
      const fileUploadDescId = convertTarget.id+"Desc";
      document.getElementById(fileUploadDescId).setAttribute('value', convertTarget.value);

      options.multiple ? setFiles((prevFiles) => [...prevFiles, ...uploadFiles]) : setFile(uploadFiles[0]);
    },
    [files, file]
  );

  const onDragFile = useCallback(
    (e: DragEvent) => {
      if (!e?.dataTransfer?.files) return;
      console.log("onDragFile");

      const selectFiles = e.dataTransfer.files;
      const uploadFiles = Array.from(selectFiles);

      options.multiple ? setFiles((prevFiles) => [...prevFiles, ...uploadFiles]) : setFile(uploadFiles[0]);
    },
    [files, file]
  );

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("onDragEnter");

    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("onDragLeave");

    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("onDragOver");
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("onDrop");

      onDragFile(e);
      setIsDragActive(false);
    },
    [onDragFile]
  );

  useEffect(() => {
    if (!inputRef.current || !options) return;
    console.log("useEffect01");

    if (options.accept) {
      inputRef.current.setAttribute('accept', options.accept);
    }

    if (options.multiple) {
      inputRef.current.setAttribute('multiple', 'multiple');
    }
  }, [inputRef, options]);

  useEffect(() => {
    if (!labelRef.current) return;
    console.log("useEffect02");

    labelRef.current.addEventListener('dragenter', onDragEnter);
    labelRef.current.addEventListener('dragleave', onDragLeave);
    labelRef.current.addEventListener('dragover', onDragOver);
    labelRef.current.addEventListener('drop', onDrop);

    return () => {
      labelRef.current?.removeEventListener('dragenter', onDragEnter);
      labelRef.current?.removeEventListener('dragleave', onDragLeave);
      labelRef.current?.removeEventListener('dragover', onDragOver);
      labelRef.current?.removeEventListener('drop', onDrop);
    };
  }, [labelRef, onDragEnter, onDragLeave, onDragOver, onDrop]);

  useEffect(() => {
    if (!inputRef.current) return;
    console.log("useEffect03");
    inputRef.current.setAttribute('type', 'file');

    inputRef.current.addEventListener('change', onChangeFile);
    return () => {
      inputRef.current?.removeEventListener('change', onChangeFile);
    };
  }, [inputRef]);
  //항목 추가하려면 여기에 추가해야함.
  return {
    inputRef,
    labelRef,
    files,
    isDragActive,
    file,
  };
}

useFileUpload.defaultProps = {
  accept: 'csv/*',
  multiple: false,
}

export default useFileUpload;