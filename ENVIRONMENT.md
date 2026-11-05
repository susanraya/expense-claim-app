# ENVIRONMENT

Written by Dex. Do not edit: Dex rewrites this file whenever the project's service list changes.

How this project's code reaches its backing services. Every connection setting is an environment variable named below. The sandbox provides the values (the deployment does in production); never write a value into code, tests, config files or this repository.

## PostgreSQL

The app's relational database.

| Variable | Holds |
|---|---|
| `DATABASE_URL` | SQLAlchemy URL of the database, password included |

Read these variables with the framework's own settings mechanism.

Tests use the real PostgreSQL the sandbox runs (same `DATABASE_URL`); no mocks, no SQLite stand-in.

## Amazon S3

File storage in AWS; in the sandbox a private test bucket emptied at each sprint.

| Variable | Holds |
|---|---|
| `S3_BUCKET` | the bucket to use |
| `AWS_REGION` | the bucket's region |
| `AWS_ACCESS_KEY_ID` | short-lived access key |
| `AWS_SECRET_ACCESS_KEY` | short-lived secret key |
| `AWS_SESSION_TOKEN` | the session token that goes with them |

Read these variables with the framework's own settings mechanism.

Tests use the real test bucket (same variables); no mocks, no moto. The keys are short-lived: let boto3 read them from the environment, never copy them.
