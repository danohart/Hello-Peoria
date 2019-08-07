const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
require('dotenv');
const fetch = require('node-fetch');

// Facebook Graph API constants
const FB_FIELDS = 'cover,name,place,description,start_time';
const FB_API =
  `https://graph.facebook.com/v4.0/1353765521380739/events?access_token=` +
  process.env.FACEBOOK_ACCESS_TOKEN +
  `&fields=${FB_FIELDS}`;

// Foursquare Places API constants
const FSQ_ID = process.env.FSQ_ID;
const FSQ_SECRET = process.env.FSQ_SECRET;
const FSQ_API = `https://api.foursquare.com/v2/venues/search?client_id=${FSQ_ID}&client_secret=${FSQ_SECRET}&query=coffee`;

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
  },
  // Facebook Graph API for events
  async event(parent, args) {
    // const { id } = args
    const response = await fetch(FB_API);
    const fbEvent = await response.json();
    return fbEvent;
  },
  // Foursquare Places API

  async fsqInfo(parent, args) {
    // const { id } = args
    const response = await fetch(FSQ_API);
    const fsqInfo = await response.json();
    return fsqInfo;
  }
};

module.exports = Query;
