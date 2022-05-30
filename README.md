# Gladiator Frontend Application

## Documentation

### Pipeline Setup

1. Name of the Job - gladiator/Frontend
   - Information related to the Jenkins multi-branch job setup can be found in `_scm_jenkins/jenkins.yaml`
   - Jenkins instance configured with the an JPMAdmin Job that automates these Job creation/Updates.
   - Any required change to the job setup should be done on a feature branch & submitted as a pull request to `development` branch.
   - branches having the following pattern (or) name won't get a multi-branch job setup.
     - archive/\*
     - backup/\*
     - feature/never-build
2. PreDev Jobs are executed on the following branch patterns `feature/*, bugfix/*, hotfix/*`.
   - Lint / code quality checks run as part of PreDev Jobs
3. Branch Pattern
   - Base branch : develop
   - Production branch: main

## Additional Documentation

---

### Project setup

```bash
npm install
```

Or

```bash
npm ci
```

### Compiles and hot-reloads for development

Work with dev/beta server:

```bash
npm run dev
```

Work with dev/beta server mocked/offline:

```bash
npm run mock
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

Or

```bash
npm run lint:fix
```

