import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { Cluster, KubernetesVersion, AccessPolicy, AccessScopeType } from "aws-cdk-lib/aws-eks-v2";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Vpc, IpAddresses } from "aws-cdk-lib/aws-ec2"

interface InfraStackProps extends cdk.StackProps {
  prefix: string | false
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: InfraStackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "vpc", {
      ipAddresses: IpAddresses.cidr("10.1.0.0/16"),
      maxAzs: 2,
      natGateways: 1
    })

    const ecrRepository = new Repository(this, "catsEcrRepository", {
      imageScanOnPush: true,
      repositoryName: "cats-repository",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });
    
    const cluster = new Cluster(this, "catsEksCluster", {
      version: KubernetesVersion.V1_36,
      vpc: vpc,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      clusterName: "cats-cluster",
    });

    const adminRoleArn =
      this.node.tryGetContext('adminRoleArn') ?? process.env.CDK_ADMIN_ROLE_ARN;
    
    if (adminRoleArn) {
      cluster.grantAccess(
        'erikAdminAccess',
        adminRoleArn,
        [
          AccessPolicy.fromAccessPolicyName('AmazonEKSClusterAdminPolicy', {
            accessScopeType: AccessScopeType.CLUSTER,
          }),
        ],
      );
    } else {
      throw new Error('CDK_ADMIN_ROLE_ARN not set — refusing to synth without an EKS access entry.');
    }    
  }
}
