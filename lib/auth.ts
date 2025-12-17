export function checkPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  return password === adminPassword
}

