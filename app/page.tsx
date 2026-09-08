'use client';
/* oxlint-disable next/no-img-element -- Preserve original radiograph pixels without an image optimizer. */
import { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
  ScanLine,
  ArrowRight,
  Check,
  Eye,
  RotateCcw,
  BookOpen,
  Crosshair,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { lessons, cases, questions, sources } from './study-data';
import { diseaseLibrary } from './disease-library';

const spots = [
  {
    label: '氣管',
    en: 'Trachea',
    x: 44,
    y: 19,
    text: '先找中央透亮氣柱，再追到隆突與主支氣管。氣管偏移時先排除旋轉，再考慮肺容積減少或占位效應。',
  },
  {
    label: '左肺門',
    en: 'Left hilum',
    x: 53,
    y: 38,
    text: '肺門主要由肺血管構成。比較兩側大小與密度；正常左肺門通常略高於右側。',
  },
  {
    label: '左心緣',
    en: 'Left heart border',
    x: 61,
    y: 55,
    text: '左心緣主要由左心室構成，與舌葉相鄰。若邊界消失，可用輪廓徵協助定位。',
  },
  {
    label: '右橫膈',
    en: 'Right hemidiaphragm',
    x: 28,
    y: 62,
    text: '追蹤圓頂直到肋膈角。正常右橫膈常略高於左側，也要掃描膈下是否有不尋常的游離氣體。',
  },
  {
    label: '左肋膈角',
    en: 'Left costophrenic angle',
    x: 73,
    y: 73,
    text: '正常外側肋膈角應銳利。變鈍可見於胸水或肋膜增厚，須搭配體位、側位片與舊片判斷。',
  },
  {
    label: '右肺野',
    en: 'Right lung field',
    x: 26,
    y: 38,
    text: '由肺尖到肺底，左右同高度對照。血管紋理向周邊逐漸變細；別忘了心後區與膈下重疊的肺。',
  },
];
function Viewer({
  src,
  interactive = false,
}: {
  src: string;
  interactive?: boolean;
}) {
  const [labels, setLabels] = useState(true),
    [selected, setSelected] = useState<number | null>(null),
    [contrast, setContrast] = useState([100]),
    [zoom, setZoom] = useState(false),
    [failed, setFailed] = useState(false);
  return (
    <div className="viewer">
      <div className="viewer-top">
        <span>
          <i className="live-dot" />
          {interactive ? 'NORMAL REFERENCE' : 'CASE RADIOGRAPH'}
        </span>
        <span>胸部正面影像</span>
      </div>
      <div className={'film-scroll ' + (zoom ? 'zoomed' : '')}>
        <div className="film">
          {failed ? (
            <p className="image-error">影像載入失敗，請重新整理後再試。</p>
          ) : (
            <img
              src={src}
              alt={
                interactive
                  ? '正常成人 PA 胸片，含原片左側標記'
                  : '教學胸片，請觀察主要影像徵象'
              }
              onError={() => setFailed(true)}
              style={{ filter: 'contrast(' + contrast[0] + '%)' }}
            />
          )}
          {interactive &&
            labels &&
            !failed &&
            spots.map((s, i) => (
              <button
                key={s.label}
                className={'spot ' + (selected === i ? 'selected' : '')}
                style={{ left: s.x + '%', top: s.y + '%' }}
                onClick={() => setSelected(i)}
                aria-label={'探索' + s.label}
                aria-pressed={selected === i}
              >
                {i + 1}
                <span>{s.label}</span>
              </button>
            ))}
        </div>
      </div>
      <div className="viewer-tools">
        {interactive && (
          <button onClick={() => setLabels(!labels)} aria-pressed={labels}>
            <Eye size={16} />
            {labels ? '隱藏標記' : '顯示標記'}
          </button>
        )}
        <button onClick={() => setZoom(!zoom)} aria-pressed={zoom}>
          <Crosshair size={16} />
          {zoom ? '縮回全圖' : '放大影像'}
        </button>
        <div className="contrast">
          對比
          <Slider
            aria-label="影像對比"
            min={70}
            max={160}
            value={contrast}
            onValueChange={(v) => setContrast(Array.isArray(v) ? v : [v])}
          />
        </div>
        <button
          aria-label="重設影像"
          onClick={() => {
            setContrast([100]);
            setZoom(false);
            setSelected(null);
          }}
        >
          <RotateCcw size={16} />
        </button>
      </div>
      {interactive && (
        <div className="anatomy-note" aria-live="polite">
          <Crosshair size={20} />
          <div>
            <strong>
              {selected === null
                ? '點選影像上的數字，認識解剖'
                : spots[selected].label + ' · ' + spots[selected].en}
            </strong>
            <p>
              {selected === null
                ? '影像右側是病人左側；先確認原片的 L / R 標記。六個定位點帶你建立正常胸片的基準。'
                : spots[selected].text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Home() {
  const [tab, setTab] = useState('learn'),
    [step, setStep] = useState(0),
    [completed, setCompleted] = useState<number[]>([]),
    [diseaseIndex, setDiseaseIndex] = useState(0),
    [imageIndex, setImageIndex] = useState(0),
    [caseReveal, setCaseReveal] = useState(false),
    [caseIndex, setCaseIndex] = useState(0),
    [reveal, setReveal] = useState(false),
    [hint, setHint] = useState(false),
    [q, setQ] = useState(0),
    [answers, setAnswers] = useState<Record<number, number>>({}),
    [finished, setFinished] = useState(false);
  const lesson = lessons[step],
    disease = diseaseLibrary[diseaseIndex],
    libraryImage = disease.images[imageIndex],
    c = cases[caseIndex],
    question = questions[q],
    answered = answers[q] !== undefined,
    score = questions.filter((x, i) => answers[i] === x.correct).length;
  function nextLesson() {
    setCompleted((v) => (v.includes(step) ? v : [...v, step]));
    if (step < 6) setStep(step + 1);
    else setTab('cases');
  }
  function changeDisease(i: number) {
    setDiseaseIndex(i);
    setImageIndex(0);
    setCaseReveal(false);
  }
  function changeLibraryImage(i: number) {
    setImageIndex(i);
    setCaseReveal(false);
  }
  function changeCase(i: number) {
    setCaseIndex(i);
    setReveal(false);
    setHint(false);
  }
  return (
    <main>
      <header className="header">
        <Link href="/" className="brand" aria-label="CXR Lab 首頁">
          <span className="brand-icon">
            <ScanLine />
          </span>
          <strong>
            CXR<span>LAB</span>
          </strong>
          <i className="brand-divider" />
          <span className="brand-sub">胸片判讀練習室</span>
        </Link>
        <span className="header-meta">
          成人胸片入門 <span>／</span> 繁體中文
        </span>
      </header>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(String(v))}
        className="app-tabs"
      >
        <div className="nav-row">
          <TabsList className="navigation" aria-label="學習模式">
            <TabsTrigger value="learn">
              <BookOpen size={16} />
              判讀入門
            </TabsTrigger>
            <TabsTrigger value="cases">
              <ScanLine size={16} />
              影像練習
            </TabsTrigger>
            <TabsTrigger value="quiz">
              <Crosshair size={16} />
              快速測驗
            </TabsTrigger>
            <TabsTrigger value="reference">判讀速查</TabsTrigger>
          </TabsList>
          <span className="session">本次已學 {completed.length} / 7 步</span>
        </div>
        <TabsContent value="learn">
          <section className="intro">
            <div>
              <p className="eyebrow">01 / BUILD YOUR READING ROUTINE</p>
              <h1>看胸片，先有一個順序。</h1>
              <p>先用正常影像練習，再把同一套方法帶到每一張胸片。</p>
            </div>
            <span className="time-tag">約 15 分鐘 · 建立基礎</span>
          </section>
          <div className="learning-grid">
            <div>
              <Viewer src="/images/normal-pa.jpg" interactive />
              <p className="image-credit">
                正常 PA 胸片 · Yale Rosen ·{' '}
                <a
                  href="https://creativecommons.org/licenses/by-sa/2.0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-SA 2.0
                </a>{' '}
                ·{' '}
                <a href={sources.normal} target="_blank" rel="noreferrer">
                  影像來源 ↗
                </a>{' '}
                · 數字為教學疊加標記
              </p>
            </div>
            <aside className="lesson-panel">
              <div className="section-label">
                你的判讀路線 <span>0{step + 1} / 07</span>
              </div>
              <div className="steps">
                {lessons.map((l, i) => (
                  <button
                    key={l.code}
                    className={step === i ? 'active' : ''}
                    onClick={() => setStep(i)}
                    aria-label={l.code + ' ' + l.title}
                    aria-pressed={step === i}
                  >
                    {completed.includes(i) ? <Check size={15} /> : l.code}
                  </button>
                ))}
              </div>
              <div className="lesson-heading">
                <span>{lesson.code}</span>
                <div>
                  <p>{lesson.en}</p>
                  <h2>{lesson.title}</h2>
                </div>
              </div>
              <p className="lesson-lead">{lesson.lead}</p>
              <ol className="checks">
                {lesson.checks.map((s, i) => (
                  <li key={s}>
                    <span>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="pearl">
                <Lightbulb size={20} />
                <div>
                  <strong>容易踩的坑</strong>
                  <p>{lesson.pitfall}</p>
                </div>
              </div>
              <button className="primary next-step" onClick={nextLesson}>
                {step === 6 ? '完成入門，練習真實影像' : '記住了，下一步'}
                <ArrowRight size={18} />
              </button>
              <p className="micro">先排除明顯危急徵象，再完成完整掃描。</p>
            </aside>
          </div>
        </TabsContent>
        <TabsContent value="cases">
          <section className="intro library-intro">
            <div>
              <p className="eyebrow">02 / COMMON CXR PATTERN LIBRARY</p>
              <h1>常見病灶，每一類看滿 10 張。</h1>
              <p>選疾病、換病例、先自己找線索，再展開判讀提示。</p>
            </div>
            <span className="time-tag">8 類 · 80 張真實胸片</span>
          </section>
          <div className="disease-workspace">
            <nav className="disease-rail" aria-label="常見胸片疾病分類">
              <p className="rail-title">疾病分類</p>
              {diseaseLibrary.map((item, i) => (
                <button
                  key={item.key}
                  className={diseaseIndex === i ? 'active' : ''}
                  onClick={() => changeDisease(i)}
                  aria-pressed={diseaseIndex === i}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.images.length} 張影像</small>
                  </div>
                </button>
              ))}
            </nav>
            <section className="library-main">
              <div className="library-heading">
                <div>
                  <p className="eyebrow">{disease.en}</p>
                  <h2>{disease.title}</h2>
                </div>
                <span>
                  {String(imageIndex + 1).padStart(2, '0')} /{' '}
                  {String(disease.images.length).padStart(2, '0')}
                </span>
              </div>
              <Viewer key={libraryImage.src} src={libraryImage.src} />
              <div className="library-caption">
                <p>{libraryImage.note}</p>
                <p className="image-credit">
                  {libraryImage.artist || 'Wikimedia Commons contributor'} ·{' '}
                  <a
                    href={libraryImage.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {libraryImage.license}
                  </a>{' '}
                  ·{' '}
                  <a
                    href={libraryImage.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    原圖與病例說明 ↗
                  </a>
                </p>
              </div>
              <div
                className="thumbnail-strip"
                aria-label={`${disease.title}病例選擇`}
              >
                {disease.images.map((image, i) => (
                  <button
                    key={image.title}
                    className={imageIndex === i ? 'active' : ''}
                    onClick={() => changeLibraryImage(i)}
                    aria-label={`${disease.title}影像 ${i + 1}`}
                    aria-pressed={imageIndex === i}
                  >
                    <img src={image.src} alt="" loading="lazy" />
                    <span>病例 {String(i + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </section>
            <aside className="library-guide">
              <div className="section-label">
                判讀焦點 <span>先看圖再展開</span>
              </div>
              <h2>{disease.prompt}</h2>
              <div className="observation">
                <span>這一類要找</span>
                <ol>
                  {disease.lookFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
              <button
                className="primary reveal-button"
                onClick={() => setCaseReveal(!caseReveal)}
                aria-expanded={caseReveal}
              >
                {caseReveal ? '收起完整提示' : '我看好了，展開提示'}
                <Eye size={18} />
              </button>
              {caseReveal && (
                <div className="library-answer" aria-live="polite">
                  <div className="pearl">
                    <Lightbulb size={20} />
                    <div>
                      <strong>容易踩的坑</strong>
                      <p>{disease.pitfall}</p>
                    </div>
                  </div>
                  <p className="report">
                    <span>練習報告骨架</span>
                    {disease.report}
                  </p>
                </div>
              )}
              <div className="pager library-pager">
                <button
                  disabled={imageIndex === 0}
                  onClick={() => changeLibraryImage(imageIndex - 1)}
                >
                  <ChevronLeft size={18} />
                  上一張
                </button>
                <button
                  disabled={imageIndex === disease.images.length - 1}
                  onClick={() => changeLibraryImage(imageIndex + 1)}
                >
                  下一張
                  <ChevronRight size={18} />
                </button>
              </div>
              <p className="library-scope">
                同一疾病可能有不同外觀；10 張用來建立模式辨識，不代表所有表現。
              </p>
            </aside>
          </div>
        </TabsContent>
        <TabsContent value="legacy-cases">
          <section className="intro">
            <div>
              <p className="eyebrow">02 / LOOK · DESCRIBE · EXPLAIN</p>
              <h1>先描述徵象，再下結論。</h1>
              <p>每張圖先找 2–3 個線索，再展開解析。部分原圖附教學箭頭。</p>
            </div>
            <span className="time-tag">4 張真實影像</span>
          </section>
          <div className="case-select">
            {cases.map((_, i) => (
              <button
                className={caseIndex === i ? 'active' : ''}
                key={i}
                onClick={() => changeCase(i)}
                aria-pressed={caseIndex === i}
              >
                影像 0{i + 1}
                {i === 0 && <span>入門</span>}
              </button>
            ))}
          </div>
          <div className="learning-grid">
            <div>
              <Viewer key={c.image} src={c.image} />
              <p className="image-credit">
                {c.author} ·{' '}
                <a href={c.licenseUrl} target="_blank" rel="noreferrer">
                  {c.license}
                </a>{' '}
                ·{' '}
                <a href={c.source} target="_blank" rel="noreferrer">
                  原圖來源 ↗
                </a>
                {c.embedded && ' · 原圖含箭頭／圈選'}
              </p>
            </div>
            <aside className="lesson-panel">
              <div className="section-label">
                CASE 0{caseIndex + 1}
                <span>觀察練習</span>
              </div>
              <h2 className="case-title">{c.prompt}</h2>
              <p className="lesson-lead">{c.task}</p>
              <div className="observation">
                <span>先問自己</span>
                <ol>
                  <li>異常在哪一側、哪個區域？</li>
                  <li>變白、變黑，還是體積改變？</li>
                  <li>有沒有需要優先處理的徵象？</li>
                </ol>
              </div>
              <button
                className="secondary"
                onClick={() => setHint(!hint)}
                aria-expanded={hint}
              >
                <Lightbulb size={17} />
                {hint ? '收起提示' : '給我一點提示'}
              </button>
              {hint && <p className="hint">{c.hint}</p>}
              <button
                className="primary next-step"
                onClick={() => setReveal(!reveal)}
                aria-expanded={reveal}
              >
                {reveal ? '收起解析' : '我看好了，查看解析'}
                <Eye size={18} />
              </button>
              {reveal && (
                <div className="case-answer" aria-live="polite">
                  <p className="eyebrow">關鍵影像模式</p>
                  <h3>{c.title}</h3>
                  <ul>
                    {c.findings.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="pearl">
                    <div>
                      <strong>判讀界線</strong>
                      <p>{c.limit}</p>
                    </div>
                  </div>
                  <p className="report">
                    <span>練習報告</span>
                    {c.report}
                  </p>
                </div>
              )}
              <div className="pager">
                <button
                  disabled={caseIndex === 0}
                  onClick={() => changeCase(caseIndex - 1)}
                >
                  <ChevronLeft size={18} />
                  上一張
                </button>
                <button
                  disabled={caseIndex === 3}
                  onClick={() => changeCase(caseIndex + 1)}
                >
                  下一張
                  <ChevronRight size={18} />
                </button>
              </div>
            </aside>
          </div>
        </TabsContent>
        <TabsContent value="quiz">
          <section className="intro">
            <div>
              <p className="eyebrow">03 / CHECK YOUR READING INSTINCT</p>
              <h1>把線索，變成判讀能力。</h1>
              <p>8 道觀念題，即時回饋。答錯的地方，就是下一輪要注意的地方。</p>
            </div>
          </section>
          <div className="quiz-wrap">
            {finished ? (
              <div className="result">
                <span className="eyebrow">本次測驗完成</span>
                <div className="score">
                  {score}
                  <span> / 8</span>
                </div>
                <h2>
                  {score === 8
                    ? '基礎觀念掌握得很好。'
                    : '回到線索，再練一次。'}
                </h2>
                <p>分數反映本次題目表現，不代表臨床判讀能力。</p>
                <div className="review-list">
                  {questions.map(
                    (x, i) =>
                      answers[i] !== x.correct && (
                        <article key={x.title}>
                          <strong>
                            第 {i + 1} 題 · {x.title}
                          </strong>
                          <p>{x.explanation}</p>
                        </article>
                      ),
                  )}
                </div>
                <button
                  className="primary"
                  onClick={() => {
                    setQ(0);
                    setAnswers({});
                    setFinished(false);
                  }}
                >
                  重新測驗
                  <RotateCcw size={18} />
                </button>
              </div>
            ) : (
              <>
                <div className="quiz-top">
                  <span>問題 0{q + 1} / 08</span>
                  <span>{Object.keys(answers).length} 題已作答</span>
                </div>
                <div className="quiz-track" aria-hidden="true">
                  <i style={{ width: ((q + 1) / 8) * 100 + '%' }} />
                </div>
                <p className="question-category">{question.category}</p>
                <h2>{question.title}</h2>
                <div className="choices">
                  {question.options.map((o, i) => (
                    <button
                      key={o}
                      disabled={answered}
                      className={
                        answered
                          ? i === question.correct
                            ? 'correct'
                            : i === answers[q]
                              ? 'wrong'
                              : ''
                          : ''
                      }
                      onClick={() => setAnswers({ ...answers, [q]: i })}
                    >
                      <span>{String.fromCharCode(65 + i)}</span>
                      {o}
                      {answered && i === question.correct && (
                        <Check size={20} />
                      )}
                    </button>
                  ))}
                </div>
                {answered && (
                  <output
                    className={
                      'feedback ' +
                      (answers[q] === question.correct ? 'success' : '')
                    }
                  >
                    <strong>
                      {answers[q] === question.correct
                        ? '答對了。'
                        : '再記住這個重點：正確答案是 ' +
                          String.fromCharCode(65 + question.correct) +
                          '。'}
                    </strong>
                    <p>{question.explanation}</p>
                  </output>
                )}
                <div className="pager">
                  <button disabled={q === 0} onClick={() => setQ(q - 1)}>
                    <ChevronLeft size={18} />
                    上一題
                  </button>
                  <button
                    className="primary"
                    disabled={!answered}
                    onClick={() => (q === 7 ? setFinished(true) : setQ(q + 1))}
                  >
                    {q === 7 ? '查看結果' : '下一題'}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="reference">
          <section className="intro">
            <div>
              <p className="eyebrow">04 / KEEP THE ESSENTIALS CLOSE</p>
              <h1>每張胸片，都走完同一圈。</h1>
              <p>這是一套便於記憶的順序；重點是固定、完整，並與舊片比較。</p>
            </div>
          </section>
          <div className="reference-grid">
            {lessons.map((l) => (
              <article className="reference-card" key={l.code}>
                <span className="ref-code">{l.code}</span>
                <h2>{l.title}</h2>
                <p>{l.checks.join(' ')}</p>
              </article>
            ))}
          </div>
          <div className="reference-bottom">
            <article>
              <h2>先描述，再推論</h2>
              <p>
                投照／品質 → 位置與分布 → 密度與容積 → 肋膜、心影、管線 →
                結論與限制。
              </p>
              <blockquote>
                正常片範例：心縱膈輪廓無明顯擴大。無局部肺實變、胸水或氣胸。仍須結合臨床問題與舊片。
              </blockquote>
              <h3>輪廓徵定位</h3>
              <p>
                右心緣消失 → 右中葉；左心緣消失 → 舌葉；橫膈輪廓消失 →
                同側下葉可能受影響。須確認病灶確實與該邊界接觸。
              </p>
            </article>
            <article>
              <h2>別漏掉這些盲點</h2>
              <p>肺尖、肺門、心後區、橫膈下重疊肺野、肋膈角、骨骼與軟組織。</p>
              <div className="urgent">
                <strong>病人不穩定，先處理臨床急症。</strong>
                <p>
                  張力性氣胸是臨床診斷，不能等待影像確認。正常胸片也不能排除肺栓塞或所有早期病灶。
                </p>
              </div>
            </article>
          </div>
          <section className="sources">
            <h2>教學來源與影像授權</h2>
            <p>
              教學整理日期：2026-09-07。影像作者、原圖與授權標於各圖下方；影像保留原始內容，僅以網頁縮放顯示。
            </p>
            {[
              ['影像品質', sources.quality],
              ['胸部解剖', sources.anatomy],
              ['基本判讀', sources.basic],
              ['肺部疾病', sources.lung],
              ['心衰竭', sources.edema],
            ].map(([title, url]) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                {title} ·{' '}
                {url.includes('masterclass')
                  ? 'Radiology Masterclass'
                  : 'The Radiology Assistant'}{' '}
                ↗
              </a>
            ))}
          </section>
        </TabsContent>
      </Tabs>
      <footer>
        <span>
          <ScanLine size={16} /> CXR LAB
        </span>
        <p>成人胸片基礎教學；供學習使用，不取代正式影像報告與臨床判斷。</p>
        <button
          onClick={() => {
            setTab('reference');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          來源與速查 ↗
        </button>
      </footer>
    </main>
  );
}
