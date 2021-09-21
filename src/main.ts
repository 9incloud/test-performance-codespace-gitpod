import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import { App, Construct, Stack, StackProps, CfnOutput } from '@aws-cdk/core';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    this.createCodePipelineEventLambdaFunction(
      'main',
      '',
      'pipeline.pipelineName',
      '',
    );
  }

  private createCodePipelineEventLambdaFunction(
    stage: string,
    slackWebhookURL: string,
    codePipelineName: string,
    githubPersonalToken: string,
  ): lambda.Function {
    const badgeBucket = new s3.Bucket(this, 'BadgeBucket', {
      publicReadAccess: true,
    });

    const badgeBucketImageKeyName = `${stage}-latest-build.svg`;

    const lambdaFunc = new lambda.Function(this, 'CodepipelineEventLambda', {
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambda'),
        {
          bundling: {
            user: 'root',
            image: lambda.Runtime.NODEJS_14_X.bundlingImage,
            command: [
              'bash',
              '-c',
              [
                'npm install',
                'npm run build',
                'cp -r /asset-input/dist /asset-output/',
                'npm install --only=production',
                'cp -a /asset-input/node_modules /asset-output/',
              ].join(' && '),
            ],
          },
        },
      ),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'dist/codepipelineEventLambda.handler',
      environment: {
        STAGE: stage,
        SLACK_WEBHOOK_URL: slackWebhookURL,
        BADGE_BUCKET_NAME: badgeBucket.bucketName,
        BADGE_BUCKET_IMAGE_KEY_NAME: badgeBucketImageKeyName,
        CODE_PIPELINE_NAME: codePipelineName,
        GITHUB_PERSONAL_TOKEN: githubPersonalToken,
      },
    });

    badgeBucket.grantReadWrite(lambdaFunc);

    new CfnOutput(this, 'badgeMarkdownLink', {
      value: `[![Build Status](https://${badgeBucket.bucketName}.s3-ap-northeast-1.amazonaws.com/${badgeBucketImageKeyName}#1)](https://ap-northeast-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/${codePipelineName}/view)`,
    });

    return lambdaFunc;
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();


