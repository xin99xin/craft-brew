const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser'); // 引入专业的 RSS 解析器
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const parser = new Parser();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function fetchAndSummarize() {
  // 直接使用原始官方 RSS 地址，不走中间商
  const sources = [
    'https://www.brewbound.com/feed',
    'https://www.beveragedaily.com/rss/feed/616857'
  ];

  let topArticles = [];

  console.log('🌾 正在直接连接酒厂水源 (RSS Direct)...');

  for (const url of sources) {
    try {
      console.log(`📡 正在同步: ${url}`);
      const feed = await parser.parseURL(url);
      
      if (feed.items && feed.items.length > 0) {
        // 提取前 6 条，清洗一下数据
        topArticles = feed.items.slice(0, 6).map(item => ({
          title: item.title,
          content: item.contentSnippet || item.content || ""
        }));
        console.log(`✅ 成功从 ${feed.title} 获取 ${topArticles.length} 条资讯！`);
        break; 
      }
    } catch (e) {
      console.warn(`⚠️ 水源 ${url} 暂时无法连接，尝试下一个...`);
    }
  }

  if (topArticles.length === 0) {
    console.error('❌ 还是没水？这可能是网络环境问题。尝试手动输入一条测试资讯...');
    // 最后的兜底：如果还是没水，我们模拟一条，确保你先看到页面效果
    topArticles = [{title: "Global Craft Beer Trends 2026", content: "AI is optimizing fermentation."}];
  }

  const promptContext = topArticles.map(a => `标题: ${a.title}\n描述: ${a.content}`).join('\n\n');

  console.log('🤖 正在通过 Gemini 2.0 Flash 酿造成“精酿简报”...');
  
  try {
    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          {
            "role": "system",
            "content": "你是一位啤酒行业资深专家，文风克制深邃，模仿『李自然』。"
          },
          {
            "role": "user",
            "content": `请基于以下行业资讯酿造一份《Craft Brew AI 简报》。要求包含【麦芽精华】和【发酵思考】。中文输出。\n\n资讯内容：\n${promptContext}`
          }
        ]
      })
    });

    const aiData = await aiResponse.json();
    if (!aiData.choices) {
      console.error('❌ AI 拒绝了你的请求：', JSON.stringify(aiData));
      return;
    }

    const summary = aiData.choices[0].message.content;
    const today = new Date().toISOString().split('T')[0];
    const folderPath = path.join(__dirname, '../content/daily');
    const filePath = path.join(folderPath, `${today}.md`);

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

    fs.writeFileSync(filePath, `---
title: "精酿内参：${today}"
date: "${today}"
---

${summary}`);

    console.log(`\n🎉 酿造完成！已装瓶至: content/daily/${today}.md`);
  } catch (error) {
    console.error('❌ 发生故障：', error);
  }
}

fetchAndSummarize();