/**
 * converts hex color to excel rgb
 * @param color : hex color;
 * @returns
 */
export default function convertToExcelRgb(color: string) {
    if (color[0] !== '#') {
        throw new Error(`Color "${color}" must start with a "#"`);
    }
    return `FF${color.slice('#'.length).toUpperCase()}`;
}
