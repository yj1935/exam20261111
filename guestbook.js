const form = document.querySelector('#guestbook-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email'); // 이메일 입력 요소 추가
const messageInput = document.querySelector('#message');
const notice = document.querySelector('#notice');
const list = document.querySelector('#list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');
let items = [];

// 안내 문구 초기화
function clearNotice() {
  notice.textContent = '';
}

// 방명록 목록 렌더링 함수
function showList() {
  list.innerHTML = '';

  for (let i = 0; i < items.length; i++) {
    const li = document.createElement('li');
    
    const textSpan = document.createElement('span');
    textSpan.textContent = items[i] + ' ';
    li.append(textSpan);

    // [필수 기능] 글 삭제 버튼
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = '삭제';
    removeButton.addEventListener('click', function () {
      items.splice(i, 1);
      showList();
    });

    li.append(removeButton);
    list.append(li);
  }

  count.textContent = `${items.length}개`;
  if (items.length === 0) {
    empty.textContent = '아직 남긴 글이 없습니다.';
  } else {
    empty.textContent = '';
  }
}

// [필수 기능] 글 추가 폼 제출 이벤트
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // 1. 이름 빈값 검사
  if (name === '') {
    notice.textContent = '이름을 입력하세요.';
    nameInput.focus();
    return;
  }

  // 2. 이메일 유효성 검사 (빈값 및 정규표현식 형식 검사)
  if (email === '') {
    notice.textContent = '이메일을 입력하세요.';
    emailInput.focus();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    notice.textContent = '올바른 이메일 형식을 입력하세요. (예: user@example.com)';
    emailInput.focus();
    return;
  }

  // 3. 메시지 빈값 검사
  if (message === '') {
    notice.textContent = '메시지를 입력하세요.';
    messageInput.focus();
    return;
  }

  clearNotice();
  items.push(`${name}(${email}): ${message}`); // 이름과 이메일을 함께 저장
  showList();
  form.reset();
  nameInput.focus();
});

// 입력창 입력 시 경고 메시지 지우기
nameInput.addEventListener('input', clearNotice);
emailInput.addEventListener('input', clearNotice);
messageInput.addEventListener('input', clearNotice);

// 초기 목록 표시
showList();