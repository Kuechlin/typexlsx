import { $doc, $ele, $val } from '../xml';

/**
 * Escapes text for XML: replaces ">" with "&gt;", etc.
 * https://en.wikipedia.org/wiki/Character_encodings_in_HTML#HTML_character_references
 * @param  {string} str
 * @return {string}
 */
function escapeString(str: string) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
}

export default class SharedStringsGenerator {
    sharedStrings: string[] = [];

    create = (value: string) => {
        value = escapeString(value);
        let index = this.sharedStrings.indexOf(value);
        if (index === -1) {
            index = this.sharedStrings.push(value) - 1;
        }
        return index;
    };

    generate = () =>
        $doc(
            $ele(
                'sst',
                {
                    xmlns: 'http://purl.oclc.org/ooxml/spreadsheetml/main',
                    count: this.sharedStrings.length,
                    uniqueCount: this.sharedStrings.length,
                },
                ...this.sharedStrings.map((str) =>
                    $ele('si', {}, $ele('t', {}, $val(str)))
                )
            )
        );
}

/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://purl.oclc.org/ooxml/spreadsheetml/main" count="7" uniqueCount="7">
    <si>
        <t>A</t>
    </si>
    <si>
        <t>B</t>
    </si>
</sst>
*/
