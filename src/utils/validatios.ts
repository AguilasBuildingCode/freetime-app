export const isValidEmail = (email: string) => {
    return /^(?!\.)(?!.*\.\.)([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64})@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)
}

export const isValidPassword = (password: string) => {
    return /^(?!\.)(?!.*\.\.)([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64})@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(password)
}