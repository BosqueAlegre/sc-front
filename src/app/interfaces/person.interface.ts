export interface Person {
	id: string
	ci: string
	name: string
	patherLastName: string
	motherLastName?: string
	email: string
	phone: string
	gender: string
	dateOfBirth: number
	apartment: string
	createdAt: number
	updatedAt: number
}

export interface NewMember {
	ci: string
	name: string
	patherLastName: string
	motherLastName?: string
	email: string
	phone: string
	gender: string
	dateOfBirth: number
	apartment: string
}