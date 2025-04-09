export default
{
    isAuthenticated()
    {
        const token = localStorage.getItem('token');
        if (token)
        {
            try
            {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
     
                if (decodedToken.exp * 1000 > Date.now())
                {
                    return true;
                }
                else
                {
                    this.logout();
                    return false;
                }
            }
            catch (error)
            {
                this.logout();
                return false;
            }
        }
        return false;
    },
    logout()
    {
        localStorage.removeItem('token');
    }
};
