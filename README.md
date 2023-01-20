`wrk` - a local `git` manager
====

Setup
----

### Creating a new workspace

```bash
wrk init
```

```bash
wrk remote set <remote-url>
```

### Using an existing workspace

```bash
wrk clone <remote-url>
```

### Shell integration

```bash
which wrk > /dev/null && eval `wrk tools bash
```

Working with repos
----

### Show repos

```
wrk list
```

### Add a repo to the workspace

```bash
wrk repo add <remote-url> <name>
# wrk repo add https://github.com/morten-olsen/wrk tools/wrk
```

### Link the repo to another location

```
wrk repo link --from tools/wrk --to ~/active/wrk
```

### Move a repo

```bash
wrk repo move <old-name> <new-name>
# wrk repo move tools/wrk cli-tools/wrk
```

### Remove a repo

```bash
wrk repo remove <name>
# wrk repo remove cli-tools/wrk
```

### Navigating to a repo

```bash
wrk-cd
```

### Get status of all repos

```bash
wrk update # fill fetch all tracked repos
wrk status
```
