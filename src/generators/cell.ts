import { CellValue } from '../types';
import convertDateToExcelSerial from '../utils/convertDateToExcelSerial';
import generateCellNumber from '../utils/generateCellNumber';
import { ele, val } from '../xml';
import SharedStringsGenerator from './strings';

// c: cell number
// x: style id
//    - From the attribute s="12" we know that the cell's formatting is stored at the 13th (zero-based index) <xf> within the <cellXfs>
// t: cell type
//    - the default value for `t` is `"n"` (a number or a date).
//    - Available Excel cell types:
//    - https://github.com/SheetJS/sheetjs/blob/19620da30be2a7d7b9801938a0b9b1fd3c4c4b00/docbits/52_datatype.md

export default class CellGenerator {
    constructor(private sharedString: SharedStringsGenerator) {}

    public generate = (
        rowNumber: number,
        index: number,
        value: CellValue,
        stylesId: number | null
    ) => {
        const cell = ele('c', {
            r: generateCellNumber(index, rowNumber),
        });
        // set cell style
        if (stylesId !== null) {
            cell.s = stylesId.toString();
        }
        if (typeof value === 'string') {
            // String
            cell.t = 's';
            value = this.sharedString.getSharedString(value);
        } else if (typeof value === 'boolean') {
            // Boolean
            cell.t = 's';
            value = value ? 1 : 0;
        } else if (typeof value === 'number') {
            // Number
            cell.t = 'n';
        } else if (value instanceof Date) {
            // Date, validate format.
            if (!stylesId) {
                throw new Error(
                    'No "format" has been specified for a Date cell'
                );
            }
            cell.t = 'n';
            value = convertDateToExcelSerial(value);
        }
        // add value
        if (value != null) {
            cell.$elements = [];
            cell.$elements.push(ele('v', {}, val(value)));
        }
        return cell;
    };
}
