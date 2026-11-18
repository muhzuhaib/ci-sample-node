# slugline

Turns titles into clean URL slugs, as a library or from the command line. It is
a working example of a complete GitHub Actions setup for a Node.js project:
lint, tests on three Node.js versions on Linux, Windows and macOS, a packed package with smoke tests and
checksums, signed releases with an SBOM and build provenance, and a signed container image on GitHub
Container Registry.

```
npm install ./slugline-0.4.0.tgz
npx slugline "Café crème, served hot"    # cafe-creme-served-hot
```

## What runs on GitHub Actions

| Workflow | When | What it does |
| --- | --- | --- |
| `ci.yml` | Every push to `main` and every pull request | ESLint, unit tests on Node.js 22, 24 and 26, each on Linux, Windows and macOS, `npm pack`, 5 smoke tests on the packed file in a clean folder, SHA-256 checksums, files kept as a run artifact for 14 days |
| `release.yml` | A version tag such as `v0.4.0`, or by hand with a tag | Runs every check above first. Only when all pass: checks the checksums, makes an SPDX SBOM, signs build provenance and the SBOM, and publishes a GitHub release with the files. Then builds a container image from the checked package, pushes it to `ghcr.io/muhzuhaib/ci-sample-node`, and signs its build provenance and SBOM next to the image |

How to release, check a release and restore one: [RUNBOOK.md](RUNBOOK.md).

## Check a release yourself

```
gh release download v0.4.0 --repo muhzuhaib/ci-sample-node
sha256sum -c SHA256SUMS
gh attestation verify slugline-0.4.0.tgz --repo muhzuhaib/ci-sample-node
```

Check the container image (signed in to the gh CLI):

```
gh attestation verify oci://ghcr.io/muhzuhaib/ci-sample-node:0.4.0 --repo muhzuhaib/ci-sample-node
docker run --rm ghcr.io/muhzuhaib/ci-sample-node:0.4.0 --version
```

## License

MIT
