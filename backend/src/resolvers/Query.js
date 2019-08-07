const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
require('dotenv');
const fetch = require('node-fetch');

const FB_FIELDS = 'cover,name,place,description,start_time';
const FB_API =
  `https://graph.facebook.com/v4.0/1353765521380739/events?access_token=` +
  process.env.FACEBOOK_ACCESS_TOKEN +
  `&fields=${FB_FIELDS}`;

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
        where: { id: ctx.request.userId },
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
  },

  async event(parent, args) {
    // const { id } = args
    const response = await fetch(FB_API);
    const fbEvent = await response.json();
    return fbEvent;
  },
};

module.exports = Query;
