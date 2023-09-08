export default interface UserSettingsEntity {
    id?: any | null,
    ask_permissions_before_deleting_a_job?: boolean,
    createdAt?: string,
    currency?: string,
    contact?: string,
    customerId?: string,
    isBiometric? : boolean,
    memberRole?: string,
    memberStartTime?: string,
    radius?: number,
    showInformationOnStartup?: boolean,
    status?: string,
    updatedAt?: string,
    userId?: number,
    viewByDefault?: string
}

