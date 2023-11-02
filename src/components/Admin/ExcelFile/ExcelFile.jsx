import instance from "@/utils/instance";
import { Button } from "antd";
import { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import * as St from "./ExcelFile.styled";
// import * as XLSX from "xlsx";

function ExcelFile() {
    const [file, setFile] = useState();

    const upload = () => {
        const formData = new FormData();
        formData.append("excelFile", file);
        instance
            .post("studentSubjects/excel", formData)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const formFile = "/src/assets/fileExcel/test.xlsx";

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = formFile;
        link.download = "test.xlsx";
        link.click();
    };

    return (
        <St.DivStyled>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <Button onClick={handleDownload}>
                <DownloadOutlined />
            </Button>
            <Button onClick={upload}>Upload</Button>
        </St.DivStyled>
    );
}

export default ExcelFile;
