'use strict'
const root = exports

const assert = require('assert');
const knn = require('knn');

const uniq = root.uniq = (a, b) => knn.neighbor(a, b) > 0;
assert.ok(!uniq({a: 1, b: 2}, { a: 1, b: 2}));
const notUniq = root.notUniq = (a, b) => knn.neighbor(a, b) === 0;
assert.ok(notUniq({a: 1, b: 2}, {a: 1, b: 2}));
const deepUniq = root.deepUniq = (arr) => {
    let out = [];
    arr.map(item => {
        if (out.length === 0) {
            out.push(item);
        } else {
            out.map(subItem => {
                if (uniq(item, subItem)) {
                    out.push(item);
                }
            });
        }
    });
    return out;
};
assert.deepEqual(deepUniq([{a: 1, b: 2}, {a: 1, b: 2}, {c: 3, d: 4}]), [{a: 1, b: 2}, {c: 3, d: 4}]);
