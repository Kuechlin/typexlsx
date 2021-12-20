import WorkbookGenerator from './generators/workbook';
import { Workbook } from './types';

export default function toXlsx(book: Workbook) {
    var generator = new WorkbookGenerator();

    return generator.generate(book);
}
