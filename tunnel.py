import subprocess
import re
import sys
import time

while True:
    try:
        cmd = ["ssh", "-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null", "-R", "80:localhost:3000", "nokey@localhost.run"]
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
        for line in process.stdout:
            sys.stdout.write(line)
            sys.stdout.flush()
            m = re.search(r'https://[a-zA-Z0-9\.\-]+\.lhr\.life', line)
            if m:
                url_found = m.group(0)
                print(f"\n>>> ACTIVE PUBLIC TUNNEL URL: {url_found} <<<\n", flush=True)
                with open("active_tunnel_url.txt", "w") as f:
                    f.write(url_found)
        process.wait()
    except Exception as e:
        sys.stderr.write(f"Tunnel error: {e}\n")
    time.sleep(2)
