const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');
const { randomUUID } = require('node:crypto');
const agents = require('./backend/agents');

const ROOT = __dirname;
const HOST = '127.0.0.1';
let port = 4174;
const sessions = new Map();
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(data));
}

function readBody(req, maxBytes = 256_000) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    let tooLarge = false;
    req.setEncoding('utf8');
    req.on('data', chunk => {
      if (tooLarge) return;
      size += Buffer.byteLength(chunk);
      if (size > maxBytes) {
        tooLarge = true;
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      if (tooLarge) { reject(Object.assign(new Error('حجم الطلب أكبر من الحد المسموح.'), { status: 413 })); return; }
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(Object.assign(new Error('صيغة JSON غير صحيحة.'), { status: 400 })); }
    });
    req.on('error', reject);
  });
}

async function handleApi(req, res, pathname) {
  if (req.method === 'GET' && pathname === '/api/health') {
    json(res, 200, { ok: true, service: 'sdaia-interview-board', activeSessions: sessions.size });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/cv/analyze') {
    const body = await readBody(req, 180_000);
    const profile = agents.analyzeResume(body.text, body.fileName || '');
    json(res, 200, { profile });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/interviews') {
    const body = await readBody(req);
    if (!body.profile || !body.profile.specialty) throw Object.assign(new Error('حلّل السيرة قبل بدء المقابلة.'), { status: 400 });
    const questions = agents.buildQuestions(body.profile);
    const id = randomUUID();
    sessions.set(id, { profile: body.profile, questions, answers: [], createdAt: Date.now() });
    json(res, 201, {
      sessionId: id,
      total: questions.length,
      greeting: `راجعت السيرة التي حللتها ريم. سألتزم بما ورد فيها وأسألك عن مساهمتك أنت بالتحديد في مجال ${body.profile.specialtyLabel || 'تخصصك'}.`,
      question: { ...questions[0], number: 1, total: questions.length },
    });
    return;
  }

  const answerRoute = pathname.match(/^\/api\/interviews\/([\da-f-]+)\/answers?$/i);
  if (req.method === 'POST' && answerRoute) {
    const session = sessions.get(answerRoute[1]);
    if (!session) throw Object.assign(new Error('جلسة المقابلة غير موجودة أو انتهت. ابدأ جلسة جديدة.'), { status: 404 });
    const body = await readBody(req, 20_000);
    const question = session.questions[session.answers.length];
    if (!question) throw Object.assign(new Error('اكتملت أسئلة هذه الجلسة.'), { status: 409 });
    const answer = body.skip ? '' : String(body.answer || '').trim();
    if (!answer && !body.skip) throw Object.assign(new Error('اكتب إجابتك أو اختر تخطي السؤال.'), { status: 400 });
    if (answer.length > 8_000) throw Object.assign(new Error('الإجابة تتجاوز الحد الأقصى (٨٠٠٠ حرف).'), { status: 413 });
    const evaluation = agents.evaluateAnswer(question, answer);
    session.answers.push({ question, answer });
    const next = session.questions[session.answers.length];
    if (next) {
      json(res, 200, {
        done: false,
        evaluation,
        progress: session.answers.length,
        question: { ...next, number: session.answers.length + 1, total: session.questions.length },
      });
      return;
    }
    json(res, 200, { done: true, evaluation, report: agents.summarize(session.answers), profile: session.profile });
    sessions.delete(answerRoute[1]);
    return;
  }

  json(res, 404, { error: 'المسار غير موجود.' });
}

function serveStatic(req, res, pathname) {
  if (req.method !== 'GET' && req.method !== 'HEAD') { json(res, 405, { error: 'طريقة الطلب غير مدعومة.' }); return; }
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(ROOT, `.${pathname}`);
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) { res.writeHead(403).end('Forbidden'); return; }
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 500).end('File not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'SAMEORIGIN' });
    if (req.method === 'HEAD') res.end(); else res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, `http://${HOST}:${port}`).pathname); }
  catch { json(res, 400, { error: 'عنوان الطلب غير صحيح.' }); return; }
  try {
    if (pathname.startsWith('/api/')) await handleApi(req, res, pathname);
    else serveStatic(req, res, pathname);
  } catch (error) {
    if (!res.headersSent) json(res, error.status || 500, { error: error.message || 'حدث خطأ داخلي.' });
  }
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE' && port < 4190) { port += 1; server.listen(port, HOST); return; }
  console.error(error.code === 'EADDRINUSE' ? `المنفذ ${port} مستخدم. أوقف النسخة الأخرى ثم أعد التشغيل.` : error.message);
  process.exitCode = 1;
});

server.listen(port, HOST, () => {
  const url = `http://${HOST}:${port}/`;
  console.log(`الباك إند والواجهة يعملان محليًا: ${url}`);
  console.log(`فحص الخدمة: ${url}api/health`);
  console.log('الجلسات مؤقتة في ذاكرة الجهاز؛ إعادة تشغيل الخادم تمسحها. أوقفه بـ Ctrl+C.');
  if (process.platform === 'win32') setTimeout(() => exec(`start "" "${url}"`), 400);
});
