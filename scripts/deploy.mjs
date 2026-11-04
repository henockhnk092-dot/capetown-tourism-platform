// Deploys dist/ to Cloudflare Pages. On slow connections Node's default 250 ms per
// connection attempt makes Wrangler fail with ETIMEDOUT, so it is raised here.
import { spawnSync } from 'node:child_process';

const result = spawnSync(
  'npx -y wrangler@4.157.0 pages deploy dist --project-name=capetown-tourism --branch=production',
  {
    shell: true,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--dns-result-order=ipv4first --network-family-autoselection-attempt-timeout=5000',
    },
  }
);
process.exit(result.status ?? 1);
