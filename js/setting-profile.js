function editProfile(){
    document.getElementsByClassName('upload-file')[0].click();
}

let fileUpload = document.getElementsByClassName('upload-file')[0];

fileUpload.addEventListener('change', getImageFiles);

function getImageFiles(e){
    const file = e.currentTarget.files[0];
    console.log(file);

    if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return;
    }

    let parent = document.getElementsByClassName('profile-img')[0];
    let img = document.createElement('img');
    img.setAttribute("class", 'img');

    img.src = URL.createObjectURL(file); 
    parent.replaceChildren(img);
}
function settingProfile(){
    let urlParams = new URL(location.href).searchParams;
    let email = urlParams.get('email');
    console.log(email);

    const formData = new FormData();

    let file = document.getElementsByClassName('upload-file')[0].files[0];
    console.log(file);

    formData.append('profile', file);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    let nickname = document.getElementsByClassName('nickname-input')[0].value;

    if(nickname == '') return alert('input your nickname');

    axios.post(`${BASE_URL}/users/profile/img/${email}`, formData, config)
    .then(response => {
        console.log(response);
        alert('이미지 업로드 성공');
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('이미지 업로드 실패');
    });

    const req = {
        nickname: nickname
    }

    axios.post(`${BASE_URL}/users/profile/info/${email}`, req)
    .then(response => {
        window.location.href = '/index.html';
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('이미지 업로드 실패');
    });
}
