import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 强制 Next.js 每次请求都重新读取文件，确保实时性
export const revalidate = 0;

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), 'content/daily');
  
  // 确保文件夹存在
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // 使用 gray-matter 解析元数据（title, date）
      const { data, content } = matter(fileContents);

      return {
        date: data.date || fileName.replace(/\.md$/, ''),
        title: data.title || '无标题简报',
        content,
      };
    })
    // 按日期倒序排列，最新鲜的简报在最上面
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="min-h-screen bg-[#FFFDF5] text-[#2D2926] selection:bg-[#D4AF37]/30 font-sans">
      <div className="max-w-2xl mx-auto px-8 py-24 lg:py-32">
        
        {/* Header - 关于我 / 品牌 Slogan */}
        <section className="mb-32">
          <h1 className="text-3xl font-bold mb-10 tracking-tight">
            Craft Brew <span className="text-[#D4AF37]">.</span>
          </h1>
          <div className="space-y-6 text-lg leading-relaxed opacity-90">
            <p>你好，我是一名热爱技术的开发者，专注于构建优雅且实用的产品。</p>
            <p>我相信简洁的设计能够带来更好的用户体验，追求极简主义与功能性的平衡。</p>
            <p className="italic text-sm text-[#4F7942]">“去掉水份，留下干货。”</p>
          </div>
        </section>

        {/* AI 日报板块 */}
        <section>
          <div className="flex items-center justify-between mb-16 border-b border-[#2D2926]/5 pb-4">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#4F7942]">
              AI 日报 / Daily Brew
            </h2>
            <span className="text-[10px] opacity-40 uppercase">Update Daily</span>
          </div>

          {allPostsData.length > 0 ? (
            <div className="space-y-24">
              {allPostsData.map((post) => (
                <article key={post.date} className="group">
                  {/* 日期 - 啤酒花绿 */}
                  <time className="text-sm font-mono text-[#4F7942] mb-4 block opacity-80">
                    {post.date}
                  </time>
                  
                  {/* 标题 - 鼠标悬停变琥珀金 */}
                  <h3 className="text-2xl font-bold mb-8 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  {/* 内容渲染 - 保持高行间距 */}
                  <div className="text-[17px] leading-[2] space-y-6 opacity-95">
                    {post.content.split('\n').map((line, i) => {
                      if (!line.trim()) return null;
                      // 简单的加粗和列表转换逻辑
                      if (line.startsWith('*')) {
                        return (
                          <li key={i} className="list-none pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-[#D4AF37]">
                            {line.replace('*', '').trim()}
                          </li>
                        );
                      }
                      if (line.startsWith('###')) {
                        return <h4 key={i} className="text-xl font-bold pt-4 text-[#2D2926]">{line.replace('###', '')}</h4>;
                      }
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="opacity-40 italic">简报正在酿造中，请稍候...</p>
          )}
        </section>

        <footer className="mt-48 pt-12 border-t border-[#2D2926]/5 text-[11px] uppercase tracking-widest text-[#2D2926]/30 text-center">
          &copy; 2026 Craft Brew Lab / All Rights Reserved
        </footer>
      </div>
    </main>
  );
}

