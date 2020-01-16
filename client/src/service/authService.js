const authService = {
    isAuthenticated: () => {
        const token = localStorage.getItem('token')
        return token ? true: false
    },

    signOut: () => {
        localStorage.removeItem('token')
    }
}

export default authService