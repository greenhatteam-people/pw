// JSON文件路径
const jsonFile = 'msg.json';
let p = Math.max(1, parseInt(new URLSearchParams(window.location.search).get('p')) || 1);

// 使用fetch获取JSON数据
fetch(jsonFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        return response.json();
    })
    .then(dataArray => {
        // 是数组?
        if (!Array.isArray(dataArray)) {
            throw new Error('这不是数组');
        }

        // 有东西?
        if (dataArray.length === 0) {
            throw new Error('没东西的数组');
        }

        // 算
        const personIndex = p - 1;

        // 对吗?
        if (personIndex < 0 || personIndex >= dataArray.length) {
            throw new Error('这 ${p} 肯定不在 0 ~ ${dataArray.length} ');
        }

        // get
        const person = dataArray[personIndex];
        updatePage(person);
    })
    .catch(error => {
        console.error('Error',error);
        showError(error.message);
    })
    
function updatePage(person) {
    // 头像
    let img = document.createElement('img');
    img.src = person.avatarURL || 'https://img.greenhat.dpdns.org/avatars/avatar.png';
    img.alt = '头像';
    document.getElementById('avatar').innerHTML = '';
    document.getElementById('avatar').appendChild(img);

    // name
    document.getElementById('name').textContent = person.name || '不愿透露姓名';
    
    // sign
    document.getElementById('sign').textContent = person.sign || '啥也没有';

    // 获取标签容器
    const tagContainer = document.querySelector('.tag');
    
    // 清空容器
    if (tagContainer) {
        tagContainer.innerHTML = '';
    }
    
    // sex
    if (person.sex) {
        let sexText = person.sex.toLowerCase().includes('male') ? '男' : '女';
        const sexTag = document.createElement('span');
        sexTag.textContent = sexText;
        sexTag.className = 'tag-item';
        sexTag.style.cssText = `
            background: #3498db;
            color: white;
            padding: 3px 5px;
            border-radius: 4px;
            font-size: 13px;
            display: inline-block;
            margin-right: 2px;
        `;
        
        if (tagContainer) {
            tagContainer.appendChild(sexTag);
        }
    }

    // age
    if (person.age !== null && person.age !== undefined) {
        const ageTag = document.createElement('span');
        ageTag.textContent = person.age + '岁';
        ageTag.className = 'tag-item';
        ageTag.style.cssText = `
            background: #2ecc71;
            color: white;
            padding: 3px 5px;
            border-radius: 4px;
            font-size: 13px;
            display: inline-block;
            margin-right: 2px;
        `;
        
        if (tagContainer) {
            tagContainer.appendChild(ageTag);
        }
    }

    // tags
    if (person.tags && Array.isArray(person.tags)) {
        person.tags.forEach(tagText => {
            const tag = document.createElement('span');
            tag.textContent = tagText;
            tag.className = 'tag-item';
            tag.style.cssText = `
                background: #e74c3c;
                color: white;
                padding: 3px 5px;
                border-radius: 4px;
                font-size: 13px;
                display: inline-block;
                margin-right: 2px;
            `;
            
            if (tagContainer) {
                tagContainer.appendChild(tag);
            }
        });
    }
}