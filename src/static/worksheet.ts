import { XMLElement, doc, ele } from '../xml';

export default function generateWorksheet(data: XMLElement, merge: XMLElement) {
    return doc(
        ele(
            'worksheet',
            {
                xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
                'xmlns:mc':
                    'http://schemas.openxmlformats.org/markup-compatibility/2006',
                'xmlns:mv': 'urn:schemas-microsoft-com:mac:vml',
                'xmlns:mx':
                    'http://schemas.microsoft.com/office/mac/excel/2008/main',
                'xmlns:r':
                    'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
                'xmlns:x14':
                    'http://schemas.microsoft.com/office/spreadsheetml/2009/9/main',
                'xmlns:x14ac':
                    'http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac',
                'xmlns:xm':
                    'http://schemas.microsoft.com/office/excel/2006/main',
            },
            data,
            merge
        )
    );
}

/*
<?xml version="1.0" ?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main"
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
    xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
    xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main"
>
    <sheetData>{data}</sheetData>
    <mergeCells count="1">
        <mergeCell ref="A3:F3" />
    </mergeCells>
</worksheet>`
*/
