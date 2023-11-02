import { Button } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";

function ExcelImport() {
    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            /* Parse data */
            const bstr = event.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });

            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);

            /* Update state */
            setExcelData(data);
        };

        if (file) {
            reader.readAsBinaryString(file);
        }
    };

    const formFile = "/src/assets/fileExcel/test.xlsx";

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = formFile;
        link.download = "Form.xlsx";
        link.click();
    };

    return (
        <div>
            <Button onClick={handleDownload}>Download file</Button>
            
            <input type="file" onChange={handleFileUpload} />

            {excelData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(excelData[0]).map((key, index) => (
                                <th key={index}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ExcelImport;
