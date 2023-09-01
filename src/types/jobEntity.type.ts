export default interface JobEntity {
    id?: any | null,
    applyer_id?: number | null,
    category_id?: number | null,
    description?: string,
    is_done?: boolean,
    latitude?: number,
    longitude?: number,
    salary?: number,
    title?: string,
    user_id?: number
    createdAt?: string,
    updatedAt?: string,
}

