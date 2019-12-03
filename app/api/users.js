/**
 * Get logged in user's profile data
 * @returns {Promise}
 */
export function getAuthedUserProfile() {
    return { data: { id: 1, name: 'John Doe', avatar: 'https://picsum.photos/200' } };
}
