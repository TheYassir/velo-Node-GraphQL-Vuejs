const { join } = require('path');
const { readdirSync, statSync } = require('fs');

module.exports = function getAllFiles(path, filter = /.*/, result = []) {
    let data = [...result];
    const files = readdirSync(path);
    files.forEach((f) => {
        const currentPath = join(path, f);

        if (statSync(currentPath).isDirectory()) {
            data = getAllFiles(currentPath, filter, data);
        } else if (filter.test(currentPath)) {
            data.push(currentPath);
        }
    });

    return data;
};
