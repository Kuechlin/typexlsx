import { $doc, $ele } from '../xml';

export enum XMLRelationshipType {
    Workbook = 'http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument',
    Worksheet = 'http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet',
    Styles = 'http://purl.oclc.org/ooxml/officeDocument/relationships/styles',
    SharedStrings = 'http://purl.oclc.org/ooxml/officeDocument/relationships/sharedStrings',
}

export type Relationship = {
    id: number;
    type: XMLRelationshipType;
    target: string;
};

/**
 * File ./_rels/.rels
 */
export default function generateRels(...rels: Relationship[]) {
    return $doc(
        $ele(
            'Relationships',
            {
                xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
            },
            ...rels.map(({ id, type, target }) =>
                $ele('Relationship', {
                    Id: 'rId' + id,
                    Type: type.toString(),
                    Target: target,
                })
            )
        )
    );
}

/*
# file: _rels/.rels

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument" Target="xl/workbook.xml" />
</Relationships>
*/

/*
# file: xl/_rels/workbook.xml.rels

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet" Target="worksheets/sheet1.xml" />    
    <Relationship Id="rId3" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/styles" Target="styles.xml" />
    <Relationship Id="rId4" Type="http://purl.oclc.org/ooxml/officeDocument/relationships/sharedStrings" Target="sharedStrings.xml" />
</Relationships>
*/
