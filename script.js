document.getElementById('format-button').addEventListener('click', () => {
    const inputText = document.getElementById('input').value;
    let formattedText;
    
    try {
        // 尝试格式化输入内容
        formattedText = js_beautify(inputText, { indent_size: 2 });
    } catch (e) {
        alert('格式化失败，请检查输入内容');
        return;
    }
    
    // 设置输出区域的内容
    document.getElementById('output').value = formattedText;
    // 启用下载按钮
    document.getElementById('download-button').disabled = false;
});

document.getElementById('copy-button').addEventListener('click', () => {
    const outputText = document.getElementById('output').value;
    navigator.clipboard.writeText(outputText).then(() => {
        alert('内容已复制到剪贴板');
    });
});

document.getElementById('clear-fields-button').addEventListener('click', () => {
    // 二次确认对话框
    if (confirm('您确定要清空所有内容吗？此操作无法撤销。')) {
        document.getElementById('input').value = '';
        document.getElementById('output').value = '';
        // 禁用下载按钮
        document.getElementById('download-button').disabled = true;
    }
});

document.getElementById('download-button').addEventListener('click', () => {
    const outputText = document.getElementById('output').value;

    if (outputText.trim() === '') {
        alert('请先格式化代码。');
        return;
    }

    let fileType = 'json';
    let fileName = 'formatted_output.json';

    try {
        // 尝试解析输出内容以判断其类型
        JSON.parse(outputText);
        fileType = 'json';
        fileName = 'formatted_output.json';
    } catch (e) {
        // 如果解析失败，假定为 JavaScript
        fileType = 'js';
        fileName = 'formatted_output.js';
    }
    
    // 创建下载链接并触发下载
    const blob = new Blob([outputText], { type: `application/${fileType}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('input').value = e.target.result;
        };
        reader.readAsText(file);
    }
});
