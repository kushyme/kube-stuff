#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();
const _ctx = app.node.tryGetContext("prefix");
const prefix: string | false = typeof _ctx === "string" ? _ctx : false;
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new InfraStack(app, 'InfraStack', {
  env,
  prefix: prefix
});
