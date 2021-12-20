import generateWorksheet from '../static/worksheet';
import { Sheet } from '../types';
import { ele } from '../xml';
import RowGenerator from './rows';

export default class WorksheetGenerator {
    constructor(private rows: RowGenerator) {}

    generate = (sheet: Sheet) => {
        var data = ele('sheetData', {}, ...sheet.rows.map(this.rows.generate));
        return generateWorksheet(data, ele('mergeCells'));
    };
}
