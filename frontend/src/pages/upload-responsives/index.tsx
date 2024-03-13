import { useEffect, useRef, useState } from "react";

import * as xlsx from 'xlsx'

import { Button, TitlePage } from "@/components";

import { TableResponsives } from "./components/table-responsives";
import { Upload, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileThunk } from "@/store/upload-file";
import { RootState } from "@/store";
import { toast } from "sonner";

export function UploadResponsives() {
  const loadFileState = useSelector((state: RootState) => state.uploadFile.uploadFile)
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null)
  const [fileData, setFileData] = useState([])

  const selectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    setFile(file)
    const data = await file.arrayBuffer()
    const workbook = xlsx.read(data)
    setFileData(xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
  };

  const sendFile = async () => {
      if (inputRef.current?.files === null) return false
      const formData = new FormData()
      const f = inputRef.current!.files[0]
      formData.append("file", f)
      dispatch(uploadFileThunk(formData))
  }

  const handleOnClick = () => {
    inputRef.current!.click();
  };

  const clearFile = () => {
    inputRef.current!.value = ""
    setFile(null)
  }

  useEffect(() => {
    if(loadFileState.success) {
      toast.success("Archivo subido correctamente")
    }
  }, [loadFileState])

  return (
    <div className="w-full">
      <TitlePage title="Cargar archivo" />
      <input
        onChange={selectFile}
        type="file"
        accept=".xlsx"
        ref={inputRef}
        className="hidden"
      />
      {file ? <div>
        <div className="flex justify-between items-center mb-5">
          <span>Se van a generar {fileData.length} responsivas</span>
          <div className="flex gap-2">
            <Button onClick={clearFile}>
              <X  className="mr-2"/>Limpiar</Button>
            <Button onClick={sendFile}>
              <Upload className="mr-2" />
              Subir
            </Button>
          </div>
        </div>
        <TableResponsives data={fileData} />
      </div> :
        <div className="mt-16 flex flex-col items-center justify-center">
          <Button onClick={handleOnClick}>Seleccionar archivo xlsx</Button>
        </div>
      }
    </div>
  );
}
