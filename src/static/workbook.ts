import { Sheet, Workbook } from '../types';
import { doc, ele } from '../xml';

/**
 * File: ./xl/workbook.xml
 */
export default function generateWorkbook(sheets: Workbook) {
    return doc(
        ele(
            'workbook',
            {
                xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
                'xmlns:r':
                    'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
                'xmlns:mx':
                    'http://schemas.microsoft.com/office/mac/excel/2008/main',
                'xmlns:mc':
                    'http://schemas.openxmlformats.org/markup-compatibility/2006',
                'xmlns:mv': 'urn:schemas-microsoft-com:mac:vml',
                'xmlns:x14':
                    'http://schemas.microsoft.com/office/spreadsheetml/2009/9/main',
                'xmlns:x14ac':
                    'http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac',
                'xmlns:xm':
                    'http://schemas.microsoft.com/office/excel/2006/main',
            },
            ele('workbookPr'),
            ele(
                'sheets',
                {},
                ...sheets.map((sheet, index) =>
                    ele('sheet', {
                        name: sheet.name || `Table${index + 1}`,
                        sheetId: index + 1,
                        'r:id': `rId${index + 1}`,
                    })
                )
            ),
            ele('definedNames'),
            ele('calcPr')
        )
    );
}
/*
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
