
window.MathJax = {
tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],   // 行内：$...$
    displayMath: [['$$','$$'], ['\\[','\\]']],  // 块级：$$...$$
    processEscapes: true
},
options: {
    skipHtmlTags: ['script','noscript','style','textarea','pre','code'] // 跳过代码块
}
};

