"use strict";
// const { sanitize } = require('@strapi/utils')
// /**
//  * event controller
//  */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event");
// {
//   async me(ctx) {
//     const { user } = ctx.state.user;

//     if (!user) {
//       return ctx.badRequest(null, [
//         {
//           message: [{ id: "No Authorization header found" }],
//         },
//       ]);
//     }
//     const data=await strapi.services.event.find({ user: user.id });
//     if(!data){
//         return ctx.notFound()
//     }
//   },
//   //
// };

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::event.event', ({ strapi }) =>  ({
//   async me(ctx) {
//     console.log(ctx);
//     const sanitizedQueryParams = await this.sanitizeQuery(ctx);
//     const { results, pagination } = await strapi.service('api::event.event').find(sanitizedQueryParams);
//     const sanitizedResults = await this.sanitizeOutput(results, ctx);

//     return this.transformResponse(sanitizedResults, { pagination });
//   }
// }));

// module.exports = (plugin) => {
//   // custom controller
//   plugin.controllers.user.updateMe = async (ctx) => {
//     if (!ctx.state.user || !ctx.state.user.id) {
//       return (ctx.response.status = 401);
//     }

//     await strapi
//       .query("plugin::users-permissions.user")
//       .update({
//         where: { id: ctx.state.user.id },
//         data: ctx.request.body,
//       })
//       .then((res) => {
//         ctx.response.status = 200;
//       });
//   };
// };
