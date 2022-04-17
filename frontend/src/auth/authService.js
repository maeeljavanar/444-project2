class AuthService {
    logout() {
        localStorage.removeItem("token");
    }
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();