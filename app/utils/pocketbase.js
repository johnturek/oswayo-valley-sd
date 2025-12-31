import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://oswayo-cms.turek.in');

// Optional: Auth helper
export const login = async (email, password) => {
    return await pb.collection('users').authWithPassword(email, password);
};

export const logout = () => {
    pb.authStore.clear();
};

export const getNews = async () => {
    // try/catch handled by caller or fallback to empty
    try {
        const records = await pb.collection('news').getList(1, 10, {
            sort: '-created',
        });
        return records.items;
    } catch (e) {
        console.error("Error fetching news:", e);
        return [];
    }
};
