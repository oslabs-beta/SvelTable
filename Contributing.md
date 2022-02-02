# Contributing

Thank you for taking the time to consider contributing to our project. It's people like you that make the dev community great!

Where do I start?

If you have spotted a bug or have a feature request, please open an [issue post](https://github.com/oslabs-beta/SvelTable/issues/new). That way we can get further information from other users experience the bug or confirm that the feature isn't already in development.
All other questions should be posted to the project's [reddit.](https://www.reddit.com/r/sveltable/) Github is for bugs and feature requests only.

#  Fork

If you decide to contribute, fork the project, and create a branch with a descriptive name of the feature you are adding or bug you are fixing.  Also include the ticket number for the issue post you created.

`git checkout -b 11-add-search-feature`

# Testing

We are currently using JEST for testing. If you are adding a feature, please make sure to include tests for the feature. Modify tests for that may be affected by your bug fix.


# Implementation

While writing your bug fix or feature please commit often and update the community on your progress so that the community can provide input.

# Style

The feature/bug fix must adhere to the general style of the project.  You must also use typscript.

# Make a Pull Request

Before performing a pull request, make sure you checkout into your main branch. Make sure the main branch is up to date with the project.  Update your feature branch from your local main.

  `git remote add upstream https://github.com/oslabs-beta/SvelTable.git`
  
  `git checkout main`
  
  `git pull upstream main`

Push the feature then create a pull request on GitHub.

We will review the pull request and make sure it passes all tests. If another pull request is merged before yours, you may be asked to rebase(update) your feature.

# Merging a PR

A pull request may only be merged if it passes all tests, is approved by at least two maintainers, and is up to date with the current main.