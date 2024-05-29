export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem('loggedInUser'));
};
