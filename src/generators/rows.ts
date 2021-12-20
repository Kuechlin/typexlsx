import { Row } from '../types';
import { ele, XMLElement } from '../xml';
import CellGenerator from './cell';
import StylesGenerator from './styles';

export default class RowGenerator {
    constructor(
        private cells: CellGenerator,
        private styles: StylesGenerator
    ) {}

    generate = (row: Row, index: number): XMLElement => {
        // To ensure the row number starts as in Excel.
        const rowNumber = index + 1;

        const element = ele('row', { r: rowNumber });
        element.$elements = [];
        // generate cells
        for (let index = 0; index < row.length; index++) {
            const cell = row[index];
            const styleId = this.styles.getStyle(cell);

            element.$elements.push(
                this.cells.generate(rowNumber, index, cell.value, styleId)
            );
        }

        return element;
    };
}
