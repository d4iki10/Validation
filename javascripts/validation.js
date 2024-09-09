function emailValidation() {
  const form = document.getElementById("form");
  const email = form.email;
  const emailConfirm = form.email_confirm;
  const resetButton = form.querySelector("button[type='reset']");

  // リアルタイムでEメール入力を監視
  email.addEventListener("input", () => {
    checkEmailInput();
  });

  // リアルタイムでEメール確認を監視
  emailConfirm.addEventListener("input", () => {
    checkEmailMatch();
  });

  // リセットボタンが押されたときの処理
  resetButton.addEventListener("click", () => {
    // エラーメッセージを全て削除する
    removeErrorMessage(email);
    removeErrorMessage(emailConfirm);
  });

  // フォームが送信されるときのイベント処理
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // デフォルトの送信を止める

    // Eメールが入力されていない場合の処理
    if (email.value === "") {
      showErrorMessage(email, "Eメールを入力してください");
      return;
    }

    // Eメールが一致しない場合の処理
    if (email.value !== emailConfirm.value) {
      showErrorMessage(emailConfirm, "Eメールが一致しません");
    } else {
      // エラーメッセージも削除
      removeErrorMessage(email);
      removeErrorMessage(emailConfirm);
      // フォームの入力ページに戻る（ページをリフレッシュ）
      form.submit();
      window.location.reload();
    }
  });

  // Eメール入力チェック関数
  function checkEmailInput() {
    // Eメールが入力されたらエラーメッセージを削除
    if (email.value !== "") {
      removeErrorMessage(email);
    }
  }

  // Eメールが一致しているかチェックする関数
  function checkEmailMatch() {
    // すでにエラーメッセージがある場合は削除
    removeErrorMessage(emailConfirm);

    if (email.value !== emailConfirm.value) {
      showErrorMessage(emailConfirm, "Eメールが一致しません");
    }
  }

  // エラーメッセージを表示する関数
  function showErrorMessage(inputField, message) {
    // エラーメッセージがすでに表示されていない場合のみ追加
    if (
      !inputField.nextElementSibling ||
      !inputField.nextElementSibling.classList.contains("alert")
    ) {
      const errorElement = document.createElement("p");
      errorElement.textContent = message;
      errorElement.classList.add("alert");
      errorElement.style.fontSize = "16px";
      errorElement.style.backgroundColor = "#fff";
      errorElement.style.color = "#d14539";
      errorElement.style.padding = "0px";
      inputField.parentElement.appendChild(errorElement); // inputフィールドの親要素の下に追加
    }
  }

  // エラーメッセージを削除する関数
  function removeErrorMessage(inputField) {
    if (
      inputField.nextElementSibling &&
      inputField.nextElementSibling.classList.contains("alert")
    ) {
      inputField.parentElement.removeChild(inputField.nextElementSibling);
    }
  }
}

// ページ読み込み時にemailValidationを呼び出す
window.onload = emailValidation;
