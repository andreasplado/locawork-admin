export default interface UserEntity {
    id?: number | null,
    job_id: number,
    user_id?: number | null,
    is_approved?: boolean,
    createdAt?: string,
    updatedAt?: string,
}

