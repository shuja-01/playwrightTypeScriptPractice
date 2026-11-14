import ExcelJS from "exceljs";

export async function readExcel(filePath: string) {
    const book = new ExcelJS.Workbook();
    await book.xlsx.readFile(filePath);
    const sheet = book.getWorksheet('Sheet1');
    const data: any[] = [];
    sheet?.eachRow((row, rowNumber) => {
        if (rowNumber == 1)
            return;
        data.push({
            url: row.getCell('A').value,
            username: row.getCell('B').value,
            password: row.getCell('C').value,
            product: row.getCell('D').value
        });
    });
    return data;
}

