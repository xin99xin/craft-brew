// app/page.tsx 全量缝合版

import Image from 'next/image';
// 假设你昨天定义的 fetch 逻辑在 lib/fetchNews.ts，或者直接写在 page 里
// 如果是写在 page 里的，请保留你昨天的 async function getNews() 逻辑
// 下面我预留了数据调用的占位

async function getNewsData() {
  // 这里是你昨天的逻辑：Fetch RSS -> Gemini Parse -> Return Array
  // 如果你还没把逻辑抽离到 lib，请确保这个函数能跑通
  try {
    // 示例占位，请替换为你昨天的真实 fetch 代码
    // const response = await fetch('你的API或RSS源');
    // return await response.json();
    return []; // 暂时返回空数组以防报错
  } catch (e) {
    console.error("新闻抓取失败", e);
    return [];
  }
}

export default async function Home() {
  const newsData = await getNewsData();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-gray-100 selection:bg-amber-900">
      
      {/* --- HERO SECTION: 注入你的地下室灵魂 --- */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-gray-900">
        <Image
          src="/hero-bg.jpg" // 确保图片已重命名并放入 public 文件夹
          alt="地下室发酵罐阵列"
          fill
          priority
          className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        
        {/* 渐变遮罩：让底部过渡更自然 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 uppercase text-white mix-blend-difference">
            Craft Brew<br/>Rebound
          </h1>
          <div className="h-1 w-24 bg-amber-600 mx-auto mb-8"></div>
          <p className="max-w-xl mx-auto text-base md:text-lg font-light tracking-[0.2em] italic text-gray-400 uppercase">
            Logic is Cold. Fermentation is Hot.
          </p>
        </div>
      </section>

      {/* --- CONTENT GRID: 三段式逻辑分布 --- */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 01 / 左侧：立场 (占 3 格) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-amber-700 font-mono text-xs tracking-[0.3em] uppercase">01 / The Compass</p>
            <h2 className="text-3xl font-bold tracking-tight">立场与审美</h2>
            <div className="h-px w-12 bg-gray-800"></div>
            <p className="text-gray-500 text-sm leading-relaxed">
              在废墟中保持乐观，在代码中酿造自由。追求极致的工程师逻辑，拒绝平庸。
            </p>
            <div className="pt-4">
               <button className="text-[10px] border border-gray-800 px-4 py-2 uppercase tracking-widest hover:bg-white hover:text-black transition">
                 Read Manifesto
               </button>
            </div>
          </div>

          {/* 02 / 中间：行业简报 (占 6 格 - 核心数据区) */}
          <div className="lg:col-span-6 space-y-8">
            <p className="text-amber-700 font-mono text-xs tracking-[0.3em] uppercase text-center lg:text-left">
              02 / The Still (Daily Intelligence)
            </p>
            
            <div className="space-y-12">
              {newsData.length > 0 ? (
                newsData.map((item: any, index: number) => (
                  <article key={index} className="group border-l border-gray-800 pl-6 hover:border-amber-600 transition-colors">
                    <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors">{item.title}</h3>
                    <p className="mt-3 text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                    <div className="mt-4 flex items-center text-[10px] text-gray-600 space-x-4 uppercase tracking-widest">
                      <span>Source: {item.source || 'Brewbound'}</span>
                      <span>Confidence: 98%</span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="py-20 text-center border border-dashed border-gray-900 rounded-lg">
                  <p className="text-xs text-gray-700 uppercase tracking-widest animate-pulse">
                    [ Listening to Global Brewing Protocols... ]
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 03 / 右侧：变现业务 (占 3 格) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-amber-700 font-mono text-xs tracking-[0.3em] uppercase">03 / The Flask</p>
            <h2 className="text-3xl font-bold tracking-tight">商业闭环</h2>
            <div className="h-px w-12 bg-gray-800"></div>
            <ul className="space-y-6">
              <li className="group cursor-pointer">
                <span className="text-[10px] text-gray-600 block mb-1">Service A</span>
                <h4 className="font-bold group-hover:text-amber-500 transition">AI 酿造咨询</h4>
              </li>
              <li className="group cursor-pointer">
                <span className="text-[10px] text-gray-600 block mb-1">Service B</span>
                <h4 className="font-bold group-hover:text-amber-500 transition">地下室巡礼 & B端供货</h4>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-gray-900 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] text-gray-700 tracking-[0.5em] uppercase">
          <p>© 2026 Craft Brew Rebound</p>
          <p>Handcrafted in the Basement</p>
        </div>
      </footer>
    </main>
  );
}