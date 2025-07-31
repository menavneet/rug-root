#!/usr/bin/env python3
"""
Local Development Server for RUGS AND ROOTS Website
Serves the website locally for development and testing
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files with proper MIME types"""
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        """Guess the type of a file based on its URL"""
        # Handle specific file types directly
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.png'):
            return 'image/png'
        elif path.endswith('.gif'):
            return 'image/gif'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        elif path.endswith('.ico'):
            return 'image/x-icon'
        elif path.endswith('.woff'):
            return 'font/woff'
        elif path.endswith('.woff2'):
            return 'font/woff2'
        elif path.endswith('.ttf'):
            return 'font/ttf'
        
        # Fallback to default behavior
        try:
            import mimetypes
            mimetype, _ = mimetypes.guess_type(path)
            return mimetype or 'application/octet-stream'
        except:
            return 'application/octet-stream'

def find_free_port(start_port=8000, max_port=8100):
    """Find a free port to use for the server"""
    import socket
    
    for port in range(start_port, max_port):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    
    return start_port  # Fallback to start_port if no free port found

def main():
    """Main function to start the local development server"""
    
    # Check if we're in the right directory
    current_dir = Path.cwd()
    if not (current_dir / 'index.html').exists():
        print("❌ Error: index.html not found in current directory!")
        print("   Please run this script from the root of your website directory.")
        sys.exit(1)
    
    # Find available port
    PORT = find_free_port()
    HOST = 'localhost'
    
    # Create server
    try:
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            server_url = f"http://{HOST}:{PORT}"
            
            print("🌐 RUGS AND ROOTS - Local Development Server")
            print("=" * 50)
            print(f"📁 Serving directory: {current_dir}")
            print(f"🔗 Server URL: {server_url}")
            print(f"📱 Mobile URL: http://{get_local_ip()}:{PORT}")
            print("=" * 50)
            print("📄 Available pages:")
            print(f"   • Homepage: {server_url}/")
            print(f"   • Modern Rugs: {server_url}/modern-rugs.html")
            print(f"   • Traditional Rugs: {server_url}/traditional-rugs.html")
            print(f"   • About Us: {server_url}/about.html")
            print(f"   • Contact: {server_url}/contact.html")
            print("=" * 50)
            print("✨ Features enabled:")
            print("   • CORS headers for local development")
            print("   • Proper MIME types for all file types")
            print("   • Auto-opening browser")
            print("=" * 50)
            print("Press Ctrl+C to stop the server")
            print()
            
            # Open browser automatically
            try:
                webbrowser.open(server_url)
                print(f"🚀 Opening browser at {server_url}")
            except Exception as e:
                print(f"⚠️  Couldn't open browser automatically: {e}")
                print(f"   Please open {server_url} manually")
            
            print()
            print("Server is running... 🔄")
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped by user")
        print("Thanks for using RUGS AND ROOTS local server!")
    except PermissionError:
        print(f"❌ Permission denied: Cannot bind to port {PORT}")
        print("   Try running with administrator privileges or use a different port")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

def get_local_ip():
    """Get the local IP address for mobile testing"""
    import socket
    try:
        # Connect to a remote address to get local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "localhost"

if __name__ == "__main__":
    main()