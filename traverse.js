const is = require("../mcs/clientng/app/lib/is");

function traverse(root, options) {
    options = options || {};
    const pre = options.pre;
    const post = options.post;

    function visit(node, parent) {
        if (!node || !is.string(node.type)) {
            return;
        }

        node.$parent = parent;

        if (pre) {
            pre(node);
        }

        const props = Object.keys(node).filter(function(prop) {
            return prop[0] !== "$";
        });

        props.forEach(function(prop) {
            var child = node[prop];

            if (Array.isArray(child)) {
                child.forEach(function(child) {
                    visit(child, node);
                });
            } else {
                visit(child, node);
            }
        });

        if (post) {
            post(node);
        }
    }

    visit(root, null);
};
module.exports = traverse;
