import { XMLDocument, XMLElement, XMLValue } from './types';
export type { XMLDocument, XMLElement, XMLValue };
export * from './utils';

const stringifyAttributes = (attr: Record<string, any>) => {
    let xml = '';
    for (const key in attr) {
        if (
            !key.startsWith('$') &&
            attr[key] !== null &&
            attr[key] !== undefined
        ) {
            xml += ` ${key}="${String(attr[key])}"`;
        }
    }
    return xml;
};

const stringifyElement = (ele: XMLElement | XMLValue): string => {
    if (ele.$type === 'value') return ele.$value;
    let xml = `<${ele.$name}${stringifyAttributes(ele)}`;
    if (ele.$elements) {
        xml += '>';
        for (const element of ele.$elements) {
            xml += stringifyElement(element);
        }
        xml += `</${ele.$name}>`;
    } else {
        xml += '/>';
    }
    return xml;
};

export default {
    stringify(doc: XMLDocument): string {
        let xml = `<?xml${stringifyAttributes(doc)}?>`;
        for (const element of doc.$elements) {
            xml += stringifyElement(element);
        }
        return xml;
    },
};
