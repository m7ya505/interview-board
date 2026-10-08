const roles = {
  tech: {
    name: 'تقنية وبرمجة',
    skills: [['Python', /python|بايثون/i], ['JavaScript', /javascript|typescript|جافاسكريبت/i], ['React', /react|رياكت/i], ['SQL', /\bsql\b|قواعد البيانات/i], ['Java', /\bjava\b|جافا/i], ['APIs', /\bapi\b|واجهات برمجية/i], ['Cloud', /aws|azure|cloud|الحوسبة السحابية/i], ['Git', /\bgit\b|github/i]],
    clue: /software|computer science|programmer|تقنية|برمجيات|علوم الحاسب/i,
    questions: [
      ['A service becomes slower after a release. How would you isolate the cause, and what evidence would you collect first?', ['latency', 'logs', 'metrics', 'database', 'cache', 'performance', 'زمن', 'سجلات', 'مؤشرات', 'قاعدة البيانات', 'أداء']],
      ['How do you choose tests for a change before deploying it? Describe the risks you would prioritize.', ['test', 'unit', 'integration', 'coverage', 'release', 'risk', 'اختبار', 'وحدة', 'تكامل', 'إصدار', 'خطر']],
      ['Tell me about a technical trade-off you made. What alternatives did you compare, and what was the result?', ['trade-off', 'alternative', 'impact', 'decision', 'cost', 'scale', 'maintain', 'مقايضة', 'بديل', 'تأثير', 'قرار', 'تكلفة']],
    ],
  },
  engineering: {
    name: 'هندسة', skills: [['AutoCAD', /autocad|أوتوكاد/i], ['SolidWorks', /solidworks/i], ['Civil', /civil|مدني/i], ['Mechanical', /mechanical|ميكانيكي/i], ['Electrical', /electrical|كهربائي/i], ['Safety', /safety|سلامة/i], ['Quality', /quality|جودة/i]],
    clue: /engineer|هندسة|مهندس/i,
    questions: [
      ['A late design constraint affects the schedule. How do you assess its impact and keep the solution safe?', ['constraint', 'schedule', 'safety', 'cost', 'risk', 'standard', 'impact']],
      ['How do you verify that an engineering solution meets its specifications before handover?', ['test', 'inspect', 'specification', 'standard', 'quality', 'verify', 'measurement']],
      ['Describe a decision where you balanced performance, safety, and cost. What evidence guided you?', ['performance', 'safety', 'cost', 'evidence', 'decision', 'analysis', 'project']],
    ],
  },
  design: {
    name: 'تصميم', skills: [['Figma', /figma|فيجما/i], ['UX Research', /ux research|user research|بحث المستخدم/i], ['UI Design', /\bui\b|واجهة المستخدم/i], ['Prototyping', /prototype|النماذج الأولية/i], ['Usability', /usability|قابلية الاستخدام/i]],
    clue: /designer|design|مصمم|تصميم/i,
    questions: [
      ['A key user task has a high drop-off rate. How would you investigate and validate a design change?', ['user', 'research', 'analytics', 'prototype', 'test', 'usability', 'task']],
      ['How do you make a design decision when user feedback conflicts or evidence is incomplete?', ['research', 'user', 'evidence', 'prototype', 'test', 'decision', 'feedback']],
      ['How would you review an interface for accessibility before release?', ['accessibility', 'contrast', 'keyboard', 'screen reader', 'wcag', 'test', 'interface']],
    ],
  },
  business: {
    name: 'إدارة أعمال', skills: [['Project Management', /project management|إدارة المشاريع/i], ['Excel', /excel|إكسل/i], ['Data Analysis', /data analysis|تحليل البيانات/i], ['Operations', /operations|العمليات/i], ['KPIs', /kpi|مؤشرات الأداء/i], ['Strategy', /strategy|استراتيجية/i]],
    clue: /business|management|إدارة أعمال|مدير مشاريع|محلل أعمال/i,
    questions: [
      ['A product misses its target. Which measures would you review first, and how would you choose an action?', ['revenue', 'customer', 'conversion', 'cost', 'kpi', 'target', 'measure', 'data']],
      ['Two teams compete for the same limited budget. How would you compare their proposals?', ['priority', 'budget', 'impact', 'cost', 'evidence', 'goal', 'data']],
      ['How would you measure whether a process improvement created value?', ['measure', 'baseline', 'time', 'cost', 'quality', 'kpi', 'result', 'process']],
    ],
  },
  marketing: {
    name: 'تسويق', skills: [['SEO', /\bseo\b|محركات البحث/i], ['Content', /content|المحتوى/i], ['Social Media', /social media|وسائل التواصل/i], ['Campaigns', /campaign|الحملات/i], ['Google Ads', /google ads|إعلانات جوجل/i], ['Analytics', /analytics|التحليلات/i]],
    clue: /marketing|تسويق|حملات تسويقية/i,
    questions: [
      ['A campaign gets clicks but few conversions. What would you investigate and change first?', ['conversion', 'landing', 'audience', 'message', 'analytics', 'campaign', 'test']],
      ['How would you choose a channel and audience for a launch with a limited budget?', ['audience', 'channel', 'budget', 'segment', 'research', 'campaign', 'cost']],
      ['Which metrics show that a campaign delivered business value, and why?', ['roi', 'revenue', 'conversion', 'cost', 'attribution', 'metric', 'result']],
    ],
  },
  health: {
    name: 'علوم صحية', skills: [['Patient Care', /patient care|رعاية المرضى/i], ['Clinical', /clinical|سريري/i], ['Laboratory', /laboratory|مختبر|تحاليل/i], ['Infection Control', /infection control|مكافحة العدوى/i], ['Records', /medical records|السجلات الطبية/i]],
    clue: /nurse|physician|doctor|pharmacist|health|طبيب|تمريض|ممرض|صيدلي|مختبر/i,
    questions: [
      ['You notice a safety risk during a routine procedure. What steps do you take, and how do you document it?', ['safety', 'risk', 'protocol', 'document', 'patient', 'escalate', 'procedure']],
      ['How would you explain a complex care instruction to an anxious person?', ['patient', 'explain', 'listen', 'understand', 'confirm', 'care', 'communication']],
      ['What would you do if a record and handover contain conflicting information?', ['record', 'handover', 'verify', 'report', 'team', 'patient', 'document']],
    ],
  },
};

const hrQuestions = [
  ['اذكر موقفًا حقيقيًا اختلفت فيه مع زميل حول طريقة العمل. ماذا فعلت أنت تحديدًا، وكيف انتهى الموقف؟', ['زميل', 'فريق', 'اختلف', 'نقاش', 'حل', 'عملت', 'تواصل']],
  ['لديك مهمتان عاجلتان وموعدان متقاربان. كيف ترتب الأولويات، وكيف تبلغ أصحاب العلاقة؟ أعطني مثالًا.', ['أولوية', 'أولويات', 'موعد', 'رتبت', 'تواصلت', 'مثال', 'مهمة']],
  ['ما الذي جذبك إلى هذه الوظيفة تحديدًا؟ اربط إجابتك بمتطلب من الدور وخبرة في سيرتك.', ['وظيفة', 'دور', 'مهارة', 'خبرة', 'مشروع', 'اهتمام', 'تخصص']],
  ['ما ملاحظة مهنية صعبة وصلتك عن أدائك؟ ماذا فعلت بعدها وما الذي تغير؟', ['ملاحظة', 'تغذية راجعة', 'تعلمت', 'تغير', 'تحسنت', 'مدير', 'أداء']],
];

function detectName(text, fileName = '') {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  for (const line of lines.slice(0, 12)) {
    if (line.length > 45 || /@|\d|resume|curriculum|profile|summary|experience|education|skills|engineer|developer|manager|مهارات|خبرة|تعليم|مهندس|مطور|مدير|السيرة/i.test(line)) continue;
    if (/^[\p{L}][\p{L}'’.-]*(?:\s+[\p{L}][\p{L}'’.-]*){1,3}$/u.test(line)) return line;
  }
  const base = fileName.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\b(cv|resume|السيرة)\b/ig, '').trim();
  return /^[\p{L}][\p{L} .'’-]{2,45}$/u.test(base) ? base : '';
}

function analyzeResume(text, fileName = '') {
  if (typeof text !== 'string' || text.trim().length < 60) throw new Error('لم أجد نصًا كافيًا لتحليل السيرة.');
  const scores = Object.fromEntries(Object.entries(roles).map(([key, role]) => [key, role.skills.filter(([, pattern]) => pattern.test(text)).length * 2 + (role.clue.test(text) ? 3 : 0)]));
  const specialty = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
  if (!specialty || scores[specialty] === 0) throw new Error('تعذر تحديد التخصص من السيرة. استخدم سيرة فيها المسمى الوظيفي أو المهارات.');
  const role = roles[specialty];
  const lines = text.split(/\r?\n/).map(line => line.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const normalized = text.replace(/[٠-٩]/g, digit => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit));
  const years = normalized.match(/(\d{1,2})\+?\s*(?:years?|yrs?|سنوات|سنة)/i);
  const projects = lines.filter(line => line.length > 45 && /(project|develop|build|lead|design|implement|deliver|مشروع|طورت|نفذت|قدت|أنجزت|عملت)/i.test(line)).slice(0, 5);
  const email = (text.match(/[\w.+-]+@[\w.-]+\.[A-Z]{2,}/i) || [])[0] || '';
  const education = lines.find(line => /bachelor|master|degree|diploma|بكالوريوس|ماجستير|دبلوم/i.test(line)) || '';
  const language = lines.find(line => /languages|اللغات/i.test(line)) || '';
  const title = lines.find(line => /engineer|developer|designer|analyst|manager|specialist|مهندس|مطور|مصمم|محلل|مدير|أخصائي/i.test(line)) || '';
  return {
    name: detectName(text, fileName), specialty, specialtyLabel: role.name, title: title.slice(0, 100),
    years: years ? Number(years[1]) : null,
    level: years ? (Number(years[1]) >= 7 ? 'متقدم' : Number(years[1]) >= 3 ? 'متوسط' : 'مبتدئ') : 'غير محدد',
    skills: role.skills.filter(([, pattern]) => pattern.test(text)).map(([skill]) => skill),
    projects, education: education.slice(0, 150), languages: language.slice(0, 120), email,
  };
}

function buildQuestions(profile) {
  const role = roles[profile.specialty];
  if (!role) throw new Error('التخصص غير مدعوم.');
  const skills = (profile.skills || []).slice(0, 3);
  const project = (profile.projects || [])[0]?.slice(0, 180) || '';
  const opening = skills.length
    ? `Your CV lists ${skills.join(', ')}${project ? ` and mentions: “${project}”` : ''}. Describe your personal contribution to a specific project using ${skills[0]}. What challenge did you face, and what measurable outcome did you achieve?`
    : `Your CV is for a ${role.name} profile. Walk me through one relevant project, your individual contribution, a challenge, and the measurable outcome.`;
  const technical = [{ text: opening, keys: skills.concat(['project', 'contribution', 'challenge', 'outcome', 'result', 'مشروع', 'دوري', 'تحدي', 'نتيجة']), agent: 'specialist' }]
    .concat(role.questions.map(([text, keys]) => ({ text, keys, agent: 'specialist' })));
  const hr = hrQuestions.map(([text, keys]) => ({ text, keys, agent: 'hr' }));
  return technical.concat(hr);
}

function evaluateAnswer(question, answer) {
  const text = String(answer || '').trim();
  const words = text.match(/[\p{L}\p{N}%]+/gu) || [];
  const uniqueRatio = words.length ? new Set(words.map(word => word.toLowerCase())).size / words.length : 0;
  const lower = text.toLowerCase();
  const related = question.keys.some(term => lower.includes(term.toLowerCase()));
  const action = /(built|developed|created|tested|measured|reviewed|analyzed|implemented|designed|led|resolved|delivered|استخدمت|أنشأت|طورت|نفذت|اختبرت|راجعت|حللت|قدت|عالجت|قست|تحققت|تواصلت|رتبت|قررت)/i.test(text);
  const example = /(example|project|when i|for instance|مثال|مشروع|عندما|في عملي|في فريقي|موقف)/i.test(text);
  const result = /(\d|%|٪|result|impact|improved|reduced|increased|saved|outcome|نتيجة|أثر|تحسن|خفض|رفعت|وفرت|حقق)/i.test(text);
  const insufficient = words.length < 5 || uniqueRatio < 0.38 || /(خرابيط|هراء|asdf|qwerty|lorem ipsum|blah blah)/i.test(text) || (!related && !action && words.length < 18);
  const points = insufficient ? 0 : (related ? 2 : 0) + (words.length >= 16 ? 1 : 0) + (action ? 1 : 0) + (example ? 1 : 0) + (result ? 1 : 0);
  const feedback = [];
  if (insufficient) feedback.push('الإجابة قصيرة أو غير واضحة؛ لا تُحسب دليلًا مهنيًا.');
  else {
    if (!related) feedback.push('الصلة بالسؤال غير واضحة.');
    if (!action) feedback.push('لم تذكر خطوة نفذتها أنت.');
    if (!example) feedback.push('أضف موقفًا محددًا.');
    if (!result) feedback.push('اذكر نتيجة أو أثرًا قابلًا للتحقق.');
  }
  return { answer: text, words: words.length, related, action, example, result, insufficient, points, feedback, grade: insufficient ? 'غير كافية' : points >= 4 ? 'أدلة جيدة' : points >= 2 ? 'جزئية' : 'أدلة ضعيفة' };
}

function summarize(answers) {
  const reviews = answers.map(item => ({ question: item.question.text, agent: item.question.agent, ...evaluateAnswer(item.question, item.answer) }));
  const count = key => reviews.filter(item => item[key]).length;
  const insufficient = count('insufficient');
  const related = count('related');
  const examples = count('example');
  const results = count('result');
  const score = reviews.length ? Math.round(reviews.reduce((sum, item) => sum + item.points, 0) / (reviews.length * 6) * 100) : 0;
  const strengths = [];
  if (related) strengths.push(`ظهر ارتباط واضح بالسؤال في ${related} إجابات.`);
  if (examples) strengths.push(`قدمت مثالًا أو موقفًا في ${examples} إجابات.`);
  if (results) strengths.push(`ذكرت نتيجة قابلة للتحقق في ${results} إجابات.`);
  if (!strengths.length) strengths.push('لا توجد نقطة قوة أستطيع إثباتها من الإجابات.');
  const weaknesses = [];
  if (insufficient) weaknesses.push(`${insufficient} إجابات غير كافية أو غير واضحة.`);
  if (examples < reviews.length - insufficient) weaknesses.push('اربط إجاباتك بأمثلة حقيقية ووضح دورك أنت.');
  if (results < reviews.length - insufficient) weaknesses.push('أضف نتائج أو أرقامًا تبين أثر عملك.');
  if (!weaknesses.length) weaknesses.push('راجع تفاصيل كل جواب لتحديد ما يمكن تحسينه.');
  return { score, strengths, weaknesses, reviews, evaluated: reviews.length, insufficient };
}

module.exports = { analyzeResume, buildQuestions, evaluateAnswer, summarize };
