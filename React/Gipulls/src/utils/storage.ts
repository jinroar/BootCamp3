// utils/storage.ts
export const getStoredData = <T>(key: string, defaultValue: T): T => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
};

export const setStoredData = <T>(key: string, data: T): void => {
    localStorage.setItem(key, JSON.stringify(data));
};
