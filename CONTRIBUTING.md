# :godmode: How to Contribute

Follow this for each task:

- Move your Asana task to `In Progress` column on the project board
- Create a new branch named `A-[id of Asana task]`
  - E.g.:
  ```
  git checkout dev
  git checkout -b A-1202012043191654
  ```
- Do as many commits as you need.
- Push the branch to the remote repo:
  - E.g.:
  ```
  git push origin A-1202012043191654
  ```
- Create your PR setting a title like `A-[id of Asana task]: [short description]`:
  - E.g.: `A-1202012043191654: Update README with branches info`
- **Always set base branch to `dev`**
- Set some relevant reviewers to your PR
- Check if you've completed all the items on the PR's template checklist
- Move your Asana task to `Ready for Code Review` column on the project board
- After getting the approval of all of the selected reviewers, merge your branch with `Squash and merge`
- Remove your branch after merging
- Move your asana task to `Ready do be deployed`
