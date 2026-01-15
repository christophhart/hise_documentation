#!/usr/bin/env python3
"""
HISE Documentation Development Server with Live Reload

This script starts:
1. Meilisearch server (for full-text search)
2. Live-reload HTTP server (auto-refreshes browser on file changes)

WORKFLOW:
  1. Run this script: python start-dev.py
  2. Edit files in html_build/ - browser auto-refreshes
  3. Or: Edit template/ files, rebuild with HISE, auto-refreshes

Press Ctrl+C to stop all servers
"""

import subprocess
import sys
import os
import signal

# Configuration
MEILI_MASTER_KEY = "KTs56V2lSaQTrlVSeE5QvTqUzLneyb_ezscYfpfe2hM"
HTML_BUILD_DIR = "html_build"
PORT = 8000

# Process tracking
processes = []

def cleanup(signum=None, frame=None):
    """Clean up all processes on exit"""
    print("\n\nShutting down servers...")
    for proc in processes:
        try:
            proc.terminate()
            proc.wait(timeout=3)
        except Exception:
            try:
                proc.kill()
            except Exception:
                pass
    print("All servers stopped")
    sys.exit(0)

# Register cleanup handlers
signal.signal(signal.SIGINT, cleanup)
signal.signal(signal.SIGTERM, cleanup)

def check_live_server():
    """Check if live-server is installed"""
    try:
        subprocess.run(["npx", "live-server", "--version"],
                      capture_output=True, check=True)
        return True
    except:
        return False

def main():
    

    if check_live_server():
        print("Using live-server (auto-reload enabled)")
        try:
            # live-server watches for file changes and auto-reloads browser
            server_proc = subprocess.Popen(
                ["npx", "live-server", HTML_BUILD_DIR,
                 f"--port={PORT}",
                 "--no-browser",
                 "--watch=" + HTML_BUILD_DIR,
                 "--wait=200"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                creationflags=subprocess.CREATE_NEW_PROCESS_GROUP
            )
            processes.append(server_proc)
            print(f"OK - Live-reload server started on http://localhost:{PORT}")
            print("    Files will auto-reload in browser when changed!")
        except Exception as e:
            print(f"Error starting live-server: {e}")
            cleanup()
            sys.exit(1)
    else:
        print("live-server not found, using threaded HTTP server")
        print("To enable auto-reload: npm install -g live-server")
        try:
            # Use Python's ThreadingHTTPServer for better concurrent handling
            from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
            import threading

            class QuietHandler(SimpleHTTPRequestHandler):
                def log_message(self, format, *args):
                    pass  # Suppress request logs

            def run_server():
                os.chdir(HTML_BUILD_DIR)
                server = ThreadingHTTPServer(('', PORT), QuietHandler)
                server.serve_forever()

            server_thread = threading.Thread(target=run_server, daemon=True)
            server_thread.start()
            print(f"OK - Threaded HTTP server started on http://localhost:{PORT}")
        except Exception as e:
            print(f"Error starting HTTP server: {e}")
            cleanup()
            sys.exit(1)

    # Print instructions
    print("\n" + "=" * 60)
    print("Development servers ready!")
    print("=" * 60)
    print(f"\nDocumentation:  http://localhost:{PORT}")
    print(f"Meilisearch:    http://localhost:7700")
    print(f"Master Key:     {MEILI_MASTER_KEY}")

    print("\n" + "=" * 60)
    print("Development Workflow:")
    print("=" * 60)
    print("\n1. Edit files in html_build/ - browser auto-refreshes")
    print("2. Or: Edit template/ files, rebuild with HISE")
    print("3. Index to Meilisearch: npm run index-docs")

    print("\nQuick Commands:")
    print("   npm run index-docs       - Index docs to Meilisearch")
    print("   npm run test-urls        - Validate search result URLs")

    print("\nPress Ctrl+C to stop all servers\n")

    # Keep script running
    try:
        while True:
            import time
            time.sleep(1)
    except KeyboardInterrupt:
        cleanup()

if __name__ == "__main__":
    main()
