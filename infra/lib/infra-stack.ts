import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { Cluster, KubernetesVersion } from "aws-cdk-lib/aws-eks-v2";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Vpc, IpAddresses } from "aws-cdk-lib/aws-ec2"

interface InfraStackProps extends cdk.StackProps {
  prefix: string | false
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: InfraStackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "vpc", {
      ipAddresses: IpAddresses.cidr("10.1.1.0/30"),
    });

    const ecrRepository = new Repository(this, "ecrRepository", {
      imageScanOnPush: true,
    });
    
    const cluster = new Cluster(this, "eksCluster", {
      version: KubernetesVersion.V1_36,
    });
    
  }
}
