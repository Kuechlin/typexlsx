import getColor from '../utils/getColor';
import { ele, XMLElement } from '../xml';

type FillType = string | { gray125?: true };

export default class FillsGenerator {
    fills: FillType[] = [
        // default fill
        {},
        // "gray125" fill.
        // For some weird reason, MS Office 2007 Excel seems to require that to be present.
        // Otherwise, if absent, it would replace the first `backgroundColor`.
        { gray125: true },
    ];
    fillsIndex = new Map<string, number>();

    getFill = (fill?: string) => {
        if (!fill) return 0;
        if (fill && !this.fillsIndex.has(fill)) {
            this.fillsIndex.set(fill, this.fills.push(fill) - 1);
        }
        return this.fillsIndex.get(fill) as number;
    };

    generate = () =>
        ele(
            'fills',
            { count: this.fills.length },
            ...this.fills.map((fill) => {
                let pattern: XMLElement;
                if (typeof fill === 'string') {
                    pattern = ele(
                        'patternFill',
                        { patternType: 'solid' },
                        ele('fgColor', { rgb: getColor(fill) }),
                        // Whatever that could mean.
                        ele('bgColor', { indexed: 64 })
                    );
                } else if (
                    typeof fill === 'object' &&
                    'gray125' in fill &&
                    fill.gray125
                ) {
                    pattern = ele('patternFill', { patternType: 'gray125' });
                } else {
                    pattern = ele('patternFill', { patternType: 'none' });
                }
                return ele('fill', {}, pattern);
            })
        );
}

/*
<fills count="3">
    <fill>
        <patternFill patternType="none" />
    </fill>
    <fill>
        <patternFill patternType="gray125" />
    </fill>
    <fill>
        <patternFill patternType="solid">
            <fgColor rgb="FF00B050" />
            <bgColor indexed="64" />
        </patternFill>
    </fill>
</fills>
*/
