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

    // sex
    if (person.sex) {
        const sexText = (person.sex === 'male' || person.sex === 'males') ? '男' : '女';
        const sexTag = document.createElement('div');
        sexTag.textContent = sexText;
        sexTag.style.cssText = `
            background: #3498db;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 13px;
            display: inline-block;
            margin-right: 5px;
        `;
        tagContainer.appendChild(sexTag);
    }

    // age
    if (person.age) {
        let ageText = person.age + '岁';
        createTag(ageText);
    }

    // tags
    if (person.tags && Array.isArray(person.tags)) {
        createArrayTags(person.tags);
    }
}

function createTag(value) {
    let container = document.createElement('div');
    container.style.cssText = `
        margin: 10px 0;
    `;
    container.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 2px;">  <!-- 间隙2px -->
            <div style="
                background: #1e1e1e;
                color: white;
                padding: 3px 5px;      /* 上下3px，左右5px */
                border-radius: 4px;    /* 小圆角 */
                font-size: 13px;
                line-height: 1.2;
                ">${value}</div>
        </div>
    `;
    document.body.appendChild(container);
}