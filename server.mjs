import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const port = Number(process.env.PORT ?? 4173);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw Error('PORT phải từ 0–65535.');
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let target = path.resolve(root, '.' + pathname);
    if (target !== path.resolve(root) && !target.startsWith(root)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    if (target === path.resolve(root)) target = path.join(root, 'index.html');
    const data = await fs.readFile(target);
    const types = {'.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.pdf':'application/pdf'};
    res.writeHead(200, {'Content-Type': types[path.extname(target)] || 'application/octet-stream'});
    res.end(data);
  } catch (error) {
    const missingPDF = error.code === 'ENOENT' && /\.pdf(?:[?#]|$)/i.test(req.url);
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(missingPDF ? '<!doctype html><html lang="vi"><meta charset="utf-8"><title>PDF tùy chọn</title><h1>PDF không đi kèm bản công khai</h1><p>Bạn vẫn học bài, luyện thẻ và dùng mô phỏng bình thường. Nếu đã có quyền sử dụng tài liệu, xem dist/sources/README.md để bổ sung tại máy.</p><a href="/">Về Học viện Mạng</a></html>' : 'Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log('Local: http://127.0.0.1:' + server.address().port));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
