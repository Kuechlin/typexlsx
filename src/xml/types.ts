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
