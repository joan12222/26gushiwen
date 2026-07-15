# ROADMAP.md — 26古诗文大赛工具

## 当前阶段
- 阶段：98 篇内容已完成一轮入库、对照翻译复核和 Markdown 单一数据源迁移。
- 当前工具形态：无构建工具的本地网页，直接打开 `index.html` 使用。
- 数据维护方式：`content/` 下的 Markdown 是唯一人工维护源；运行 `node content-tool.js build` 自动生成 `content-data.js`。

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

6. 已录入高中古诗词阅读鉴赏训练基础篇 23 首：
   - `content/poem-basic-01-ge-lv.md`：葛屦
   - `content/poem-basic-02-yu-mei-ren-da-guang-zu-xi-zui-zhong-fu-changduanju.md`：虞美人·大光祖席醉中赋长短句
   - `content/poem-basic-03-za-shi-qi-shou-qi-si.md`：杂诗七首（其四）
   - `content/poem-basic-04-mu-ling-guan-bei-feng-ren-gui-yu-yang.md`：穆陵关北逢人归渔阳
   - `content/poem-basic-05-bai-yun-ge-song-liu-shiliu-gui-shan.md`：白云歌送刘十六归山
   - `content/poem-basic-06-zhonglv-putianle-xihu-jishi.md`：【中吕】普天乐·西湖即事
   - `content/poem-basic-07-qian-bei-huai-san-shou-qi-er.md`：遣悲怀三首（其二）
   - `content/poem-basic-08-meihua-jiu-shou-qi-yi.md`：梅花九首（其一）
   - `content/poem-basic-09-sui-gong.md`：隋宫
   - `content/poem-basic-10-shengshi-xiangling-guse.md`：省试湘灵鼓瑟
   - `content/poem-basic-11-jiang-zhongzi.md`：将仲子
   - `content/poem-basic-12-wan-ci-lexiang-xian.md`：晚次乐乡县
   - `content/poem-basic-13-linjiangxian-shu-yunnan-jiangling-bie-nei.md`：临江仙·戍云南江陵别内
   - `content/poem-basic-14-guo-baian-ting.md`：过白岸亭
   - `content/poem-basic-15-pusaman-shu-jian-maowu-xian-lin-shui.md`：菩萨蛮·数间茅屋闲临水
   - `content/poem-basic-16-xi-sai-shan-huai-gu.md`：西塞山怀古
   - `content/poem-basic-17-chi-bi.md`：赤壁
   - `content/poem-basic-18-jinling-yi-qi-yi.md`：金陵驿（其一）
   - `content/poem-basic-19-zhe-gu.md`：鹧鸪
   - `content/poem-basic-20-shen-yuan-er-shou.md`：沈园二首
   - `content/poem-basic-21-yuediao-liuyingqu-fan-li.md`：【越调】柳营曲·范蠡
   - `content/poem-basic-22-jinling-huai-gu.md`：金陵怀古
   - `content/poem-basic-23-zhegutian-shiren-jiangri-yi-ci-feng-ji.md`：鹧鸪天·室人降日以此奉寄

7. 已录入高中古诗词阅读鉴赏训练提高篇 17 首：
   - `content/poem-improve-01-guo-ming-taizu-gugong.md`：过明太祖故宫
   - `content/poem-improve-02-you-ju.md`：幽居
   - `content/poem-improve-03-xipingyue-zhiliu-suqing.md`：西平乐·稚柳苏晴
   - `content/poem-improve-04-shuidiaogetou-shuangjiang-bitianjing.md`：水调歌头·霜降碧天静
   - `content/poem-improve-05-gushi-shijiushou-quche-shang-dongmen.md`：古诗十九首·驱车上东门
   - `content/poem-improve-06-jintong-xianren-ci-han-ge.md`：金铜仙人辞汉歌
   - `content/poem-improve-07-ganyu-shi-sanshibashou-qi-shijiu.md`：感遇诗三十八首（其十九）
   - `content/poem-improve-08-ji-zhong-san.md`：秾中散
   - `content/poem-improve-09-qiuxing-bashou-qi-ba.md`：秋兴八首（其八）
   - `content/poem-improve-10-tasuoxing-chenzhou-lvshe.md`：踏莎行·郴州旅舍
   - `content/poem-improve-11-lanlingwang-liu.md`：兰陵王·柳
   - `content/poem-improve-12-ru-ruoye-xi.md`：入若耶溪
   - `content/poem-improve-13-shuidiaogetou-nini-ernv-yu.md`：水调歌头·昵昵儿女语
   - `content/poem-improve-14-baixingyueman-yese-cuigen.md`：拜星月慢·夜色催更
   - `content/poem-improve-15-wu-ren-mu.md`：五人墓
   - `content/poem-improve-16-xi-wei-liu-jue-ju.md`：戏为六绝句
   - `content/poem-improve-17-xie-lu-xing.md`：薤露行

8. 已录入高中古诗词对比阅读 6 组：
   - `content/poem-compare-01-song-yuaner-bie-dongda.md`：第一组：送元二使安西 / 别董大
   - `content/poem-compare-02-congjunxing-guanshanyue.md`：第二组：从军行 / 关山月
   - `content/poem-compare-03-song-weiwan-fude-muyu.md`：第三组：送魏万之京 / 赋得暮雨送李胄
   - `content/poem-compare-04-yu-yishui-songren.md`：第四组：于易水送人 / 李端公 / 钱别王十一南游
   - `content/poem-compare-05-ganyu-lan.md`：第五组：感遇（其一） / 兰
   - `content/poem-compare-06-yong-liu.md`：第六组：咏柳 / 咏柳

9. 已修正：
   - 《赞刘谐》中“见而晒曰”已更正为“见而哂曰”。
   - 《君子为国》中“糜其三都”已更正为“隳其三都”，并同步更新 Markdown、网页内容索引、注释和题库。
   - 《君子为国》已补充“孔门四科”文化常识说明。
   - 已取消“加点字视觉还原”功能；后续题库只保留原题文字，不做点号样式。
   - 文言文提高篇文件名统一为 `content/improve-NN-slug.md`，并已同步修正 `app.js` 中提高篇顺序为 01-21。

10. 已优化对照翻译展示：
   - 点击“对照翻译”后，每段原文下方紧跟对应译文，便于逐段对照阅读。
   - 原文与译文使用不同字号和颜色，并用分隔线区分段落组。

11. 已完成 Markdown 单一数据源迁移：
   - 98 篇 Markdown 全部采用机器可读的标识、关键词、行间注释、明确对照组和结构化题库格式。
   - `content-tool.js audit` 检查必填章节、唯一标识、`【待核对】`、空对照组、段数异常及 Markdown 与生成数据差异。
   - `content-tool.js build` 从 Markdown 自动生成 `content-data.js`，且重复生成结果一致。
   - `app.js` 只保留页面交互和渲染，不再重复维护正文数据。
   - `index.html` 先加载 `content-data.js`，再加载 `app.js`，保持双击离线打开。
   - 对照翻译只读取明确的原文、译文对照组，已删除整篇原文和整篇译文兜底逻辑。
   - 28 个原段数异常条目及古诗词、对比阅读条目已完成逐组人工复核。

## 进行中
- 当前无进行中的录入任务。

## 待办
1. 后续可补 README，说明如何打开、修改 Markdown、运行生成和审计命令。

## 录入规则
- 每篇 Markdown 结构固定：
  - `# 篇名`
  - `## 标识`
  - `## 作者`
  - `## 出处`
  - `## 行间注释`
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
  - 在 Markdown 的 `## 行间注释` 中维护，运行生成工具后写入 `content-data.js`。
  - 原文页默认显示词语下方小注释。
  - 用户可点“隐藏注释”只看纯原文。

- 翻译与赏析：
  - 对照翻译和全文赏析由 Codex 根据原文生成。
  - 如需要搜索核对，先搜索题名和关键句。
  - 找不到直接权威来源时，说明“按用户图片和出处整理”，不要编造来源。

- 对比阅读：
  - 一组对比阅读作为一个内容条目，不拆成甲乙丙多个条目。
  - `## 对照翻译` 使用“分篇”和“对照”标题分别记录各篇原文与译文。
  - 每个原文和译文单元必须恰好使用一次，不允许整篇兜底。
  - `## 注释`、`## 文化常识`、`## 题库` 按组维护。
  - `content/compare-NN-slug.md` 用于文言文对比阅读文件命名。
  - `content/poem-compare-NN-slug.md` 用于古诗词对比阅读文件命名。

## 最近验证
- 已对 `app.js` 执行语法检查：通过。
- 已对 `content-data.js`、`content-tool.js`、`content-pipeline.js` 执行语法检查：通过。
- `node content-tool.js audit`：98 篇、98 个 Markdown 文件、结构问题 0、`【待核对】` 0、待复核 0。
- 已验证 Markdown 与 `content-data.js` 字符级一致，连续运行 `build` 生成结果一致。
- 已验证 `git diff --check`：通过。
- 已由 Jun 实际打开本地页面并完成分类、搜索、篇目、对照翻译、题库等点击验证：正常。
- 最近一次验证日期：2026-07-15。
- 当前内容文件数量：98 个 Markdown 文件。
- 当前已完成文言文基础篇 24 篇、提高篇 21 篇、对比阅读 7 组。
- 当前已完成高中古诗词基础篇 23 首、提高篇 17 首、对比阅读 6 组。
- 已验证文言文提高篇按 `improve-01` 到 `improve-21` 排序。
- 已验证《唐太宗惩顺德》《孙叔敖为楚令尹》等修订内容已由 Markdown 正确生成到网页数据。
- 已验证“对照翻译”按 Markdown 中的明确对照组渲染。
- 当前可直接打开：`index.html`。

## 阻塞
- 无。

## 下一步
- 继续逐篇核对原文、注释、翻译和题库内容。
- 后续只修改 Markdown；修改后依次运行 `node content-tool.js build`、`node content-tool.js audit`。
