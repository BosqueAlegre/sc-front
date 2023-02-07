export interface User {
	id: string
	name: string
	patherLastName: string
	motherLastName: string
	email: string
	role: string
}

export interface NewUser {
	name: string
	patherLastName: string
	motherLastName: string
	email: string
	password: string
}
