import libraryImages from './cxr-library.json';

export type LibraryImage = {
  category: string;
  src: string;
  note: string;
  title: string;
  pageUrl: string;
  license: string;
  licenseUrl: string;
  artist: string;
  sourceDescription: string;
  hostedLocally: boolean;
};

const images = libraryImages as LibraryImage[];

export const diseaseLibrary = [
  {
    key: 'pneumonia',
    title: '肺炎／肺實變',
    en: 'PNEUMONIA · CONSOLIDATION',
    prompt: '先找局部或多灶性變白，再問有沒有容積減少。',
    lookFor: [
      '肺泡性密度增加或氣支氣管徵',
      '輪廓徵協助定位肺葉',
      '是否合併胸水或肺不張',
    ],
    pitfall:
      '實變是一種影像模式，感染、肺水腫與出血都可能造成。肺炎必須結合症狀、生命徵象與檢驗。',
    report:
      '局部肺實變，分布於＿＿；是否合併胸水：＿＿。考慮感染，但須結合臨床。',
  },
  {
    key: 'atelectasis',
    title: '肺不張',
    en: 'ATELECTASIS',
    prompt: '看到變白時，主動尋找「容積減少」的線索。',
    lookFor: [
      '裂隙、肺門或縱膈向病側位移',
      '橫膈抬高與肋間距變窄',
      '其餘肺葉代償性過度充氣',
    ],
    pitfall:
      '肺不張可和肺炎同時存在。若懷疑阻塞性肺不張，還要思考黏液栓、異物或中央腫瘤。',
    report:
      '＿＿肺葉／肺區密度增加並有容積減少，影像支持肺不張；建議評估可能阻塞原因。',
  },
  {
    key: 'pneumothorax',
    title: '氣胸',
    en: 'PNEUMOTHORAX',
    prompt: '沿著胸壁找肋膜線，再確認線外是否真的沒有肺紋理。',
    lookFor: [
      '臟層肋膜線',
      '肋膜線外缺乏肺血管紋理',
      '仰臥片的 deep sulcus sign',
    ],
    pitfall:
      '皮膚皺褶可能模仿氣胸線。張力性氣胸是臨床急症；病人不穩定時不能為等待影像而延誤處理。',
    report: '＿＿側氣胸；請結合呼吸與循環狀態評估臨床急迫性。',
  },
  {
    key: 'effusion',
    title: '胸腔積液',
    en: 'PLEURAL EFFUSION',
    prompt: '先看肋膈角，再沿液體上緣追蹤形狀與高度。',
    lookFor: [
      '站立片肋膈角變鈍與弧形上緣',
      '大量胸水可能推移縱膈',
      '仰臥時液體可向後方鋪開',
    ],
    pitfall:
      '正面片無法分辨滲出液或漏出液。仰臥胸水不一定有典型 meniscus sign，超音波常更敏感。',
    report: '＿＿側胸腔積液，量約＿＿；是否伴縱膈偏移或肺底實變：＿＿。',
  },
  {
    key: 'edema',
    title: '肺水腫',
    en: 'PULMONARY EDEMA',
    prompt: '從肺血管、間質到肺泡，按順序找水分增加的線索。',
    lookFor: [
      '肺血管重分布或肺門血管增粗',
      '間質紋理、Kerley 線或肺泡陰影',
      '心影擴大與雙側胸水等伴隨徵象',
    ],
    pitfall:
      '心影不大不能排除急性肺水腫；胸片也不能單獨確定心因性或非心因性病因。',
    report:
      '雙側＿＿型肺部陰影，合併＿＿；影像考慮肺水腫模式，請結合臨床與心臟評估。',
  },
  {
    key: 'copd',
    title: 'COPD／肺氣腫',
    en: 'COPD · EMPHYSEMA',
    prompt: '找過度充氣，但記得胸片正常也不能排除 COPD。',
    lookFor: [
      '橫膈變平、肺容積增加',
      '肺野過度透亮、周邊血管紋理稀少',
      '側位胸骨後透亮區增大或肺大疱',
    ],
    pitfall:
      'COPD 的診斷以症狀與肺功能為核心。胸片主要用來看併發症或其他病因。',
    report: '肺過度充氣與肺氣腫樣改變；未見／另見＿＿急性胸腔異常。',
  },
  {
    key: 'tuberculosis',
    title: '肺結核',
    en: 'PULMONARY TUBERCULOSIS',
    prompt: '注意上肺野、空洞、纖維化，也認得粟粒型的瀰漫細結節。',
    lookFor: [
      '上葉或肺尖斑片狀陰影與空洞',
      '纖維化、容積減少或鈣化',
      '雙肺均勻散布的細小結節',
    ],
    pitfall:
      '胸片無法確認活動性，也不能排除早期肺結核。需要微生物檢驗、臨床與必要的進一步影像。',
    report:
      '＿＿肺野見＿＿型病灶，肺結核列入鑑別；建議依感染管制與檢驗流程評估。',
  },
  {
    key: 'cancer',
    title: '肺結節／肺癌',
    en: 'NODULE · LUNG CANCER',
    prompt: '不要只找圓球；中央腫瘤也可能以肺門改變或肺不張出現。',
    lookFor: [
      '新出現或增大的結節／腫塊',
      '不規則、分葉或毛刺狀邊緣',
      '肺門增大、阻塞性肺不張或胸水',
    ],
    pitfall:
      '胸片重疊多，小結節可能看不見。可疑病灶通常需要舊片比較與 CT 進一步評估。',
    report: '＿＿肺野見＿＿公分結節／腫塊；建議比較舊片並依臨床安排胸部 CT。',
  },
].map((disease) => ({
  ...disease,
  images: images.filter((image) => image.category === disease.key),
}));
