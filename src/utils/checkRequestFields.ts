import { Request } from 'express'

export function checkRequiredFields(requestBody: Request['body'], requiredFields: string[]) {
    const missedFields: string[] = []
    const bodyFieldsArray = Object.keys(requestBody)

    for (const requiredField of requiredFields) {
        if (bodyFieldsArray.includes(requiredField) === false) missedFields.push(requiredField)
    }

    console.log('Required fields: ', requiredFields)
    console.log('Recieved fields: ', bodyFieldsArray)
    console.log('Missed fields: ', missedFields)

    return missedFields
}