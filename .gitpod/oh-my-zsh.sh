#!/usr/bin/env bash

if [[ ! -d "~/.oh-my-zsh" ]]; then
    # Install Oh-My-Zsh
    wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
fi

if [[ -d "~/.oh-my-zsh" ]]; then
    # install zsh plugin
    git clone git://github.com/zsh-users/zsh-autosuggestions && \
    sudo mv zsh-autosuggestions ~/.oh-my-zsh/custom/plugins  
fi

# Change zsh theme and zsh plugin
sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="agnoster"/' ~/.zshrc && \
sed -i 's/plugins=(git)/plugins=(zsh-autosuggestions)/' ~/.zshrc

if grep -q source /usr/share/bash-completion/completions/git ~/.zshrc; then
    echo "source /usr/share/bash-completion/completions/git" >> ~/.zshrc
    echo "alias awsap=\"aws --cli-auto-prompt\"" >> ~/.zshrc
fi 

if ! grep -q "source /usr/share/bash-completion/completions/git" ~/.zshrc; then
   echo "source /usr/share/bash-completion/completions/git" >> ~/.zshrc
fi

if ! grep -q "alias awsap=\"aws --cli-auto-prompt\"" ~/.zshrc; then
   echo "alias awsap=\"aws --cli-auto-prompt\"" >> ~/.zshrc
fi