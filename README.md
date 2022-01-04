![favicon](assets/favicon64x64.png)

# typexlsx

Write \*.xlsx files in a browser or Node.js

### 🚨 in development 🚨

### [Demo](https://kuechlin.github.io/typexlsx/)

## Features

- small
- styles
    - fonts
    - fill
    - border
    - formats
- types
    - string
    - number
    - date

## Install

with npm:

    npm install typexlsx

with yarn:

    yarn add typexlsx

to save the blob you could for example use [file-saver](https://github.com/eligrey/FileSaver.js)

## Use

to write an \*.xlsx file, provide the sheet data, each cell having a type, style and a value:

```typescript
import {saveAs} from 'file-saver';
import generateXlsx from '../src/typexlsx';

const sheet: Sheet = {
    name: 'TestFile',
    rows: [
        [{value: 'A'}, {value: 'B'}, {value: 'C'}],
        [{value: 1}, {value: 2}, {value: 3}],
    ],
};

generateXlsx(TEST_FILE)
    .then((blob) => saveAs(blob, 'Workbook.xlsx'))
    .catch((err) => console.error(err));
```

## Api

### Workbook

Workbook is an array of Sheets.

### Sheet

| Name  | Type   | Description   |
| ----- | ------ | ------------- |
| name? | string | name of Sheet |
| rows  | Row[]  | array of rows |

### Row

A Row is an array of Cells

### Cell

| Name           | Type                             | Description           |
| -------------- | -------------------------------- | --------------------- |
| value?         | string / number / boolean / Date | cell value            |
| align?         | left / center / right            | text align            |
| alignVertical? | top / center / bottom            | vertical align        |
| wrap?          | boolean                          | text wrap             |
| format?        | string                           | number or date format |
| span?          | number                           | col span              |
| rowSpan?       | number                           | row span              |
| fill?          | string                           | background hex color  |
| font?          | XLSXFont                         | font styles           |
| border?        | BorderStyles                     | border styles         |

### XLSXFont

| Name    | Type                       | Description |
| ------- | -------------------------- | ----------- |
| style?  | 'bold' / 'italic' / 'none' | font style  |
| size?   | number                     | font size   |
| family? | string                     | font family |
| color?  | string                     | hex color   |

### XLSXBorder

| Name   | Type            | Description  |
| ------ | --------------- | ------------ |
| color? | string          | hex color    |
| style? | XLSXBorderStyle | border style |

### XLSXBorders

| Name      | Type       | Description           |
| --------- | ---------- | --------------------- |
| start?    | XLSXBorder | left border style     |
| end?      | XLSXBorder | right border style    |
| top?      | XLSXBorder | top border style      |
| bottom?   | XLSXBorder | bottom border style   |
| diagonal? | XLSXBorder | diagonal border style |

### XLSXBorderStyle

- thin
- medium
- thick
- dotted
- hair
- dashed
- mediumDashed
- dashDot
- mediumDashDot
- dashDotDot
- mediumDashDotDot
- slantDashDot

### XLSX Date / Number Format

[Source](https://xlsxwriter.readthedocs.io/format.html#format-set-num-format)

| Format                        |
|-------------------------------|
| 0                             |
| 0.00                          |
| #,##0                         |
| #,##0.00                      |
| 0%                            |
| 0.00%                         |
| m/d/yy                        |
| d-mmm-yy                      |
| d-mmm                         |
| mmm-yy                        |
| h:mm AM/PM                    |
| h:mm:ss AM/PM                 |
| h:mm                          |
| h:mm:ss                       |
| m/d/yy h:mm                   |