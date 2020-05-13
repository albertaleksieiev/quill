import Bold from './bold';
import { applyFormat } from '../modules/clipboard';

const headersTagNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const headersSelector = headersTagNames.join(", ")

function matchHeaders(node, delta) {
    let format = {};
    format[Bold.blotName] = true;

    let fontSize = getComputedStyle(node).fontSize;
    if (fontSize) {
        format.size = fontSize;
    }
    delta = applyFormat(delta, format);
    return delta;
}

export { matchHeaders, headersSelector };
