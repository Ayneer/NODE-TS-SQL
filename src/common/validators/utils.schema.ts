export const getParamsErrorMessages = (name: string) => ({
    'string.base': `${name}_error`,
    'string.empty': `${name}_error`,
    'string.alphanum': `${name}_error`,
    'any.only': `${name}_error`,
    'any.required': `required_${name}`,
    'string.pattern.base': `${name}_format_error`
});

export const patternEmail = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);