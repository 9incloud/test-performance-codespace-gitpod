const { AwsCdkTypeScriptApp, DependenciesUpgradeMechanism } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.123.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  name: 'test-performance-codespace-gitpod',
  cdkDependencies: [
    '@aws-cdk/aws-lambda', '@aws-cdk/aws-s3',
  ],
  releaseWorkflow: false,
  buildWorkflow: false,
  stale: false,
  depsUpgrade: DependenciesUpgradeMechanism.NONE,
});


const common_exclude = [
  'cdk.out',
  'cdk.context.json',
  'yarn-error.log',
  'dependabot.yml',
  '.idea',
];

project.gitignore.exclude(...common_exclude);


project.synth();
