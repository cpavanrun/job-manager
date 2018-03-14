/**
 * Job Manager Service
 * Job Manager API for interacting with asynchronous batch jobs and workflows.
 *
 * OpenAPI spec version: 0.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

/**
 * Extended fields to query by which may not be supported by all backends.
 */
export interface ExtendedQueryFields {
    /**
     * Returns only jobs belonging to the specified project. If specified by the /capabilities endpoint, this field is required for all query requests. All jobs have exactly one parent projectId.
     */
    projectId?: string;

    /**
     * Returns only jobs with an equal or later submission datetime.
     */
    submission?: Date;

    /**
     * Returns only jobs with the specified user ID.
     */
    userId?: string;

}