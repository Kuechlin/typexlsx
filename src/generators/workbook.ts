import generateContentTypes from '../static/content_types';
import generateRels from '../static/rels';
import generateWorkbook from '../static/workbook';
import generateWorkbookRels from '../static/workbook_rels';
import { Workbook } from '../types';
import { XMLDocument } from '../xml';
import CellGenerator from './cell';
import RowGenerator from './rows';
import SharedStringsGenerator from './strings';
import StylesGenerator from './styles';
import WorksheetGenerator from './worksheet';

export default class WorkbookGenerator {
    private styles: StylesGenerator;
    private sharedString: SharedStringsGenerator;
    private cells: CellGenerator;
    private rows: RowGenerator;
    private worksheet: WorksheetGenerator;

    constructor() {
        this.styles = new StylesGenerator();
        this.sharedString = new SharedStringsGenerator();
        this.cells = new CellGenerator(this.sharedString);
        this.rows = new RowGenerator(this.cells, this.styles);
        this.worksheet = new WorksheetGenerator(this.rows);
    }

    generate(book: Workbook): Record<string, XMLDocument> {
        const docs: Record<string, XMLDocument> = {};
        for (let index = 0; index < book.length; index++) {
            const sheet = book[index];
            docs[`xl/worksheets/sheet${index + 1}.xml`] =
                this.worksheet.generate(sheet);
        }
        docs['xl/styles.xml'] = this.styles.generate();
        docs['xl/sharedStrings.xml'] = this.sharedString.generate();
        docs['xl/workbook.xml'] = generateWorkbook(book);
        docs['xl/_rels/workbook.xml.rels'] = generateWorkbookRels(book);
        docs['[Content_Types].xml'] = generateContentTypes(book);
        docs['_rels/.rels'] = generateRels();
        return docs;
    }
}
