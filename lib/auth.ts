import bcrypt from 'bcryptjs'

// Simpel kode-beskyttet adgang
const ACCESS_CODES = ['VelkommenMads', 'VelkommenMikkel'] // Dette kan ændres til en mere sikker løsning

export async function verifyAccessCode(code: string): Promise<boolean> {
  return ACCESS_CODES.includes(code)
}

export function generateAccessCode(): string {
  return ACCESS_CODES[0] // Returner første kode som standard
}
