import WorkbookGenerator from './generators/workbook';
import JSZip from 'jszip';
import { Workbook } from './types';
import xml from './xml';

export default async function generateXlsx(...book: Workbook) {
    const generator = new WorkbookGenerator();

    const doc = generator.generate(book);

    const zip = new JSZip();
    for (const [key, value] of Object.entries(doc)) {
        zip.file(key, xml.stringify(value));
    }

    return zip.generateAsync({
        type: 'blob',
        mimeType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
}
