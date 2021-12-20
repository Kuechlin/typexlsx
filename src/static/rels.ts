import { doc, ele } from '../xml';

/**
 * File ./_rels/.rels
 */
export default function generateRels() {
    return doc(
        ele(
            'Relationships',
            {
                xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
            },
            ele('Relationship', {
                Id: 'rId1',
                Type: 'http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument',
                Target: 'xl/workbook.xml',
            })
        )
    );
}

/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument" Target="xl/workbook.xml" />
</Relationships>
*/
