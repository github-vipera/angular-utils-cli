# Angular Utils CLI

## Get Current project Version

Assuming you are into the project root folder:

```console
ngutils getVersion
```

Example:
```terminal
mrbook:wa-motif-open-api-module developer$ ngutils getVersion
1.2.3
```


Simulating version increment with Semantic Versioning
```console
ngutils getVersion --semver patch
```

Example:

```terminal
mrbook:wa-motif-open-api-module developer$ ngutils getVersion --semver patch
1.2.4
```

## Update the current project version

To update your project version you can:

1. specify a new version (in a Semantic Version form)
2. auto-increment the current version with the *--semver* option
3. force any version string with *--force* option

You can apply the new version only to the root (main) project or to all subprojects with the *--all* option.

### Update to a specified version

```console
ngutils updateVersion --v '1.0.1'
```

Update all projects including subprojects:

```console
ngutils updateVersion --v '1.0.1' -a
```

### Update to an incremented semver version

```console
ngutils updateVersion --semver patch -a
```

### Force an 'invalid' Semantinc Version value

```console
ngutils updateVersion --v 'my-very-custom-ver' --force -a
```

## Build the Project

With the *build* command you can build the main project or all projects, alsi in '--prod' mode (Angular --prod switch).

```console
ngutils build 
```

or for a production build:

```console
ngutils build --prod
```

or to build all projects and subprojects:

```console
ngutils build -a
```

or for the production mode:

```console
ngutils build --prod -a
```




## The *semver* option

White the **semver** option you can tell to auto-increment a version for the 'patch', 'minor' or 'major' part.
For example, assuming you have the current version of the project set to '1.0.3', if you run the command getVersion you get:

```terminal
mrbook:wa-motif-open-api-module developer$ ngutils getVersion
1.0.3
mrbook:wa-motif-open-api-module developer$ 
```

Then you can get the incremeneted version with the semver option:

```terminal
mrbook:wa-motif-open-api-module developer$ ngutils getVersion --semver patch 
1.0.4

mrbook:wa-motif-open-api-module developer$ ngutils getVersion --semver minor
1.1.0

mrbook:wa-motif-open-api-module developer$ ngutils getVersion --semver major
2.0.0
```

