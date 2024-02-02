export const isProd = () => {
    return window.location.host !== 'localhost:3000';
};
