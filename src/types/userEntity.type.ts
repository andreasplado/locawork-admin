export default interface UserEntity {
    id?: any | null,
    fullname?: string | null,
    email?: string,
    password?: string,
    contact?: string,
    firebaseToken? : string,
    role?: string,
    membership?: string,
    addsRemoved?: boolean,
    registredMembership?: string,
    createdAt?: string,
    updatedAt?: string,
    isAccountNonLocked?: boolean,
    enabled?: boolean,
    expired?: boolean,
    credentialsNonExpired?: boolean
}

