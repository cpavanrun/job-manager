# coding: utf-8

from __future__ import absolute_import

from jobs.models.job_metadata_response import JobMetadataResponse
from jobs.models.query_jobs_request import QueryJobsRequest
from jobs.models.query_jobs_response import QueryJobsResponse
from . import BaseTestCase
from six import BytesIO
from flask import json


class TestJobsController(BaseTestCase):
    """ JobsController integration test stubs """

    def test_abort_job(self):
        """
        Test case for abort_job

        Abort a job by ID
        """
        response = self.client.open('/jobs/{id}/abort'.format(id='id_example'),
                                    method='POST')
        self.assert200(response, "Response body is : " + response.data.decode('utf-8'))

    def test_get_job(self):
        """
        Test case for get_job

        Query for job and task-level metadata for a specified job
        """
        response = self.client.open('/jobs/{id}'.format(id='id_example'),
                                    method='GET')
        self.assert200(response, "Response body is : " + response.data.decode('utf-8'))

    def test_query_jobs(self):
        """
        Test case for query_jobs

        Query jobs by various filter criteria. Returned jobs are ordered from newest to oldest submission time. 
        """
        body = QueryJobsRequest()
        response = self.client.open('/jobs/query',
                                    method='POST',
                                    data=json.dumps(body),
                                    content_type='application/json')
        self.assert200(response, "Response body is : " + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()