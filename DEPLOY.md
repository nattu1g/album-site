# GitHub Pages デプロイ手順

## 前提条件
- ✅ GitHub リポジトリ `album-site` を作成済み (Public)
- ✅ ローカルでサイトが正常に動作している

---

## 1. Astro 設定ファイルの更新

`site/astro.config.mjs` を開いて、`YOUR_GITHUB_USERNAME` を自分のGitHubユーザー名に変更してください。

```javascript
export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',  // ← ここを変更
  base: '/album-site',
});
```

例: ユーザー名が `tanaka` の場合
```javascript
site: 'https://tanaka.github.io',
```

---

## 2. Git の初期化とコミット

ターミナルで以下のコマンドを実行:

```bash
# Albumディレクトリに移動
cd /Volumes/DevStorage/web_env/Album

# Gitの初期化（まだの場合）
git init

# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: 卒業アルバムサイト"

# メインブランチ名を確認・変更
git branch -M main

# リモートリポジトリを追加（YOUR_GITHUB_USERNAMEを変更）
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/album-site.git

# プッシュ
git push -u origin main
```

---

## 3. GitHub Pages の設定

1. GitHub リポジトリページを開く: `https://github.com/YOUR_GITHUB_USERNAME/album-site`
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** セクションで:
   - Source: **GitHub Actions** を選択
5. 設定を保存

---

## 4. デプロイの確認

1. リポジトリの **Actions** タブを開く
2. ワークフローが自動的に実行されるのを確認
3. 緑色のチェックマークが表示されたら成功!
4. サイトURL: `https://YOUR_GITHUB_USERNAME.github.io/album-site/`

---

## 5. 今後の更新方法

ファイルを変更したら、以下のコマンドでデプロイ:

```bash
cd /Volumes/DevStorage/web_env/Album

# 変更をステージング
git add .

# コミット
git commit -m "更新内容の説明"

# プッシュ（自動的にデプロイされる）
git push
```

---

## トラブルシューティング

### デプロイが失敗する場合

1. **Actions タブでエラーログを確認**
   - ビルドエラーの詳細が表示されます

2. **ローカルでビルドテスト**
   ```bash
   cd /Volumes/DevStorage/web_env/Album/site
   npm run build
   ```
   エラーが出ないか確認

3. **GitHub Pages の設定を再確認**
   - Source が "GitHub Actions" になっているか

### サイトが表示されない場合

1. **URL を確認**
   - `https://YOUR_GITHUB_USERNAME.github.io/album-site/` (最後の `/` を忘れずに)

2. **パスワード認証画面が表示されるか確認**
   - 表示されれば成功!

3. **ブラウザのキャッシュをクリア**
   - Cmd + Shift + R (Mac) でハードリロード

---

## 注意事項

### 画像ファイルについて
- 実際の画像ファイルを `site/public/images/` に配置してからプッシュしてください
- 現在はサンプル画像のみが含まれています

### スプレッドシートについて
- スプレッドシートの公開設定を「リンクを知っている全員」のままにしてください
- データを更新したら、サイトを再ビルド（git push）する必要があります

### パスワードについて
- パスワードは `site/src/components/Auth.astro` で変更できます
- 変更後は git push でデプロイしてください

---

## 完了チェックリスト

- [ ] `astro.config.mjs` のユーザー名を変更
- [ ] Git の初期化とコミット
- [ ] GitHub にプッシュ
- [ ] GitHub Pages の設定 (Source: GitHub Actions)
- [ ] Actions タブでデプロイ成功を確認
- [ ] サイトURLにアクセスして動作確認
- [ ] パスワード認証が機能することを確認
- [ ] 実際の画像ファイルを配置（必要に応じて）
