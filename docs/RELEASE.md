# Release process

This repo supports publishing the npm package `goalcalendar`.

## Versioning

- Use semver: `MAJOR.MINOR.PATCH`
- Update `package.json` version before tagging.

## Create a release

1) Bump version in `package.json`
2) Update `CHANGELOG.md`
3) Merge to `main`
4) Create a git tag:

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

If the repo has `NPM_TOKEN` configured in GitHub Secrets, the release workflow will:
- run build + tests
- publish to npm

## Notes

- We intentionally avoid adding extra third-party release tooling.
- If you prefer conventional commits later, we can add guidelines without introducing dependencies.
