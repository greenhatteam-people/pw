// JSON文件路径
let jsonFile = 'msg.json';
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
        let personIndex = p - 1;

        // 对吗?
        if (personIndex < 0 || personIndex >= dataArray.length) {
            throw new Error('这 ${p} 肯定不在 0 ~ ${dataArray.length} ');
        }

        // get
        let person = dataArray[personIndex];
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

    // mail-address
    document.getElementById('mail-address').textContent = person.mail || 'inorg-' + person.membershipCode + '@greenhat.dpdns.org';

    // 获取标签容器
    let tagContainer = document.querySelector('.tag');
    
    // 清空容器
    if (tagContainer) {
        tagContainer.innerHTML = '';
    }
    
    // sex
    if (person.sex === 'male' || person.sex === 'female') {
        let sexText;
        if (person.sex === 'male') {
            sexText = '男';
        } else if (person.sex === 'female') {
            sexText = '女';
        }
        let sexTag = document.createElement('span');
        sexTag.textContent = sexText;
        sexTag.className = 'tag-item';
        sexTag.style.cssText = `
            background: #292929;
            color: white;
            padding: 5px 10px;
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
        let ageTag = document.createElement('span');
        ageTag.textContent = person.age + '岁';
        ageTag.className = 'tag-item';
        ageTag.style.cssText = `
            background: #292929;
            color: white;
            padding: 5px 10px;
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
            let tag = document.createElement('span');
            tag.textContent = tagText;
            tag.className = 'tag-item';
            tag.style.cssText = `
                background: #292929;
                color: white;
                padding: 5px 10px;
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

    // responsibility
    let responsibilityDiv = document.getElementById('responsibility');
    responsibilityDiv.innerHTML = '';
    if (person.responsibilities && Array.isArray(person.responsibilities) && person.responsibilities.length > 0) {
        for (let i = 0; i < person.responsibilities.length; i++) {
            let p = document.createElement('p');
            p.textContent = person.responsibilities[i];
            responsibilityDiv.appendChild(p);
        }
    }
}