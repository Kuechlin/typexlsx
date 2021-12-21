import { $doc, $ele } from '../xml';

export enum XMLContentType {
    Workbook = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml',
    Worksheets = 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml',
    Styles = 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml',
    SharedStrings = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml',
}

export type Override = {
    path: string;
    contentType: XMLContentType;
};

/**
 * File: ./[Content_Types].xml
 * - Index File for XML Project
 * - Links all other files
 * - Defines Content Type for Files
 */
export default function generateContentTypes(...overrides: Override[]) {
    return $doc(
        $ele(
            'Types',
            {
                xmlns: 'http://schemas.openxmlformats.org/package/2006/content-types',
            },
            $ele('Default', {
                Extension: 'xml',
                ContentType: 'application/xml',
            }),
            $ele('Default', {
                Extension: 'rels',
                ContentType:
                    'application/vnd.openxmlformats-package.relationships+xml',
            }),
            ...overrides.map((o) =>
                $ele('Override', {
                    PartName: o.path.startsWith('/') ? o.path : '/' + o.path,
                    ContentType: o.contentType.toString(),
                })
            )
        )
    );
}

/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
    <Default Extension="xml" ContentType="application/xml" />
    <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />
    <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />
    <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />
    <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml" />
</Types>
*/
