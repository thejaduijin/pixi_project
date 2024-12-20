export const AssetManager = {
    assets: {},
    set(name, asset) {
        this.assets[name] = asset;
    },
    get(name) {
        return this.assets[name];
    },
};