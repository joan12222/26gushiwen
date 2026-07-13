# ROADMAP.md — 26古诗文大赛工具

## 当前阶段
- 阶段：基础内容录入与本地网页工具搭建。
- 当前工具形态：无构建工具的本地网页，直接打开 `index.html` 使用。
- 数据维护方式：每篇一份 Markdown，同时在 `app.js` 的 `works` 数组中维护网页索引。

## 已完成
1. 搭建本地网页版基础布局：
   - 左侧分类与篇目列表
   - 搜索
   - 原文、注释、文化常识、对照翻译、全文赏析切换
   - 题库区
   - 显示/隐藏答案
   - 打印

2. 页面样式：
   - 护眼色主题
   - 原文使用宋体风格
   - 注释使用清晰黑体风格
   - 原文重点词下方显示夹注
   - 支持隐藏注释，仅显示纯原文

3. 已录入文言文基础篇 24 篇：
   - `content/01-tang-taizong-cheng-shunde.md`：唐太宗惩顺德
   - `content/02-yanzi-lun-buxiang.md`：晏子论“不祥”
   - `content/03-sunshu-ao-wei-chu-lingyin.md`：孙叔敖为楚令尹
   - `content/04-zan-liu-xie.md`：赞刘谐
   - `content/05-shentu-dun-zhi-ding.md`：申屠敦之鼎
   - `content/06-zheng-banqiao-zhi-weixian.md`：郑板桥知潍县
   - `content/07-lu-zhi-lun-qiewu.md`：陆贽论切务
   - `content/08-zhuge-liang-chuanlue.md`：诸葛亮传略
   - `content/09-liqiu-zhangren.md`：黎丘丈人
   - `content/10-liu-zongyuan-lun-lidao.md`：柳宗元论吏道
   - `content/11-zengzi-huanxi.md`：曾子换席
   - `content/12-fuban-zhuan.md`：蝜蝂传
   - `content/13-dashu.md`：大鼠
   - `content/14-han-gaozu-lungong-feng-xiaohe.md`：汉高祖论功封萧何
   - `content/15-wang-anshi-bushi-xiushi.md`：王安石不事修饰
   - `content/16-guowei-shuo-yan-zhaowang.md`：郭隗说燕昭王
   - `content/17-rencailun.md`：人才论
   - `content/18-nanguan-chuqiu.md`：南冠楚囚
   - `content/19-beijiu-shi-bingquan.md`：杯酒释兵权
   - `content/20-gong-sui-wei-bohai-taishou.md`：龚遂为渤海太守
   - `content/21-weishang-chengxin-buqi.md`：为商诚信不欺
   - `content/22-gezhou-geai-shang-gongchen.md`：葛周割爱赏功臣
   - `content/23-shangzhi-zhai-shuo.md`：尚志斋说
   - `content/24-you-tiandu.md`：游天都

4. 已录入文言文提高篇 21 篇：
   - `content/improve-01-changju-jieni-ou-er-geng.md`：长沮桀溺耦而耕
   - `content/improve-02-shizhongshan-mingming-tanjiu.md`：石钟山命名探究
   - `content/improve-03-dun-jiaohua.md`：敦教化
   - `content/improve-04-shuanghe-xuanji.md`：双鹤轩记
   - `content/improve-05-zeng-jiangling-xu.md`：赠江伶序
   - `content/improve-06-junzi-wei-guo.md`：君子为国
   - `content/improve-07-zhiguo-you-fadu.md`：治国有法度
   - `content/improve-08-fuxing-shu.md`：复性书
   - `content/improve-09-bian-qinfa-lun.md`：辨侵伐论
   - `content/improve-10-shi-daxu-jiexuan.md`：诗大序（节选）
   - `content/improve-11-song-hetaixu-beiyou-xu.md`：送何太虚北游序
   - `content/improve-12-meihua-shu-ji.md`：梅花墅记
   - `content/improve-13-wangmen-touzhi.md`：望门投止
   - `content/improve-14-da-xie-minshi-shu.md`：答谢民师书
   - `content/improve-15-ma-xiansheng-zhuan.md`：马先生传
   - `content/improve-16-liu-renshan-zhuan.md`：刘仁赡传
   - `content/improve-17-xiegong-xingzhuang.md`：谢公行状
   - `content/improve-18-er-shanren-zhuan.md`：二山人传
   - `content/improve-19-shibian-jiexuan.md`：诗辨（节选）
   - `content/improve-20-kaiyuan-shengping-yuan.md`：开元升平源
   - `content/improve-21-hailing-xushi-nanyuan-ji.md`：海陵许氏南园记

5. 已录入文言文对比阅读 7 组：
   - `content/compare-01-jizha-rangguo.md`：对比阅读第一组：季札让国
   - `content/compare-02-jun-dao-zhi-guo.md`：对比阅读第二组：人君之道与治国之道
   - `content/compare-03-yongbing-dezhi.md`：对比阅读第三组：用兵与德治
   - `content/compare-04-shiguan-shizhi.md`：对比阅读第四组：史官与实录
   - `content/compare-05-shougeng-wuben.md`：对比阅读第五组：守耕与务本
   - `content/compare-06-mudan-fugui.md`：对比阅读第六组：牡丹与富贵
   - `content/compare-07-zengxu-daoyi.md`：对比阅读第七组：赠序与道义

6. 已修正：
   - 《赞刘谐》中“见而晒曰”已更正为“见而哂曰”。
   - 已取消“加点字视觉还原”功能；后续题库只保留原题文字，不做点号样式。
   - 文言文提高篇文件名统一为 `content/improve-NN-slug.md`，并已同步修正 `app.js` 中提高篇顺序为 01-21。

## 进行中
- 按用户截图继续录入每篇内容。
- 每篇都需要同步两处：
  - 新增 `content/NN-slug.md`
  - 追加到 `app.js` 的 `works` 数组

## 待办
1. 继续录入后续篇目截图。
2. 后续可考虑把 `app.js` 中的内容索引拆成独立数据文件，减少单文件过长。
3. 后续可考虑从 Markdown 自动生成网页索引，避免重复维护。
4. 后续可补 README，说明如何打开和继续录入。

## 录入规则
- 每篇 Markdown 结构固定：
  - `# 篇名`
  - `## 作者`
  - `## 出处`
  - `## 原文`
  - `## 注释`
  - `## 文化常识`
  - `## 对照翻译`
  - `## 全文赏析`
  - `## 题库`

- 题库处理：
  - 保留图片中的原题和原答案。
  - 不做“加点字”视觉还原。
  - 图片不清楚处标记为 `【待核对】`，不要猜。

- 原文夹注：
  - 在 `app.js` 每篇对象中维护 `annotations`。
  - 原文页默认显示词语下方小注释。
  - 用户可点“隐藏注释”只看纯原文。

- 翻译与赏析：
  - 对照翻译和全文赏析由 Codex 根据原文生成。
  - 如需要搜索核对，先搜索题名和关键句。
  - 找不到直接权威来源时，说明“按用户图片和出处整理”，不要编造来源。

- 对比阅读：
  - 一组对比阅读作为一个内容条目，不拆成甲乙丙多个条目。
  - Markdown 使用 `## 篇目` 分别记录甲、乙、丙的题目、作者、出处。
  - `## 原文`、`## 对照翻译`、`## 全文赏析` 按甲、乙、丙分别分段。
  - `## 注释`、`## 文化常识`、`## 题库` 按组维护。
  - `content/compare-NN-slug.md` 用于文言文对比阅读文件命名。

## 最近验证
- 已对 `app.js` 执行语法检查：通过。
- 最近一次验证日期：2026-07-13。
- 当前内容文件数量：52 个 Markdown 文件。
- 当前已完成文言文基础篇 24 篇、提高篇 21 篇、对比阅读 7 组。
- 已验证文言文提高篇在 `app.js` 中按 `improve-01` 到 `improve-21` 排序。
- 当前可直接打开：`index.html`。

## 阻塞
- 无。

## 下一步
- 继续录入后续高中古诗词阅读鉴赏训练内容。
- 每录入一篇或一组后运行 `node --check app.js` 验证语法。
