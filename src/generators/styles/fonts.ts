import { XLSXFont } from '../../types';
import convertToExcelRgb from '../../utils/convertToExcelRgb';
import { XMLElement, $ele } from '../../xml';

const FONT_FAMILY = 'Calibri';
const FONT_SIZE = 12;
const FONT_STYLES: Record<string, XMLElement> = {
    bold: $ele('b'),
    italic: $ele('i'),
};

export default class FontsGenerator {
    fonts: XLSXFont[];
    fontsIndex: Map<string, number>;

    constructor() {
        this.fonts = [{}];
        this.fontsIndex = new Map([[this.getFontKey({}), 0]]);
    }

    private getFontKey = ({
        family = FONT_FAMILY,
        size = FONT_SIZE,
        style = 'none',
        color = '-',
    }: XLSXFont) => `${family}/${size}/${style}/${color}`;

    getFont = (font?: XLSXFont) => {
        if (!font) return 0;
        const key = this.getFontKey(font);
        if (!this.fontsIndex.has(key)) {
            this.fontsIndex.set(key, this.fonts.push(font) - 1);
        }
        return this.fontsIndex.get(key) as number;
    };

    generate = () =>
        $ele(
            'fonts',
            { count: this.fonts.length },
            ...this.fonts.map(({ size, color, style, family }) =>
                $ele(
                    'font',
                    {},
                    $ele('sz', { val: size ?? FONT_SIZE }),
                    $ele(
                        'color',
                        color ? { rgb: convertToExcelRgb(color) } : { theme: 1 }
                    ),
                    $ele('name', { val: family ?? FONT_FAMILY }),
                    // It's not clear what the `<family/>` tag means or does.
                    // It seems to always be `<family val="2"/>` even for different
                    // font families (Calibri, Arial, etc).
                    $ele('family', { val: 2 }),
                    // It's not clear what the `<scheme/>` tag means or does.
                    $ele('scheme', { val: 'minor' }),
                    // add font style
                    ...(style && FONT_STYLES[style] ? [FONT_STYLES[style]] : [])
                )
            )
        );
}

/*
<fonts count="2">
    <font>
        <sz val="11" />
        <color theme="1" />
        <name val="Calibri" />
        <family val="2" />
    </font>
    <font>
        <sz val="11" />
        <color rgb="FFFF0000" />
        <name val="Calibri" />
        <family val="2" />
    </font>
</fonts>
*/
