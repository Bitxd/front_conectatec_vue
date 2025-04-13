export default
{
    isAuthenticated()
    {
        const token = localStorage.getItem('token');
        if (!token) return false;
        
        try
        {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        }
        catch
        {
            this.logout();
            return false;
        }
    },

    logout()
    {
        localStorage.removeItem('token');
    },

    getToken()
    {
        return localStorage.getItem('token');
    },

    getIdUser()
    {
        const token = this.getToken();
        if (!token) return null;
        
        try
        {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id;  
        }
        catch
        {
            return null;
        }
    }
};