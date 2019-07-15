const { transform } = require('@babel/core');
const t = require('@babel/types');

function plugin() {
    return {
        visitor: {
            VariableDeclarator(path) {
                if (path.node.type === 'VariableDeclarator') {
                    const { name } = path.node.id;
                    if (path.node.init && path.node.init.type === 'CallExpression') {
                        if (path.node.init.callee.name === '_interopRequireDefault') {
                            const moduleName = path.node.init.arguments[0].arguments[0].value;
                            const newIdentifier = path.scope.generateUidIdentifier(name);
                            const newVariableDeclarator = t.variableDeclaration('var', [
                                t.variableDeclarator(
                                    newIdentifier,
                                    path.node.init.arguments[0],
                                )
                            ]);
                            path.parentPath.insertBefore(newVariableDeclarator);
                            path.node.init.arguments = [newIdentifier];
                        }
                    }
                }
            },
        },
    };
}

module.exports = plugin;
