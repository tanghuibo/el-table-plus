export default {
    async get(type, key) {
        let json = localStorage.getItem(`${type}-${key}`);
        if(json == null || json === '') {
            return null;
        }
        return JSON.parse(json);
    },
    async save(type, key, data) {
        localStorage.setItem(`${type}-${key}`, JSON.stringify(data));
    }
}