import { isXLSXBorder, XLSXBorder, XLSXBorders } from '../../types';
import convertToExcelRgb from '../../utils/convertToExcelRgb';
import { $ele } from '../../xml';

export default class BordersGenerator {
    borders: XLSXBorders[] = [];
    bordersIndex = new Map<string, number>();

    constructor() {
        this.borders.push({});
        this.bordersIndex.set(this.getBorderKey({}), 0);
    }

    private getBorderKey = (val?: XLSXBorder) =>
        val ? `${val.color}/${val.style}` : '-';

    private getBordersKey = ({
        start,
        bottom,
        diagonal,
        end,
        top,
    }: XLSXBorders) =>
        [start, end, top, bottom, diagonal].map(this.getBorderKey).join('/');

    private getBorderElement = (direction: string, border?: XLSXBorder) => {
        let style = border?.style;
        if (border?.color && !style) {
            style = 'thin';
        }
        return $ele(
            direction,
            style ? { style } : {},
            ...(border?.color
                ? [$ele('color', { rgb: convertToExcelRgb(border.color) })]
                : [])
        );
    };

    getBorder = (border?: XLSXBorder | XLSXBorders) => {
        if (!border) return 0;
        var item: XLSXBorders;
        if (!isXLSXBorder(border)) {
            item = border;
        } else {
            item = {
                start: border,
                end: border,
                top: border,
                bottom: border,
            };
        }
        const key = this.getBordersKey(item);
        if (!this.bordersIndex.has(key)) {
            this.bordersIndex.set(key, this.borders.push(item) - 1);
        }
        return this.bordersIndex.get(key) as number;
    };

    generate = () =>
        $ele(
            'borders',
            { count: this.borders.length },
            ...this.borders.map(({ start, end, top, bottom, diagonal }) =>
                $ele(
                    'border',
                    {},
                    this.getBorderElement('start', start),
                    this.getBorderElement('end', end),
                    this.getBorderElement('top', top),
                    this.getBorderElement('bottom', bottom),
                    this.getBorderElement('diagonal', diagonal)
                )
            )
        );
}

/*
<borders count="3">
    <border>
        <start />
        <end />
        <top />
        <bottom />
        <diagonal />
    </border>
    <border>
        <start />
        <end />
        <top />
        <bottom style="thin">
            <color indexed="64" />
        </bottom>
        <diagonal />
    </border>
    <border>
        <start />
        <end />
        <top />
        <bottom style="thin">
            <color rgb="FF002060" />
        </bottom>
        <diagonal />
    </border>
</borders>
*/
