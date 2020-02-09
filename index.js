'use strict'
const root = exports

const assert = require('assert');
const knn = require('knn-core');

const uniq = root.uniq = (a, b) => knn.neighbor(a, b) > 0;
assert.ok(!uniq({a: 1, b: 2}, { a: 1, b: 2}));
const notUniq = root.notUniq = (a, b) => knn.neighbor(a, b) === 0;
assert.ok(notUniq({a: 1, b: 2}, {a: 1, b: 2}));
const deepUniq = root.deepUniq = (arr) => {
    let out = [];
    arr.map(item => {
        if (out.length === 0) {
            out.push(item);
        } if (out.filter(internal => uniq(item, internal)).length > 0) {
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
assert.deepEqual(deepUniq([{a: 1}, {a: 1}, {b: 2, c: 3}, {d: 4, e: 5}]), [{a: 1}, {b: 2, c: 3}, {d: 4, e: 5}]);
assert.deepEqual(deepUniq(deepUniq([{a: 1}, {b: 2, c: 3}, {b: 2, c: 3}]).reverse()).reverse(), [{a: 1}, {b: 2, c: 3}]);
const neighborUniq = root.neighborUniq = (arr) => deepUniq(deepUniq(arr).reverse()).reverse();
assert.deepEqual(neighborUniq([{a: 1}, {b: 2, c: 3}, {b: 2, c: 3}]), [{a: 1}, {b: 2, c: 3}]);
assert.deepEqual(neighborUniq([{a: 1}, {b: 2, c: 3}, {b: 2, c: 3}, {d: 4}]), [{a: 1}, {b: 2, c: 3}, {d: 4}]);

const extend = root.extend = (destination, source) => {
    for (var property in source)
        destination[property] = source[property]
    return destination
}

extend(root, knn)
