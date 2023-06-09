import { Request } from 'express'

export function checkRequiredFields(requestBody: Request['body'], requiredFields: string[]) {
    if ('undefined' === typeof requestBody) {
        return requiredFields
    }
    const missedFields: string[] = []
    const bodyFieldsArray = Object.keys(requestBody)

    for (const requiredField of requiredFields) {
        if (bodyFieldsArray.includes(requiredField) === false) missedFields.push(requiredField)
    }

    return missedFields
}