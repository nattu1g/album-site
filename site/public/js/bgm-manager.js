// BGM管理スクリプト
// ページ間でBGMを継続再生するための状態管理

class BGMManager {
    constructor() {
        this.audio = null;
        this.storageKey = 'album_bgm_state';
        this.updateInterval = null;
    }

    init(audioElement) {
        this.audio = audioElement;

        console.log('BGMManager init called');

        // 以前の再生状態を復元
        const savedState = this.loadState();
        console.log('Saved state:', savedState);

        if (savedState && savedState.isPlaying) {
            // 保存された位置から再生を再開
            this.audio.currentTime = savedState.currentTime || 0;
            this.audio.volume = savedState.volume || 0.5;
            console.log('Resuming from saved position:', savedState.currentTime);
        } else {
            // 初回アクセスまたは停止状態の場合、最初から再生
            this.audio.currentTime = 0;
            this.audio.volume = 0.5;
            console.log('Starting from beginning');
        }

        // 再生を試みる
        this.play();

        // 再生状態を定期的に保存
        this.startSaving();

        // ページを離れる前に状態を保存
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });

        // ページが非表示になる前に状態を保存（モバイル対応）
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.saveState();
            }
        });
    }

    play() {
        if (!this.audio) return;

        this.audio.play().catch(err => {
            console.log('BGM auto-play blocked. Will play on user interaction.');
            // 最初のクリックでBGMを再生
            const playOnClick = () => {
                this.audio.play();
                this.saveState();
                document.removeEventListener('click', playOnClick);
            };
            document.addEventListener('click', playOnClick);
        });
    }

    pause() {
        if (!this.audio) return;
        this.audio.pause();
        this.saveState();
    }

    startSaving() {
        // 1秒ごとに再生状態を保存
        this.updateInterval = setInterval(() => {
            if (this.audio && !this.audio.paused) {
                this.saveState();
            }
        }, 1000);
    }

    saveState() {
        if (!this.audio) return;

        const state = {
            isPlaying: !this.audio.paused,
            currentTime: this.audio.currentTime,
            volume: this.audio.volume,
            timestamp: Date.now()
        };

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save BGM state:', e);
        }
    }

    loadState() {
        try {
            const stateStr = localStorage.getItem(this.storageKey);
            if (!stateStr) return null;

            const state = JSON.parse(stateStr);

            // 5分以上前の状態は無視（セッションが切れたと判断）
            const fiveMinutes = 5 * 60 * 1000;
            if (Date.now() - state.timestamp > fiveMinutes) {
                return null;
            }

            return state;
        } catch (e) {
            console.error('Failed to load BGM state:', e);
            return null;
        }
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// グローバルに公開
window.BGMManager = BGMManager;
