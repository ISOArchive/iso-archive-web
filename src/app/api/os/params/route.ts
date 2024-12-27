export async function GET() {
  return Response.json({
    variants: {
      linux: 'Linux',
      unix: 'Unix',
      other: 'Other',
      windows: 'Windows'
    }
  })
}
