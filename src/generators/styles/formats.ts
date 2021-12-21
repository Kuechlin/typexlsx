import { $ele } from '../../xml';

// There seem to be about 100 "built-in" formats in Excel.
// https://docs.microsoft.com/en-us/previous-versions/office/developer/office-2010/ee857658(v=office.14)?redirectedfrom=MSDN
const FORMAT_ID_STARTS_FROM = 100;

export default class FormatsGenerator {
    formats: string[] = [];

    getFormat = (value?: string) => {
        if (!value) return 0;
        var index = this.formats.indexOf(value);
        if (index === -1) {
            index = this.formats.push(value) - 1;
        }
        return FORMAT_ID_STARTS_FROM + index;
    };

    generate = () =>
        $ele(
            'numFmts',
            {
                count: this.formats.length,
            },
            ...this.formats.map((value, index) =>
                $ele('numFmt', {
                    numFmtId: FORMAT_ID_STARTS_FROM + index,
                    formatCode: value,
                })
            )
        );
}

/*
<numFmts count="1">
    <numFmt numFmtId="101" formatCode="0.00" />
</numFmts>
*/
