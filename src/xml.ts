export interface XMLDocument {
    version: string;
    encoding: string;
    standalone?: string;
    $elements: XMLElement[];
}
export interface XMLElement extends Record<string, any> {
    $type: 'element';
    $name: string;
    $elements?: (XMLElement | XMLValue)[];
}
export interface XMLValue {
    $type: 'value';
    $value: string;
}

export const doc = (...elements: XMLElement[]): XMLDocument => ({
    version: '1.0',
    encoding: 'utf-8',
    standalone: 'yes',
    $elements: elements,
});
export const ele = (
    name: string,
    attributes?: Record<string, any>,
    ...elements: (XMLElement | XMLValue)[]
): XMLElement => ({
    ...attributes,
    $type: 'element',
    $name: name,
    $elements: elements,
});
export const val = (value: any): XMLValue => ({
    $type: 'value',
    $value: String(value),
});

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

export const XML = {
    stringify(doc: XMLDocument): string {
        let xml = `<?xml${stringifyAttributes(doc)}?>`;
        for (const element of doc.$elements) {
            xml += stringifyElement(element);
        }
        return xml;
    },
};
