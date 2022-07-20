import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { useState } from "react";
import Swal from "sweetalert2";

//자동 파일 업로드 테스트 완료. MultipartFile 로 받으면 받아짐. 파일 명 및 파일 사이즈 체크로 완료 판단.
const AntdFileUpload = () => {
    const singleAutoUploadProps: UploadProps = {
        name: 'file',
        action: '/operMng/fileUploadTest/fileUploadToS32',
        maxCount: 1,
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log("업로딩 상태가 아님.");
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            console.log("업로드 완료.");
            Swal.fire(`${info.file.name} file uploaded su   ccessfully`);
          } else if (info.file.status === 'error') {
            console.log("업로드 실패");
            Swal.fire(`${info.file.name} file upload failed.`);
            
          }
        },
    }

    //수동 업로드 테스트 완료. MultipartFile 로 받으면 받아짐. 파일 명 및 파일 사이즈 체크로 완료 판단.
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('file', file as RcFile);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('/operMng/fileUploadTest/fileUploadToS32', {
          method: 'POST',
          body: formData,
        }).then(res => res.json())
          .then(() => {
            setFileList([]);
            Swal.fire('upload successfully.');
          })
          .catch(() => {
            Swal.fire('upload failed.');
          })
          .finally(() => {
            setUploading(false);
          });
      };
      
    const singleManualUploadProps: UploadProps = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          },
          beforeUpload: file => {
            console.log(file);
            setFileList([...fileList, file]);
      
            return false;
          },
          fileList,
    }
    return (
        <>
        <div className="content-body">
            <div className="comp-help">
                <ul className="help-list">
                    <li className="list">
                        <span className="fz-14 fc-4 bullet">ANTD FILE UPLOAD 테스트</span>
                    </li>
                </ul>
            </div>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">싱글 업로드01</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>파일 선택하는 즉시 업로드(인터파크 센터를 백엔드로 테스트 한 결과 파일 명 및 파일 사이즈 체크 완료)</h3>
                    </div>
                    <div className="box-option">
                    <Upload {...singleAutoUploadProps}>
                        <Button icon={<UploadOutlined />}>싱글 업로드 버튼</Button>
                    </Upload>
                    </div>
                </div>
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">싱글 업로드02</h2>
                        <h3 className="fz-12 fc-3"><i className="fz-12 fc-7">*</i>파일 선택 후 버튼을 눌러야 업로드(인터파크 센터를 백엔드로 테스트 한 결과 파일 명 및 파일 사이즈 체크 완료)</h3>
                    </div>
                    <div className="box-option">
                        <Upload {...singleManualUploadProps}>
                            <Button icon={<UploadOutlined />}>싱글 업로드 버튼</Button>
                        </Upload>
                        <Button 
                            type="primary" 
                            onClick={handleUpload} 
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16 }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>

                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default AntdFileUpload;
