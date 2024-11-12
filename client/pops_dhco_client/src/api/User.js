import axios from 'axios';

export class User {
    
    static baseUrl = 'http://localhost:3000/colaboradores';

    static async login(user) {
        try {
            const response = await axios.post(`${this.baseUrl}/login`, user );
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    static async logout() {
        try {
            const response = await axios.post(`${this.baseUrl}/logout`);
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    }
}
