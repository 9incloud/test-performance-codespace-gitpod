# [Choice] Ubuntu version (use hirsuite or bionic on local arm64/Apple Silicon): hirsute, focal, bionic
ARG VARIANT=focal
FROM mcr.microsoft.com/vscode/devcontainers/base:${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

USER vscode

# Change zsh theme and zsh plugin
RUN sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="agnoster"/' ~/.zshrc && \
  sed -i 's/plugins=(git)/plugins=(zsh-autosuggestions)/' ~/.zshrc

# install zsh plugin
RUN git clone git://github.com/zsh-users/zsh-autosuggestions && \
  sudo mv zsh-autosuggestions ~/.oh-my-zsh/custom/plugins  

# install aws cdk && aws-cli v2
RUN npm i -g aws-cdk && \
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \ 
  unzip awscliv2.zip && \
  sudo ./aws/install

# start zsh
CMD ["zsh"]
