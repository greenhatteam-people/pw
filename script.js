// JSON文件路径
const jsonFile = 'msg.json';
let p = 1;

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
    if (person.avatarURL) {
        const img = document.createElement('img');
        img.src = person.avatarURL; // 假设JSON中有imageUrl字段
        img.alt = person.altText || '头像';
        document.getElementById('avatar').innerHTML = '';
        document.getElementById('avatar').appendChild(img);

    // name
    if (person.name) {
        document.getElementById('name').textContent = person.name;
    }
    
        // sign
        const signElement = document.getElementById('sign');
        signElement.textContent = person.sign;
        signElement.style.color = 'white';
        signElement.style.fontStyle = 'italic';
    })
    .catch(error => {
        console.error('加载图片时出错:', error);
        document.getElementById('avatar').innerHTML = 
            '<p>图片加载失败</p>';
    })
}