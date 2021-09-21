FROM gitpod/workspace-full

USER root

# Install custom tools, runtime, etc.

RUN ["apt-get", "update"]

RUN ["apt-get", "install", "-y", "zsh"]

USER gitpod

  # set the zsh theme 

ENV ZSH_THEME agnoster

# Install Oh-My-Zsh

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

RUN npm i -g aws-cdk

# install aws-cli v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  sudo ./aws/install

# start zsh
CMD [ "zsh" ]