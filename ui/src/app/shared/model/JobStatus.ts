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

export enum JobStatus {
    Submitted = <any> 'Submitted',
    Running = <any> 'Running',
    Aborting = <any> 'Aborting',
    Failed = <any> 'Failed',
    Succeeded = <any> 'Succeeded',
    Aborted = <any> 'Aborted'
}
