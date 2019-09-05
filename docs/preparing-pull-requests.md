# Preparing Pull Requests in Bitbucket

Changes should be done in a Feature Branch & submitted to "develop" branch as a Pull Request.

Branch names to create:

- bugfix/*
- feature/*
- hotfix/*

All commits should be digitally signed with:

- Download gpgkeys from <https://appdevtools.jnj.com/gpgkeys>, following the steps in <https://confluence.jnj.com/pages/viewpage.action?spaceKey=EAKB&title=Bitbucket+-+Using+GPG+Keys+with+Git>

Git user name and email should be set in the following format, with JnJ account:

```bash
git config user.name "Zewdu, Melaku [ETHUS NON-J&J]"
git config user.email "mzewdu@its.jnj.com"

git commit -m "commit message" -S
```

To sign commits in wsl, this initial setup is needed:
`export GPG_TTY=$(tty)`

Configure Sonarlint:

- Install and configire <https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode>
