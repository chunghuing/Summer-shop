export function getErrorMessage(err: unknown, fallback: string): string {
  if (
    err &&
    typeof err === 'object' &&
    'statusMessage' in err &&
    typeof err.statusMessage === 'string'
  ) {
    return err.statusMessage
  }
  return fallback
}
