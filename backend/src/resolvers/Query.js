const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  places: forwardTo('db'),
  place: forwardTo('db'),
  placesConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    //1. If they're logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    //2. Check if user has permission to run query of all users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    //3. If they do, query all users
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
