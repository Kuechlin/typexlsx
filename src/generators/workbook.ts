import generateContentTypes, { XMLContentType } from './contentTypes';
import generateRels, { XMLRelationshipType } from './rels';
import { Workbook } from '../types';
import { $doc, $ele, XMLDocument } from '../xml';
import { WORKBOOK_XML_ATTRIBUTES } from './const';
import SharedStringsGenerator from './strings';
import StylesGenerator from './styles';
import WorksheetGenerator from './worksheet';

export default class WorkbookGenerator {
    styles: StylesGenerator;
    sharedString: SharedStringsGenerator;
    worksheet: WorksheetGenerator;

    constructor() {
        this.styles = new StylesGenerator();
        this.sharedString = new SharedStringsGenerator();
        this.worksheet = new WorksheetGenerator(this);
    }

    private generateWorkbook(sheets: Workbook) {
        return $doc(
            $ele(
                'workbook',
                WORKBOOK_XML_ATTRIBUTES,
                $ele('workbookPr'),
                $ele(
                    'sheets',
                    {},
                    ...sheets.map((sheet, index) =>
                        $ele('sheet', {
                            name: sheet.name || `Table${index + 1}`,
                            sheetId: index + 1,
                            'r:id': `rId${index + 1}`,
                        })
                    )
                ),
                $ele('definedNames'),
                $ele('calcPr')
            )
        );
    }

    generate(book: Workbook): Record<string, XMLDocument> {
        const docs: Record<string, XMLDocument> = {};
        const sheets: { id: number; fileName: string; path: string }[] = [];
        for (let index = 0; index < book.length; index++) {
            const sheet = book[index];
            // generate file name and path
            const id = index + 1;
            const fileName = `sheet${id}.xml`;
            const path = 'xl/worksheets/' + fileName;
            sheets.push({ id, fileName, path });
            // generate doc
            docs[path] = this.worksheet.generate(sheet);
        }
        docs['xl/styles.xml'] = this.styles.generate();
        docs['xl/sharedStrings.xml'] = this.sharedString.generate();
        docs['xl/workbook.xml'] = this.generateWorkbook(book);
        // generate content types for all files
        docs['[Content_Types].xml'] = generateContentTypes(
            ...sheets.map(({ path }) => ({
                contentType: XMLContentType.Worksheets,
                path: path,
            })),
            {
                contentType: XMLContentType.Workbook,
                path: 'xl/workbook.xml',
            },
            {
                contentType: XMLContentType.SharedStrings,
                path: 'xl/sharedStrings.xml',
            },
            {
                contentType: XMLContentType.Styles,
                path: 'xl/styles.xml',
            }
        );
        // generate workbook rels for styles, strings and sheets
        docs['xl/_rels/workbook.xml.rels'] = generateRels(
            ...sheets.map(({ id, fileName }) => ({
                id,
                type: XMLRelationshipType.Worksheet,
                target: 'worksheets/' + fileName,
            })),
            {
                id: sheets.length + 1,
                type: XMLRelationshipType.SharedStrings,
                target: 'sharedStrings.xml',
            },
            {
                id: sheets.length + 2,
                type: XMLRelationshipType.Styles,
                target: 'styles.xml',
            }
        );
        // generate root rels for workbook
        docs['_rels/.rels'] = generateRels({
            id: 1,
            type: XMLRelationshipType.Workbook,
            target: 'xl/workbook.xml',
        });
        return docs;
    }
}

/*
# file: xl/workbook.xml

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main">
    <workbookPr />
    <sheets>
        <sheet name="Tabelle1" sheetId="1" r:id="rId1" />
    </sheets>
    <definedNames/>
    <calcPr/>
</workbook>
*/
