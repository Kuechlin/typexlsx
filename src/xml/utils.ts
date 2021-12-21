import { XMLDocument, XMLElement, XMLValue } from './types';

export const $doc = (...elements: XMLElement[]): XMLDocument => ({
    version: '1.0',
    encoding: 'utf-8',
    standalone: 'yes',
    $elements: elements,
});

export const $ele = (
    name: string,
    attributes?: Record<string, any>,
    ...elements: (XMLElement | XMLValue)[]
): XMLElement => ({
    ...attributes,
    $type: 'element',
    $name: name,
    $elements: elements,
});

export const $val = (value: any): XMLValue => ({
    $type: 'value',
    $value: String(value),
});
