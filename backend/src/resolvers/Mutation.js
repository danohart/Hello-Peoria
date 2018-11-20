const Mutations = {
    async createPlace(parent, args, ctx, info) {
        // TODO Logged in?

        const place = await ctx.db.mutation.createPlace(
            {
                data: {
                    ...args
                },
            }, 
            info
        );

        return place;
    },
    // updatePlace(parent, args, ctx, info) {
    //     // first take a copy of the updates
    //     const updates = { ...args };
    //     // remove the ID from the updates
    //     delete updates.id;
    //     // run the update method
    //     return ctx.db.mutation.updatePlace(
    //         {
    //             data: updates, 
    //             where: {
    //                 id: args.id, }, 
    //         },
    //     info 
    //     );
    // },

    async deletePlace(parent, args, ctx, info) {
        const where = { id: args.id };
        // Find the Place
        const place = await 
        ctx.db.query.place({ where }, `{id name}` );
        // Check if they own the place, or have perms

        // Delete it!
        return ctx.db.mutation.deletePlace({ where }, info);
    },
};
module.exports = Mutations;