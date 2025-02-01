export const isValidEmail = (email: string): boolean => {
    return /^(?!\.)(?!.*\.\.)([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64})@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)
}

export const isValidPassword = (password: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
}

export const isEmpty = (value: string): boolean => {
    return value === ""
}

export const isUndefined = (value: unknown): boolean => {
    return typeof value === 'undefined'
}

export const isNotUndefined = (value: unknown): boolean => {
    return typeof value !== 'undefined'
}