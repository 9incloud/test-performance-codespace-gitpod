FROM gitpod/workspace-full
RUN curl -o /tmp/slirp4netns-0.4.3-4.el7_8.x86_64.rpm http://mirror.centos.org/centos/7/extras/x86_64/Packages/slirp4netns-0.4.3-4.el7_8.x86_64.rpm \
&& yum install -y jq sudo docker && yum install -y /tmp/slirp4netns-0.4.3-4.el7_8.x86_64.rpm && rm -f /tmp/slirp4netns-0.4.3-4.el7_8.x86_64.rpm

RUN npm i -g aws-cdk

RUN mv $(which aws) /usr/bin/aws_V1

# install aws-cli v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
  unzip awscliv2.zip && \
  ./aws/install