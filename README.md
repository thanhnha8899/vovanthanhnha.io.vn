# vovanthanhnha.io.vn

## Deploy to cPanel (one command)

This repository includes a deploy script for the cPanel host.

### On cPanel/SSH

```bash
cd /home/dtthoith/vovanthanhnha.io.vn
chmod +x deploy-cpanel.sh
./deploy-cpanel.sh
```

### What the script does

- Pull latest code from `origin/main`
- Install dependencies in `orbis-nft`
- Build production files with `npm run build`
- Sync `orbis-nft/dist` to `/home/dtthoith/public_html/vovanthanhnha`

### Notes

- Make sure the domain `vovanthanhnha.io.vn` points to `public_html/vovanthanhnha`.
- If your server does not support `rsync`, replace the sync command in `deploy-cpanel.sh` with `cp -r` fallback.