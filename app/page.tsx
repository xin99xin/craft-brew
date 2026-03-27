'use client';

import { useEffect, useState } from 'react';
import { getSupabase, type AiDaily } from '@/lib/supabase';

export default function Home() {
  const [articles, setArticles] = useState<AiDaily[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const supabase = getSupabase();

      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('ai_daily')
        .select('*')
        .order('date', { ascending: false })
        .limit(10);

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    }

    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-8 py-24">
        <section className="mb-32">
          <h1 className="text-4xl font-light mb-8 tracking-tight">关于我</h1>
          <div className="space-y-6 text-lg leading-relaxed text-neutral-800">
            <p>
              你好，我是一名热爱技术的开发者，专注于构建优雅且实用的产品。
            </p>
            <p>
              我相信简洁的设计能够带来更好的用户体验，追求极简主义与功能性的平衡。
            </p>
            <p>
              在这里，我会分享关于 AI、技术和设计的思考。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-light mb-12 tracking-tight">AI 日报</h2>

          {loading ? (
            <div className="text-neutral-400">加载中...</div>
          ) : articles.length > 0 ? (
            <div className="space-y-16">
              {articles.map((article) => (
                <article key={article.id} className="group">
                  <time className="text-sm text-neutral-400 mb-3 block">
                    {new Date(article.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h3 className="text-2xl font-light mb-4 tracking-tight group-hover:text-neutral-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                    {article.content}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400">暂无文章</p>
          )}
        </section>
      </div>
    </main>
  );
}
