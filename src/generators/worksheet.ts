import { Cell, Row, Sheet } from '../types';
import convertDateToExcelSerial from '../utils/convertDateToExcelSerial';
import generateCellNumber from '../utils/generateCellNumber';
import { $doc, $ele, $val, XMLElement } from '../xml';
import { WORKSHEET_XML_ATTRIBUTES } from './const';
import WorkbookGenerator from './workbook';

// c: cell number
// x: style id
//    - From the attribute s="12" we know that the cell's formatting is stored at the 13th (zero-based index) <xf> within the <cellXfs>
// t: cell type
//    - the default value for `t` is `"n"` (a number or a date).
//    - Available Excel cell types:
//    - https://github.com/SheetJS/sheetjs/blob/19620da30be2a7d7b9801938a0b9b1fd3c4c4b00/docbits/52_datatype.md

export default class WorksheetGenerator {
    constructor(private workbook: WorkbookGenerator) {}

    generate = (sheet: Sheet) => {
        const mergeCells = this.generateMergedCells(sheet.rows);
        return $doc(
            $ele(
                'worksheet',
                WORKSHEET_XML_ATTRIBUTES,
                this.generateSheet(sheet.rows),
                ...(mergeCells ? [mergeCells] : [])
            )
        );
    };

    private generateMergedCells(rows: Row[]) {
        const cells: XMLElement[] = [];
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const rowNumber = rowIndex + 1;
            const row = rows[rowIndex];
            for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
                const { span, rowSpan } = row[cellIndex];
                let xSpan = span || 1;
                let ySpan = rowSpan || 1;
                if ((!xSpan || xSpan === 1) && (!ySpan || ySpan === 1))
                    continue;
                let start = generateCellNumber(cellIndex, rowNumber);
                let end = generateCellNumber(
                    cellIndex + xSpan - 1,
                    rowNumber + ySpan - 1
                );
                cells.push($ele('mergeCell', { ref: `${start}:${end}` }));
                // add empty cells to create merge cell
                let first = true;
                for (let y = 0; y < ySpan; y++) {
                    let index = rowIndex + y;
                    if (rows.length <= index) {
                        rows.push([]);
                    }
                    if (xSpan > 1) {
                        rows[index].splice(
                            cellIndex + 1,
                            0,
                            ...new Array(first ? xSpan - 1 : xSpan).fill({})
                        );
                        first = false;
                    }
                }
            }
        }
        if (cells.length === 0) return null;
        return $ele('mergeCells', { count: cells.length }, ...cells);
    }

    private generateSheet = (rows: Row[]) =>
        $ele('sheetData', {}, ...rows.map(this.generateRow));

    private generateRow = (row: Row, index: number): XMLElement => {
        // To ensure the row number starts as in Excel.
        const rowNumber = index + 1;

        const element = $ele('row', { r: rowNumber });
        element.$elements = [];
        // generate cells
        for (let index = 0; index < row.length; index++) {
            const cell = row[index];
            element.$elements.push(this.generateCell(cell, rowNumber, index));
        }

        return element;
    };

    private generateCell = (cell: Cell, rowNumber: number, index: number) => {
        const styleId = this.workbook.styles.create(cell);
        const element = $ele('c', {
            r: generateCellNumber(index, rowNumber),
        });
        // set cell style
        if (styleId !== null) {
            element.s = styleId.toString();
        }
        let value = null;
        if (typeof cell.value === 'string') {
            // String
            element.t = 's';
            value = this.workbook.sharedString.create(cell.value);
        } else if (typeof cell.value === 'boolean') {
            // Boolean
            element.t = 's';
            value = cell.value ? 1 : 0;
        } else if (typeof cell.value === 'number') {
            // Number
            element.t = 'n';
            value = cell.value;
        } else if (cell.value instanceof Date) {
            // Date, validate format.
            if (!styleId) {
                throw new Error(
                    'No "format" has been specified for a Date cell'
                );
            }
            element.t = 'n';
            value = convertDateToExcelSerial(cell.value);
        }
        // add value
        if (value != null) {
            element.$elements = [];
            element.$elements.push($ele('v', {}, $val(value)));
        }
        return element;
    };
}
/*
<?xml version="1.0" ?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main"
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
    xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
    xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main"
>
    <sheetData>{data}</sheetData>
    <mergeCells count="1">
        <mergeCell ref="A3:F3" />
    </mergeCells>
</worksheet>
*/
