export type Workbook = Sheet[];

export type Sheet = {
    name?: string;
    rows: Row[];
};

export type Row = Cell[];

export type CellValue = undefined | null | string | number | boolean | Date;

export type Cell = {
    value?: CellValue;
    align?: 'left' | 'center' | 'right';
    alignVertical?: 'top' | 'center' | 'bottom';
    wrap?: boolean;
    format?: string;
    span?: number;
    rowSpan?: number;
    fill?: string;
    font?: XLSXFont;
    border?: XLSXBorder | XLSXBorders;
};

export type XLSXBorders = {
    start?: XLSXBorder;
    end?: XLSXBorder;
    top?: XLSXBorder;
    bottom?: XLSXBorder;
    diagonal?: XLSXBorder;
};
export type XLSXBorder = {
    color?: string;
    style?: XLSXBorderStyle;
};
export type XLSXBorderStyle =
    | 'thin'
    | 'medium'
    | 'thick'
    | 'dotted'
    | 'hair'
    | 'dashed'
    | 'mediumDashed'
    | 'dashDot'
    | 'mediumDashDot'
    | 'dashDotDot'
    | 'mediumDashDotDot'
    | 'slantDashDot';
export const isXLSXBorder = (val: any): val is XLSXBorder => {
    return typeof val === 'object' && ('color' in val || 'style' in val);
};

export type XLSXFont = {
    style?: 'bold' | 'italic' | 'none';
    size?: number;
    family?: string;
    color?: string;
};
