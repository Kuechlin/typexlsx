import { Cell } from '../../types';
import { $doc, $ele } from '../../xml';
import BordersGenerator from './borders';
import FillsGenerator from './fills';
import FontsGenerator from './fonts';
import FormatsGenerator from './formats';

type CellStyle = {
    formatId: number;
    fontId: number;
    fillId: number;
    borderId: number;
    align?: string;
    alignVertical?: string;
    wrap?: boolean;
};

export default class StylesGenerator {
    private formats = new FormatsGenerator();
    private fonts = new FontsGenerator();
    private fills = new FillsGenerator();
    private borders = new BordersGenerator();

    styles: CellStyle[] = [];
    stylesIndex = new Map<string, number>();

    private getStyleKey = ({
        formatId,
        fontId,
        fillId,
        borderId,
        align = '-',
        alignVertical = '-',
        wrap,
    }: CellStyle) =>
        `${formatId}/${fontId}/${fillId}/${borderId}/${align}/${alignVertical}/${
            wrap ? 1 : 0
        }`;

    private generateCell = (cell: CellStyle) => {
        const element = $ele('xf', {
            numFmtId: cell.formatId,
            applyNumberFormat: cell.formatId ? 1 : undefined,
            fontId: cell.fontId,
            applyFont: cell.fontId ? 1 : undefined,
            fillId: cell.fillId,
            applyFill: cell.fillId ? 1 : undefined,
            borderId: cell.borderId,
            applyBorder: cell.borderId ? 1 : undefined,
            applyAlignment:
                cell.align || cell.alignVertical || cell.wrap ? 1 : undefined,
        });

        if (cell.align || cell.alignVertical || cell.wrap) {
            element.$elements = [
                $ele('alignment', {
                    horizontal: cell.align,
                    vertical: cell.alignVertical,
                    wrapText: cell.wrap ? 1 : undefined,
                }),
            ];
        }
        return element;
    };

    create = (cell: Cell) => {
        const format = this.formats.getFormat(cell.format);
        const font = this.fonts.getFont(cell.font);
        const fill = this.fills.getFill(cell.fill);
        const border = this.borders.getBorder(cell.border);

        const style: CellStyle = {
            formatId: format,
            fontId: font,
            fillId: fill,
            borderId: border,
            align: cell.align,
            alignVertical: cell.alignVertical,
        };

        var key = this.getStyleKey(style);
        if (!this.stylesIndex.has(key)) {
            this.stylesIndex.set(key, this.styles.push(style) - 1);
        }
        return this.stylesIndex.get(key) as number;
    };

    generate = () =>
        $doc(
            $ele(
                'styleSheet',
                {
                    xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
                },
                this.formats.generate(),
                this.fonts.generate(),
                this.fills.generate(),
                this.borders.generate(),
                ...this.styles.map(this.generateCell)
            )
        );
}

/*
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://purl.oclc.org/ooxml/spreadsheetml/main">
    <numFmts />
    <fonts />
    <fills />
    <borders />
    <cellXfs count="1">
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />
    </cellXfs>
</styleSheet>
*/
