primary database - sqlite
secondary database - lowdb

docker project prefix: qa

===============================================================

tables -
DockerWordpressProject

===============================================================

(read) - GET /api/docker/status
(read) - GET /api/docker/project-details
(write) - POST /api/docker/start-project
(write) - POST /api/docker/stop-project

(write) - POST /api/wordpress/create-wp-directory
(write) - POST /api/wordpress/create-project-directory
(write) - POST /api/wordpress/create-shell-directory
(write) - POST /api/wordpress/create-resource
(write) - POST /api/wordpress/transfer-dependencies

(write) - POST /api/wordpress/configuration/create-project
(write) - POST /api/wordpress/configuration/update-project
(read) - GET /api/wordpress/configuration/project-details/:project-name

(read) - GET /api/automation/environment-details
(write) - POST /api/automation/start-test
(write) - POST /api/automation/stop-test

===============================================================

[
p1 - {wordpress: 6.5, woocommerce: 7.8, dokan: 3.9},
p2 - {wordpress: 6.5, woocommerce: 7.8, dokan: 3.9}
]

Test Group
[
{name: group1, config: {run: e2e, tags: @smoke}, project_configurations: [p1, p2]}
]

TestGroup

- TestEnvironmentId
  TestEnvironment
  DockerWordpressProject
