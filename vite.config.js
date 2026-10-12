import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { handleContactSubmission } from './server/contactHandler.js';

dotenv.config();

function contactApiPlugin() {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        // Enable CORS if needed
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const result = await handleContactSubmission(data);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 
              success: true, 
              message: 'Thank you! Your message has been sent successfully. Our team will contact you soon.',
              result 
            }));
          } catch (err) {
            console.error('Contact Submission Error:', err.message);
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 
              success: false, 
              error: err.message || 'Unable to send your message right now. Please try again or contact us directly at 9824075278.' 
            }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), contactApiPlugin()],
  server: {
    port: 5173,
    host: true,
    strictPort: true
  }
});
