module.exports = function plugin({ types: t }) {
  return {
    visitor: {
      VariableDeclarator(path) {
        if (path.node.type === 'VariableDeclarator') {
          const { name } = path.node.id;
          if (path.node.init && path.node.init.type === 'CallExpression') {
            if (path.node.init.callee.name === '_interopRequireDefault') {
              const newIdentifier = path.scope.generateUidIdentifier(name);
              const newVariableDeclarator = t.variableDeclaration('var', [
                t.variableDeclarator(
                  newIdentifier,
                  path.node.init.arguments[0],
                ),
              ]);
              path.parentPath.insertBefore(newVariableDeclarator);
              /* eslint-disable no-param-reassign */
              path.node.init.arguments = [newIdentifier];
            }
          }
        }
      },
    },
  };
};
