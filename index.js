if (!process.env.ORIGIN) throw new Error('Missing ORIGIN')
if (!process.env.SECRET) throw new Error('Missing SECRET')

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
				authorization: `Bearer ${process.env.SECRET}`
			}
		}
	)

	if (!response.ok)
		throw new HttpError(response.status, await response.text())

	console.log(JSON.stringify(await response.json(), null, 2))

	console.log('Charging users... DONE')
}

main()
