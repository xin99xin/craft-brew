import Image from 'next/image';

// --- 1. 昨天的核心成果：抓取与解析逻辑 ---
// 注意：这里建议保持为服务端异步函数
async function getBrewingNews() {
  try {
    // 逻辑：Fetch RSS -> Gemini API 处理
    // 这里的返回结构需对应你昨天的定义
    // 如果你昨天的 fetch 逻辑在单独的文件，请 import 它
    // 下面是模拟数据，确保页面不空洞
    return [
      {
        title: "300L 批次冷端发酵压力曲线解构",
        summary: "基于 Gemini 的协议分析：在 12°C 下保持 1.2 bar 压力能显著提升不锈钢罐体内的酯类物质稳定性...",
        source: "Internal Protocol",
        time: "2h ago"
      },
      {
        title: "河鲜精酿配比算法 v1.2 更新",
        summary: "针对邻居饭店的清蒸鲈鱼，AI 建议调高萨兹啤酒花的添加比例，以苦味抵消油脂感...",
        source: "Local Sync",
        time: "5h ago"
      },
      {
        title: "全球精酿供应：铝罐成本波动预警",
        summary: "受能源价格影响，欧洲铝罐供应收紧。Gemini 建议转向散装桶装化（Keg）变现路径...",
        source: "Brewbound",
        time: "1d ago"
      }
    ];
  } catch (error) {
    console.error("Data Fetch Error:", error);
    return [];
  }
}

export default async function Home() {
  const newsData = await getBrewingNews();

  return (
    <main className="min-h-screen bg-[#050505] text-gray-100 selection:bg-amber-600 selection:text-black">
      
      {/* --- HERO SECTION: 解决“黑”的问题，找回银色质感 --- */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* 背景图：降低灰度，提高透明度，增加缩放感 */}
        <Image
          src="/hero-bg.jpg"
          alt="Basement Brewery"
          fill
          priority
          className="object-cover opacity-50 grayscale-[30%] scale-105 transition-transform duration-1000"
        />
        
        {/* 关键修复：遮罩层放在文字下方，且使用渐变而非全黑 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#050505] z-10"></div>

        {/* 文字内容：z-20 确保在遮罩之上，彻底告别“灰蒙蒙” */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-none text-white uppercase italic drop-shadow-2xl">
            CRAFT BREW<br/>
            <span className="text-amber-600 shadow-amber-900">REBOUND</span>
          </h1>
          
          <div className="h-1.5 w-24 bg-amber-600 mx-auto my-8 shadow-[0_0_20px_rgba(217,119,6,0.8)]"></div>
          
          <p className="max-w-xl mx-auto text-sm md:text-base tracking-[0.5em] font-light text-gray-300 uppercase opacity-80">
            Logic is Cold. Fermentation is Hot.
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION: 三段式逻辑分布 --- */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* 01 / 左栏：立场 (The Compass) */}
          <div className="lg:col-span-3 sticky top-12 space-y-6">
            <p className="text-amber-700 font-mono text-[10px] tracking-[0.4em] uppercase">01 / The Compass</p>
            <h2 className="text-3xl font-bold tracking-tighter border-b border-white/10 pb-4">立场与审美</h2>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              在废墟中保持乐观，在代码中酿造自由。追求极致的工程师逻辑，拒绝中式平庸。
              <br/><br/>
              精酿不仅是饮品，更是对抗熵增的实验。
            </p>
          </div>

          {/* 02 / 中栏：昨日成果展示 (The Still) */}
          <div className="lg:col-span-6 space-y-10">
            <p className="text-amber-700 font-mono text-[10px] tracking-[0.4em] uppercase text-center lg:text-left">
              02 / The Still (Daily Intelligence)
            </p>
            
            <div className="space-y-8">
              {newsData.length > 0 ? (
                newsData.map((item, index) => (
                  <article key={index} className="group relative p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                    <div className="absolute left-0 top-0 h-full w-1 bg-amber-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-gray-400 text-sm font-light leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                      <span>{item.source}</span>
                      <span>{item.time}</span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="py-20 text-center border border-dashed border-white/10 opacity-30">
                  <p className="text-xs uppercase tracking-widest animate-pulse font-mono">
                    [ Listening to Global Brewing Protocols... ]
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 03 / 右栏：变现入口 (The Flask) */}
          <div className="lg:col-span-3 sticky top-12 space-y-6 text-right lg:text-left">
            <p className="text-amber-700 font-mono text-[10px] tracking-[0.4em] uppercase">03 / The Flask</p>
            <h2 className="text-3xl font-bold tracking-tighter border-b border-white/10 pb-4">商业闭环</h2>
            <ul className="space-y-8">
              <li className="group cursor-pointer">
                <p className="text-[10px] text-gray-600 mb-1 font-mono uppercase tracking-widest">Protocol A</p>
                <h4 className="text-lg font-bold group-hover:text-amber-500 transition-colors">AI 酿造咨询</h4>
                <p className="text-xs text-gray-500 mt-1">针对 300L-500L 设备的数字化改造方案</p>
              </li>
              <li className="group cursor-pointer">
                <p className="text-[10px] text-gray-600 mb-1 font-mono uppercase tracking-widest">Protocol B</p>
                <h4 className="text-lg font-bold group-hover:text-amber-500 transition-colors">河鲜配酒定制</h4>
                <p className="text-xs text-gray-500 mt-1">B端供货：为饭店提供逻辑支撑的餐酒组合</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-700 tracking-[0.4em] uppercase font-mono">
          <p>© 2026 Craft Brew Rebound / Ver 1.0.4</p>
          <p className="text-amber-900/40 tracking-normal italic">Refining Logic in the Basement</p>
          <p>Handcrafted by AI Engineering</p>
        </div>
      </footer>
    </main>
  );
}