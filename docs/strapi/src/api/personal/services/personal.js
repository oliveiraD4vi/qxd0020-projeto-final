'use strict';

/**
 * personal service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::personal.personal');
