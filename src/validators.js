export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};

export const positiveInteger = value => {
    if (!value) {
        return undefined;
    }
    const n = Math.floor(Number(value));
    return n !== Infinity && String(n) === value && n > 0 ? undefined : 'Must be an integer greater than 0';
}


export const noSpaces = value => 
    value.replace(/\s/g,'') === value ? undefined : 'Must be one word with no spaces';

export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';

export const notANumber = value => 
    /^[a-z]+$/i.test(value) ? undefined : 'Must consist of letters only';

export const singleLetter = value =>
    value.length === 1 && value.match(/[a-z]/i) ? undefined : 'Must be a single letter';

export const email = value =>
        /^\S+@\S+$/.test(value) ? undefined : 'Must be a valid email address';