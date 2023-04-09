if (!process.env.ORIGIN) throw new Error('Missing ORIGIN')
if (!process.env.TOKEN) throw new Error('Missing TOKEN')

class HttpError extends Error {
	constructor(code, message) {
		super(message)
		this.code = code
	}
}

const main = async () => {
	console.log('Charging users...')

	const response = await fetch(
		`${process.env.ORIGIN}/api/stripe/charge-users`,
		{
			method: 'POST',
			headers: {
				authorization: `Bearer ${process.env.TOKEN}`
			}
		}
	)

	if (!response.ok)
		throw new HttpError(response.status, await response.text())

	console.log('Chargin users... DONE')
}

main()
