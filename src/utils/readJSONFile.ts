import { readFile } from 'fs/promises'

export async function readJSONFile<ReturnType>(path: string): Promise<ReturnType> {
  const jsonFile = await readFile(path, 'utf8')
  try {
    return JSON.parse(jsonFile) as ReturnType
  } catch (error) {
    throw error
  }
}
