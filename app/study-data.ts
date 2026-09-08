export const sources = {
  normal:
    'https://commons.wikimedia.org/wiki/File:Normal_PA_chest_x-ray_(5414485536).jpg',
  quality:
    'https://www.radiologymasterclass.co.uk/tutorials/chest/chest_quality/chest_xray_quality_start',
  anatomy:
    'https://www.radiologymasterclass.co.uk/tutorials/chest/chest_home_anatomy/chest_anatomy_start',
  basic: 'https://radiologyassistant.nl/chest/chest-x-ray/basic-interpretation',
  lung: 'https://radiologyassistant.nl/chest/chest-x-ray/lung-disease',
  edema: 'https://radiologyassistant.nl/chest/chest-x-ray/heart-failure',
};
export const lessons = [
  {
    code: 'Q',
    en: 'QUALITY FIRST',
    title: '先確認，這張片能怎麼讀',
    lead: '看病人、日期與左右，再看投照和影像品質。這一步決定後面能相信哪些線索。',
    checks: [
      '核對身分、日期、L／R、PA／AP 與站立／仰臥，找舊片比較。',
      '旋轉：比較兩側鎖骨內端與胸椎棘突的距離。',
      '吸氣：右橫膈上約見 6 根前肋或 10 根後肋是常用參考，需整體判斷。',
      '曝光與涵蓋：心後椎體應隱約可見，肺尖、肋膈角需入鏡；辨認偽影。',
    ],
    pitfall:
      'AP 與低肺容積都可能讓心影顯大。別直接把床邊 AP 的大心影判成心臟擴大。',
  },
  {
    code: 'A',
    en: 'AIRWAY',
    title: '氣管與中央氣道',
    lead: '沿著氣柱往下追，不只看氣管是否置中。',
    checks: [
      '確認氣管走向、隆突與兩側主支氣管。',
      '偏移先看旋轉；再判斷是否伴肺容積減少或占位效應。',
      '若有氣管內管，追完整路徑、管尖與隆突的關係。',
    ],
    pitfall:
      '單靠氣管偏移不能診斷張力性氣胸；應與病人狀態及其他影像徵象一起判斷。',
  },
  {
    code: 'B',
    en: 'BREATHING',
    title: '肺野與肋膜',
    lead: '同一高度左右比較，由上到下，最後再掃一遍周邊。',
    checks: [
      '找局部或瀰漫性變白、過度透亮，以及不對稱血管紋理。',
      '變白時看有無容積減少；裂隙位移、肺門牽拉支持肺不張。',
      '氣胸找臟層肋膜線與線外缺乏肺紋理；胸水看肋膈角與弧形上緣。',
    ],
    pitfall:
      '實變是影像模式，不等於肺炎。感染、肺水腫、出血等都可能讓肺泡變白。',
  },
  {
    code: 'C',
    en: 'CARDIOMEDIASTINAL',
    title: '心影、縱膈與肺門',
    lead: '一起看大小、邊界與密度，不只量心胸比。',
    checks: [
      '成人站立、吸氣良好的 PA 片，心胸比 > 0.5 提示心影擴大。',
      '追蹤心緣與縱膈輪廓，找局部邊界消失或異常隆起。',
      '比較肺門大小、密度、高度；左肺門通常略高。',
    ],
    pitfall:
      'AP 片會放大心影。縱膈變寬也可能受投照、旋轉與低吸氣影響，不能單靠胸片排除或確診主動脈病變。',
  },
  {
    code: 'D',
    en: 'DIAPHRAGM',
    title: '橫膈與膈下',
    lead: '兩個圓頂、兩個肋膈角，再看下方。',
    checks: [
      '比較左右橫膈高度與連續性，右側常略高。',
      '肋膈角變鈍可見於胸水，也可由肋膜增厚造成。',
      '看膈下氣體位置：左側胃泡可正常，異常游離氣須結合臨床評估。',
    ],
    pitfall:
      '仰臥胸水可能後方鋪開、沒有典型弧形上緣。正面片肋膈角清楚也不能排除少量胸水。',
  },
  {
    code: 'E',
    en: 'EVERYTHING ELSE',
    title: '骨骼、軟組織與管線',
    lead: '影像的邊緣，也可能藏著最重要的答案。',
    checks: [
      '逐一追蹤肋骨、鎖骨、肩胛與可見脊椎。',
      '注意皮下氣腫與胸壁不對稱。',
      '每條管線都從入口追到末端，評估位置與相關併發症。',
    ],
    pitfall:
      '皮膚皺褶可能模仿氣胸線；偽影邊緣常較厚，外側仍可見肺紋理。疑點需要進一步確認。',
  },
  {
    code: 'F',
    en: 'FINAL REVIEW',
    title: '回頭掃描，形成結論',
    lead: '回答臨床問題，但不要在找到第一個異常後停下來。',
    checks: [
      '再看肺尖、肺門、心後區、膈下重疊肺野。',
      '與舊片比較：是新出現、惡化，還是穩定？',
      '先描述位置、分布與徵象，再提出最可能解釋和必要限制。',
    ],
    pitfall:
      '正常胸片不能排除所有疾病，例如肺栓塞或早期肺炎；後續評估取決於症狀與臨床疑慮。',
  },
];
export const cases = [
  {
    image: '/images/consolidation-rml.jpg',
    author: 'Mikael Häggström, MD',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source:
      'https://commons.wikimedia.org/wiki/File:X-ray_of_lobar_pneumonia.jpg',
    embedded: false,
    prompt: '哪一區的肺，比對側更白？',
    task: '先找局部密度增加，再判斷是否有明顯肺容積減少。',
    hint: '看病人右側中下肺野，也就是畫面左側的下半部。肺野區域不等同肺葉。',
    title: '右中葉肺實變',
    findings: [
      '右側中下肺野可見局部片狀密度增加。',
      '原始病例資料確認為右中葉肺炎；單張正面片的下肺野異常不等同下葉病灶。',
      '用側位片與輪廓徵協助定位，並結合症狀判斷病因。',
    ],
    limit:
      '這張圖示範實變模式。肺炎是原始病例診斷；不能僅由這個模式確定感染或病原。',
    report:
      '右側中下肺野局部實變；來源病例定位於右中葉。請結合臨床與既往影像。',
  },
  {
    image: '/images/pneumothorax-left.jpg',
    author: 'Mynameisderek',
    license: 'Public domain',
    licenseUrl:
      'https://commons.wikimedia.org/wiki/File:Expiration-left-side-pneumo.jpg#Licensing',
    source:
      'https://commons.wikimedia.org/wiki/File:Expiration-left-side-pneumo.jpg',
    embedded: true,
    prompt: '更黑的周邊，還有肺紋理嗎？',
    task: '沿著原圖箭頭找邊界，再比較邊界內外的肺紋理。',
    hint: '看病人左側上外側胸腔，也就是畫面右側。',
    title: '左側氣胸',
    findings: [
      '左側可見臟層肋膜線，原圖箭頭協助定位。',
      '肋膜線外的胸腔較透亮，缺乏正常肺血管紋理。',
      '左肺向內回縮；原圖為呼氣影像，不要據此直接量化標準氣胸大小。',
    ],
    limit:
      '此片不能單獨判定張力性氣胸。若病人不穩定且臨床懷疑張力性氣胸，不應等待影像才緊急處理。',
    report: '左側氣胸。請立即結合呼吸與循環狀態評估臨床急迫性。',
  },
  {
    image: '/images/pleural-effusion-left.png',
    author: 'James Heilman, MD',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Effusionhalf.PNG',
    embedded: true,
    prompt: '肺底變白，上緣是什麼形狀？',
    task: '沿左側胸壁向下看，找橫膈與肋膈角是否仍清楚。',
    hint: '畫面右下方的白色區域，上緣往外側升高。',
    title: '大量左側胸腔積液',
    findings: [
      '左下胸腔大片均勻密度增加。',
      '左側橫膈與肋膈角被遮蔽，上緣呈弧形、向外側升高。',
      '站立片的此種分布支持胸水；原圖圈選標出病灶區域。',
    ],
    limit:
      '胸片不能判斷滲出液或漏出液，也不能確定病因。超音波可進一步確認與評估。',
    report: '大量左側胸腔積液，遮蔽左側膈面與肋膈角。',
  },
  {
    image: '/images/pulmonary-edema.png',
    author: 'James Heilman, MD',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    source: 'https://commons.wikimedia.org/wiki/File:PulmEdema.PNG',
    embedded: true,
    prompt: '兩側一起變白，該怎麼想？',
    task: '比較肺門周邊與肺底的密度，再檢查兩側肋膈角。',
    hint: '尋找雙側間質／肺泡陰影，以及伴隨的少量胸水。',
    title: '肺水腫的影像模式',
    findings: [
      '雙側間質與肺泡密度增加，涉及肺門周邊和肺底。',
      '合併雙側少量胸腔積液，原圖箭頭／圈選協助觀察。',
      '對稱分布與胸水可支持肺水腫，但不是單一病因的證明。',
    ],
    limit:
      '不能由此片確認心因性病因。急性肺水腫可無明顯心影擴大，需結合臨床與其他檢查。',
    report: '雙側間質及肺泡陰影合併少量胸腔積液，考慮肺水腫模式；請結合臨床。',
  },
];
export const questions = [
  {
    category: 'Q · 影像品質',
    title: '床邊 AP 胸片心影顯大，最合理的第一步是？',
    options: [
      '直接診斷心臟擴大',
      '先確認投照、吸氣程度並比較舊片',
      '用 PA 的 0.5 門檻直接判定',
      '正常 AP 心影一定小於胸寬一半',
    ],
    correct: 1,
    explanation:
      'AP 放大與低肺容積都會影響心影。心胸比 0.5 的常用門檻適用於成人吸氣良好的站立 PA 片。',
  },
  {
    category: 'B · 肋膜',
    title: '哪個組合最支持氣胸？',
    options: [
      '肋膜線外仍有清楚肺紋理',
      '只有一條較厚皮膚線',
      '臟層肋膜線，且線外缺乏肺紋理',
      '只有局部肺野變白',
    ],
    correct: 2,
    explanation:
      '關鍵是臟層肋膜邊界與其外側缺乏肺紋理。皮膚皺褶、衣物與其他偽影可能模仿邊界。',
  },
  {
    category: 'B · 肺容積',
    title: '局部肺野變白，合併裂隙位移與肺門牽拉，較支持？',
    options: [
      '肺不張',
      '單憑這些徵象確定細菌性肺炎',
      '單純氣胸',
      '影像完全正常',
    ],
    correct: 0,
    explanation:
      '變白加上容積減少支持肺不張。肺炎也可能合併肺不張，但單純實變通常不會有同程度的容積減少徵象。',
  },
  {
    category: 'C · 輪廓徵',
    title: '右心緣被相鄰肺部實變遮蔽，最先考慮哪一肺葉？',
    options: ['左下葉', '右上葉', '舌葉', '右中葉'],
    correct: 3,
    explanation:
      '右中葉與右心緣相鄰；舌葉與左心緣相鄰。輪廓徵利用相鄰結構邊界消失協助定位。',
  },
  {
    category: 'D · 胸水',
    title: '站立胸片出現肋膈角變鈍、向外側升高的弧形液面，較支持？',
    options: ['肋骨骨折', '氣胸', '胸腔積液', '必定是惡性腫瘤'],
    correct: 2,
    explanation:
      '肋膈角變鈍與弧形上緣支持胸水，但不能確定病因。仰臥胸水可能沒有典型形狀。',
  },
  {
    category: 'B · 密度模式',
    title: '看到 air-space consolidation（肺實變），可以直接確定什麼？',
    options: [
      '一定是細菌感染',
      '存在肺泡區域密度增加的模式',
      '一定需要抗生素',
      '一定排除肺水腫',
    ],
    correct: 1,
    explanation:
      '實變是一種影像模式，可能由感染、肺水腫、出血等造成。病因必須結合臨床情境。',
  },
  {
    category: 'F · 急迫性',
    title: '病人循環不穩且臨床高度懷疑張力性氣胸，哪個觀念正確？',
    options: [
      '需要先等正式胸片報告',
      '胸片心影正常就排除',
      '張力性氣胸只由影像診斷',
      '緊急臨床處理不應為等待影像而延誤',
    ],
    correct: 3,
    explanation:
      '張力性氣胸是臨床急症。不穩定病人的緊急評估與處置，不應等待影像確認。',
  },
  {
    category: 'F · 判讀限制',
    title: '胸片看起來正常，以下哪個敘述正確？',
    options: [
      '仍不能排除肺栓塞或所有早期肺炎',
      '已排除所有胸腔疾病',
      '不需要考慮症狀',
      '任何呼吸困難都與肺無關',
    ],
    correct: 0,
    explanation:
      '胸片有敏感度限制。正常結果仍需搭配症狀、風險與臨床疑慮，決定是否進一步評估。',
  },
];
