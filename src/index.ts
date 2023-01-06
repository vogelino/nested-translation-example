import dataEn from './data/data-en'
import dataFr from './data/data-fr'
import { isObject } from './utils/isObject'
import { readJSONFile } from './utils/readJSONFile'

type TranslationObjectType = { [key: string]: TranslationValueType | TranslationObjectType[] | TranslationObjectType }
type TranslationValueType = undefined | null | string | number
type TranslationMapType = Record<string, string>

type TranslationKeyType = 'fr'
const targetData: Record<TranslationKeyType, TranslationObjectType> = { fr: dataFr }

async function findTranslation(
  sourceData: TranslationObjectType,
  targetLanguage: TranslationKeyType
) {
  let translations = await readJSONFile<TranslationMapType>(
    `./src/data/translations-${targetLanguage}.json`
  )
  const translatedData = targetData[targetLanguage]

  return getTranslatedObject(sourceData, translatedData, translations)
}

function getTranslatedObject(
  obj: TranslationObjectType,
  translatedData: TranslationObjectType,
  translations: TranslationMapType
): TranslationObjectType {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    const translatedValue = translatedData[key] as typeof value
    let finalValue = value

    if (Array.isArray(value) && Array.isArray(translatedValue)) {
      finalValue = value.map((child, idx) => {
        const translatedChild = translatedValue[idx] as TranslationObjectType
        return getTranslatedObject(child, translatedChild, translations)
      })
    }

    if (isObject(value) && isObject(translatedValue)) {
      finalValue = getTranslatedObject(
        value as TranslationObjectType,
        translatedValue as TranslationObjectType,
        translations
      )
    }

    if (typeof value === 'string') {
      finalValue = translations[value] || value
    }

    return { ...acc, [key]: finalValue }
  }, {} as TranslationObjectType)
}

async function exec() {
  const translatedStrucure = await findTranslation(dataEn, 'fr')
  console.log(JSON.stringify(translatedStrucure, null, 2))
}

exec()

