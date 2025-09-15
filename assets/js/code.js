(async () => {
  // 1) 先把 markdown 渲染到 DOM（如果你在 head 里已经渲染，这里可删）
  const md = document.getElementById('md-source');
  if (md) {
    const summary = document.getElementById('summary-md');
    summary.innerHTML = marked.parse(md.textContent.trim());
  }

  // 2) 确保 solidity 语言包已注册；若没有，动态加载一次备用源
  function hasSolidity(){ return !!(window.hljs && hljs.getLanguage && hljs.getLanguage('solidity')); }

  if (!hasSolidity()) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      // 备用源（你也可以换回 unpkg/jsDelivr 试试）
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/solidity.min.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    }).catch(e => console.warn('加载 solidity 语言包失败：', e));
  }

  console.log('hljs', hljs?.versionString, 'solidity?', hasSolidity());

  // 3) 强制用 solidity 高亮（最稳）
  document.querySelectorAll('pre code.language-solidity').forEach(code => {
    const raw = code.textContent;
    try {
      const { value } = hljs.highlight(raw, { language: 'solidity', ignoreIllegals: true });
      code.innerHTML = value;
      code.classList.add('hljs');
    } catch {
      // 兜底：自动识别
      const { value } = hljs.highlightAuto(raw);
      code.innerHTML = value;
      code.classList.add('hljs');
    }
  });

  // 4) 其它语言（可选）
  document.querySelectorAll('pre code:not(.hljs)').forEach(code => {
    const { value } = hljs.highlightAuto(code.textContent);
    code.innerHTML = value;
    code.classList.add('hljs');
  });
})();