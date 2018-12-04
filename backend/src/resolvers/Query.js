const { forwardTo } = require('prisma-binding');

const Query = {
    places: forwardTo('db'),
    place: forwardTo('db'),
    placesConnection: forwardTo('db'),
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();

    //     return items;
    // }

};

module.exports = Query;