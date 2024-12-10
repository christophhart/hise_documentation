# HISE Documentation

[![Build Docs](https://github.com/christophhart/hise_documentation/actions/workflows/build_docs.yml/badge.svg)](https://github.com/christophhart/hise_documentation/actions/workflows/build_docs.yml)

This is the repository for the documentation of [HISE](http://hise.dev). It contains the documentation in Markdown format which is processed and build into the internal documentation system of HISE as well as the online documentation available at

https://docs.hise.dev

## Contributing

It is explicitely encouraged to participate in the creation of this documentation. It is licensed under a non-restrictive CC license. If you want to contribute, take a look at the [Contributing Guidelines](https://docs.hise.dev/glossary/contributing.html).

The recommended workflow for contributions looks like this:

- pull the [documentation repository](https://github.com/christophhart/hise_documentation/tree/new_docs)
- setup HISE to use the markdown files as documentation source in the [settings](https://docs.hise.dev/working-with-hise/settings/development.html#doc-repository)
- make your changes and submit them with pull requests. They will be merged into the master branch and published in a timely basis.

If you contribute a non-trivial amount of documentation, your authorship will be properly attributed. 

## Linking
Internal links in the documentation use the typical `[text](path)` format. To create a link, copy the path after the domain name, including the leading `/`.

For example, to link to the page https://docs.hise.dev/scripting/scripting-api/colours/, do:

```
This is a link to [colours](/scripting/scripting-api/colours/)
```
