#!/usr/bin/env bash
# npm on this machine is often Node 12. Vite needs Node 20+.
# Find a new enough Node and run the given script with it.
set -euo pipefail

pick() {
  local candidate="$1"
  [ -x "$candidate" ] || return 1
  local major
  major="$("$candidate" -p 'Number(process.versions.node.split(".")[0])' 2>/dev/null || true)"
  [ -n "$major" ] && [ "$major" -ge 20 ]
}

node_bin=""
if [ -d "$HOME/.nvm/versions/node" ]; then
  while IFS= read -r candidate; do
    if pick "$candidate"; then
      node_bin="$candidate"
      break
    fi
  done < <(ls -1d "$HOME"/.nvm/versions/node/v*/bin/node 2>/dev/null | sort -V -r)
fi

if [ -z "$node_bin" ] && pick /usr/local/bin/node; then
  node_bin=/usr/local/bin/node
fi

if [ -z "$node_bin" ]; then
  echo "Need Node 20 or newer. Install it with: nvm install 24" >&2
  exit 1
fi

export PATH="$(dirname "$node_bin"):$PATH"
exec "$node_bin" "$@"
