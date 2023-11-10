# Login-Form-Ts
ログインフォームの例をReact・TypeScriptで実現するプロジェクト。

## functions
・名前、パスワードを入力できる

・ログインボタンを押下すると、ログイン成功/失敗を判断する

・成功した場合：入力フォームの値は削除され、ログイン成功ページに遷移する

・失敗した場合：エラーメッセージ「ユーザIDもしくはパスワードが間違ってます!」を表示する

・バリデーションチェックをする

 →名前：3文字以上/必須、パスワード：6文字以上12文字以内/必須

・クリアボタンを押下すると、入力フォームの値は削除される

## environments
・React18

・TypeScript

・Jest

・React-hook-form

・zod

## TODO
#### UT

→Done

### deploy
・AWS EC2 or Amplify

・デプロイも自動化したい
