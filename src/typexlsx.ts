import WorkbookGenerator from './generators/workbook';
import JSZip from 'jszip';
import { Workbook } from './types';
import xml from './xml';

export default async function generateXlsx(...book: Workbook) {
    var generator = new WorkbookGenerator();

    var doc = generator.generate(book);

    var zip = new JSZip();
    for (const [key, value] of Object.entries(doc)) {
        zip.file(key, xml.stringify(value));
    }

    return zip.generateAsync({
        type: 'blob',
        mimeType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
}
