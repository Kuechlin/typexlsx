import { Sheet } from '../types';
import { doc, ele } from '../xml';

/**
 * ./xl/_rels/workbook.xml.rels
 */
export default function generateWorkbookRels(sheets: Sheet[]) {
    return doc(
        ele(
            'Relationships',
            {
                xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
            },
            ...sheets.map((_sheet, index) =>
                ele('Relationship', {
                    Id: `rId1${index + 1}`,
                    Type: 'http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet',
                    Target: `worksheets/sheet${index + 1}.xml`,
                })
            ),
            ele('Relationship', {
                Id: `rId${sheets.length + 1}`,
                Type: 'http://purl.oclc.org/ooxml/officeDocument/relationships/styles',
                Target: 'styles.xml',
            }),
            ele('Relationship', {
                Id: `rId${sheets.length + 2}`,
                Type: 'http://purl.oclc.org/ooxml/officeDocument/relationships/sharedStrings',
                Target: 'sharedStrings.xml',
            })
        )
    );
}

/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet" Target="worksheets/sheet1.xml" />    
    <Relationship Id="rId3" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/styles" Target="styles.xml" />
    <Relationship Id="rId4" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/sharedStrings" Target="sharedStrings.xml" />
</Relationships>
*/
