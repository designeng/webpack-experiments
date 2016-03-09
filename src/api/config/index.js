const config = {
    protocol: 'https',
    host: 'dev.drive.ru',
    baseDir: 'api',
    version: 'v1'
}

function getBaseUrl() {
    return config.protocol + '://' + config.host + '/' + config.baseDir + '/' + config.version
}

export default config;

export function getNewsUrl() {
    return getBaseUrl() + "/items/news";
}