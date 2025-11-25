# 卒業アルバム閲覧サイト

GitHub Pages で公開する卒業アルバム閲覧サイトです。

## 🎓 機能

- **パスワード認証**: サイトへのアクセスを制限
- **生徒一覧・詳細**: 約400名の生徒情報を表示
- **学校行事**: 体育祭・文化祭などの写真
- **部活動**: 部活動の活動記録
- **先生**: 先生方のプロフィール
- **ランダム表示**: ガチャ機能で楽しく閲覧
- **画像ズーム**: 詳細ページで画像を拡大表示
- **レスポンシブデザイン**: PC・スマホ両対応

## 🚀 技術スタック

- **フレームワーク**: Astro
- **ホスティング**: GitHub Pages
- **データ管理**: Google スプレッドシート
- **言語**: TypeScript, HTML, CSS

## 📁 プロジェクト構造

```
Album/
├── site/                      # Astroプロジェクト
│   ├── src/
│   │   ├── components/        # コンポーネント
│   │   │   └── Auth.astro    # パスワード認証
│   │   ├── lib/
│   │   │   └── sheets.ts     # スプレッドシート取得
│   │   └── pages/            # ページ
│   │       ├── index.astro   # トップページ
│   │       ├── students.astro # 生徒一覧
│   │       ├── events.astro  # 学校行事
│   │       ├── clubs.astro   # 部活動
│   │       ├── teachers.astro # 先生
│   │       └── random.astro  # ランダム表示
│   └── public/
│       └── images/           # 画像ファイル
│           ├── students/
│           ├── events/
│           ├── clubs/
│           └── teachers/
├── THIS_PROJECT.md           # 要件定義書
├── SPREADSHEET_SETUP.md      # スプレッドシート設定ガイド
├── DEPLOY.md                 # デプロイ手順
└── TODO.md                   # タスクリスト
```

## 🔧 ローカル開発

```bash
# 依存関係のインストール
cd site
npm install

# 開発サーバーの起動
npm run dev

# ブラウザで http://localhost:4321/ を開く
```

## 📊 データ管理

Google スプレッドシートでデータを管理しています。

- スプレッドシート設定: `SPREADSHEET_SETUP.md` を参照
- データを更新したら、サイトを再ビルドしてください

## 🚢 デプロイ

詳細は `DEPLOY.md` を参照してください。

```bash
# 変更をコミット
git add .
git commit -m "更新内容"

# プッシュ（自動的にデプロイされる）
git push
```

## 🔐 パスワード変更

`site/src/components/Auth.astro` の `CORRECT_PASSWORD` を変更してください。

## 📝 ライセンス

このプロジェクトは個人利用を目的としています。
