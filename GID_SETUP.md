# Google Sheets GID 設定ガイド

## GID（シートID）とは？

GIDは各シート（タブ）に割り当てられる一意の識別番号です。スプレッドシートからデータを取得する際に必要になります。

---

## GIDの確認方法

### 1. 各シートのGIDを確認する

1. Google スプレッドシートを開く
2. 確認したいシート（タブ）をクリック
3. ブラウザのURLを確認

URLの形式:
```
https://docs.google.com/spreadsheets/d/1u3JFsMm7GwqCbmHFogGSuQhYtgBurAfRPj6hHpKoF9w/edit#gid=【ここがGID】
```

### 2. 各シートのGIDをメモする

以下の4つのシートのGIDを確認してください:

- **students** シート → GID: `_______`
- **events** シート → GID: `_______`
- **clubs** シート → GID: `_______`
- **teachers** シート → GID: `_______`

**注意**: 最初に作成したシート（通常は students）のGIDは `0` です。

---

## GIDの設定

確認したGIDを以下のファイルに設定します:

**ファイル**: `site/src/lib/sheets.ts`

```typescript
const SHEET_GIDS = {
  students: '0',    // ← studentsシートのGID
  events: '1',      // ← eventsシートのGID（確認した値に変更）
  clubs: '2',       // ← clubsシートのGID（確認した値に変更）
  teachers: '3',    // ← teachersシートのGID（確認した値に変更）
};
```

---

## 次のステップ

1. ✅ 各シートのGIDを確認
2. ✅ `site/src/lib/sheets.ts` のGIDを更新
3. ✅ ブラウザで http://localhost:4321/ にアクセスしてデータが表示されるか確認

---

## トラブルシューティング

### データが表示されない場合

1. **スプレッドシートの公開設定を確認**
   - 「リンクを知っている全員」が「閲覧者」になっているか確認

2. **GIDが正しいか確認**
   - 各シートのURLからGIDを再確認

3. **ブラウザのコンソールを確認**
   - F12キーを押して開発者ツールを開く
   - Console タブでエラーメッセージを確認
