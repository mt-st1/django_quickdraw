# django_quickdraw

[kaggleの落書きコンペ(QuickDraw)](https://www.kaggle.com/c/quickdraw-doodle-recognition)で作成したモデルを使ったデモアプリ

![demo](https://raw.githubusercontent.com/wiki/mt-st1/django_quickdraw/images/QuickdrawDemo.gif)

## 使用技術
- サーバ側: Django
- フロント側: React

## Requirements
- Python: 3.6.5
- Node: 10.8.0

## How to run
```
# 指定バージョンのPythonとNodeをインストール
pyenv install 3.6.5
nodenv install 10.8.0
# 必要なpythonパッケージをインストール
pip install -r requirements.txt
# yarnをインストール
npm install -g yarn
# フロントに必要なパッケージをインストール
yarn install
# マイグレート
python manage.py migrate
# Django開発サーバ起動 (ポート8080番)
python manage.py runserver 8080
# フロント開発サーバ(webpack-dev-server)起動
yarn run server
```
`http://localhost:8080`にアクセス
