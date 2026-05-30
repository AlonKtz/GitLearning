# Dev Notes — Git Practice App

A simple note-taking app you can use to practice real git workflows.
Training buily by claude code

## Files

| File | What to change |
|------|---------------|
| `index.html` | Page structure, add new UI elements |
| `style.css` | Colors, fonts, layout, dark/light theme |
| `app.js` | Features: edit notes, sort, priorities |

---

## Git Practice Exercises

Work through these in order. Each one builds on the last.

---

### Level 1 — The Basics

**1. Initialize & first commit**
```bash
git init
git add .
git commit -m "initial commit"
```

**2. Make a change, then commit it**
- Open `style.css` and change the accent color `#5c6bc0` to any color you like.
```bash
git status          # see what changed
git diff            # see the exact lines that changed
git add style.css
git commit -m "change accent color"
```

**3. View history**
```bash
git log             # full log
git log --oneline   # compact view
```

---

### Level 2 — Branching

**4. Create a feature branch**
```bash
git checkout -b feature/dark-theme
```
Make a visible change in `style.css` (e.g. change `background: #0f1117` to `#1a1a2e`).
```bash
git add style.css
git commit -m "update background color"
```

**5. Switch back to main and merge**
```bash
git checkout main
git merge feature/dark-theme
git branch -d feature/dark-theme   # clean up
```

**6. Simulate a conflict (advanced)**
- On `main`, change line 1 of `style.css` to add a comment: `/* v2 */`
- Create branch `feature/v3`, change the same line to `/* v3 */`
- Try to merge — resolve the conflict manually in VS Code.

---

### Level 3 — Remote (GitHub)

**7. Push to GitHub**
1. Create a new repo on github.com (no README).
2. Copy the remote URL, then:
```bash
git remote add origin <your-url>
git push -u origin main
```

**8. Fork & clone someone else's repo**
1. Find any public repo on GitHub and fork it.
2. Clone your fork locally:
```bash
git clone <fork-url>
cd <repo-name>
```

**9. Pull changes**
Make a change directly on GitHub (edit a file in the browser), then:
```bash
git pull
```
See the change appear locally.

**10. Push a new feature**
```bash
git checkout -b feature/add-priority
```
Add a "Priority" option to the `<select>` in `index.html`.
```bash
git add index.html
git commit -m "add priority category"
git push origin feature/add-priority
```
Open a Pull Request on GitHub.

---

### Level 4 — Handy Commands

```bash
git stash                  # save uncommitted work temporarily
git stash pop              # bring it back

git restore style.css      # discard uncommitted changes to a file
git reset HEAD~1           # undo last commit (keep changes)

git log --oneline --graph  # visual branch history
```

---

## Ideas for changes to make

- [ ] Add a "priority" level (low / medium / high) to notes
- [ ] Let users edit a note after adding it
- [ ] Add a dark/light theme toggle button
- [ ] Show the date, not just the time
- [ ] Add a "clear all" button
- [ ] Change the font to something from Google Fonts
- [ ] Make the app mobile-friendly with a sticky header
