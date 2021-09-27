const {
  AwsCdkTypeScriptApp,
  DependenciesUpgradeMechanism,
  Gitpod,
  DevEnvironmentDockerImage,
} = require('projen');
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

// gitpod
const gitpodPrebuild = project.addTask('gitpod:prebuild', {
  description: 'Prebuild setup for Gitpod',
});
gitpodPrebuild.exec('yarn install --frozen-lockfile --check-files');

let gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromFile('.gitpod.Dockerfile'),
  prebuilds: {
    addCheck: true,
    addBadge: true,
    addLabel: true,
    branches: true,
    pullRequests: true,
    pullRequestsFromForks: true,
  },
});

gitpod.addCustomTask({
  name: 'install package and check zsh and zsh plugin',
  init: `yarn gitpod:prebuild
sudo chmod +x ./.gitpod/oh-my-zsh.sh && ./.gitpod/oh-my-zsh.sh`,
});

gitpod.addCustomTask({
  name: 'run docker',
  command: 'sudo docker-up &',
});

gitpod.addCustomTask({
  name: 'change default shell to zsh and start zsh shell',
  command: 'sudo chsh -s $(which zsh) && zsh',
});

/* spellchecker: disable */
gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
);

project.synth();
