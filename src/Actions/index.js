export const RegisterData = (data) => {
    return {
        type  : "RegisterData",
        value : data ,
        accountId : data.mailId
    }
}