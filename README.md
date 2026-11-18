# slugline

Turns titles into clean URL slugs, as a library or from the command line. It is
a working example of a complete GitHub Actions setup for a Node.js project:
lint, tests on three Node.js versions, a packed package with smoke tests and
checksums, and signed releases with an SBOM and build provenance.

```
npm install ./slugline-0.3.0.tgz
npx slugline "Café crème, served hot"    # cafe-creme-served-hot
```

## What runs on GitHub Actions

| Workflow | When | What it does |
| --- | --- | --- |
| `ci.yml` | Every push to `main` and every pull request | ESLint, unit tests on Node.js 22, 24 and 26, `npm pack`, 5 smoke tests on the packed file in a clean folder, SHA-256 checksums, files kept as a run artifact for 14 days |
| `release.yml` | A version tag such as `v0.3.0`, or by hand with a tag | Runs every check above first. Only when all pass: checks the checksums, makes an SPDX SBOM, signs build provenance and the SBOM, and publishes a GitHub release with the files |

How to release, check a release and restore one: [RUNBOOK.md](RUNBOOK.md).

## Check a release yourself

```
gh release download v0.3.0 --repo muhzuhaib/ci-sample-node
sha256sum -c SHA256SUMS
gh attestation verify slugline-0.3.0.tgz --repo muhzuhaib/ci-sample-node
```

## License

MIT
