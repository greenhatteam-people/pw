// JSON文件路径
const jsonFile = 'msg.json';

// 使用fetch获取JSON数据
fetch(jsonFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return response.json();
    })
    .then(data => {
        // 创建img元素并设置src
        const img = document.createElement('img');
        img.src = data.avatarURL; // 假设JSON中有imageUrl字段
        img.alt = data.altText || '图片描述';
        
        // 添加到页面
        document.getElementById('avatar').appendChild(img);

        // name
        const nameElement = document.getElementById('name');
        nameElement.textContent = data.name;
        nameElement.style.color = 'white';
    })
    .catch(error => {
        console.error('加载图片时出错:', error);
        document.getElementById('avatar').innerHTML = 
            '<p>图片加载失败</p>';
    });