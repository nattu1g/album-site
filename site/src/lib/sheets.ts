// Google Sheets データ取得ユーティリティ

const SPREADSHEET_ID = '1u3JFsMm7GwqCbmHFogGSuQhYtgBurAfRPj6hHpKoF9w';

// シート名とGID（各シートのID）のマッピング
// GIDはスプレッドシートのURLから取得できます
const SHEET_GIDS = {
    students: '0',           // studentsシートのGID
    events: '798336625',     // eventsシートのGID
    clubs: '1876304182',     // clubsシートのGID
    teachers: '1725552427',  // teachersシートのGID
};

export interface Student {
    id: string;
    name: string;
    class: string;
    photo_filename: string;
    tags: string[];
    comment: string;
    date: string;
}

export interface Event {
    id: string;
    title: string;
    category: string;
    photo_filename: string;
    tags: string[];
    comment: string;
    date: string;
}

export interface Club {
    id: string;
    club_name: string;
    photo_filename: string;
    tags: string[];
    comment: string;
    date: string;
}

export interface Teacher {
    id: string;
    name: string;
    subject: string;
    photo_filename: string;
    tags: string[];
    comment: string;
}

/**
 * CSVテキストをパースして配列に変換
 */
function parseCSV(csvText: string): string[][] {
    const lines = csvText.split('\n');
    return lines.map(line => {
        // タブ区切りまたはカンマ区切りに対応
        return line.split('\t').length > 1 ? line.split('\t') : line.split(',');
    }).filter(row => row.length > 1 && row[0].trim() !== '');
}

/**
 * タグ文字列を配列に変換
 */
function parseTags(tagString: string): string[] {
    if (!tagString || tagString.trim() === '') return [];
    return tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
}

/**
 * Google Sheetsからデータを取得
 */
async function fetchSheetData(sheetName: keyof typeof SHEET_GIDS): Promise<string[][]> {
    const gid = SHEET_GIDS[sheetName];
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=tsv&gid=${gid}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${sheetName} data: ${response.statusText}`);
        }
        const text = await response.text();
        return parseCSV(text);
    } catch (error) {
        console.error(`Error fetching ${sheetName} data:`, error);
        return [];
    }
}

/**
 * 生徒データを取得
 */
export async function getStudents(): Promise<Student[]> {
    const data = await fetchSheetData('students');
    if (data.length <= 1) return []; // ヘッダー行のみの場合

    // ヘッダー行をスキップして、データ行を処理
    return data.slice(1).map(row => ({
        id: row[0]?.trim() || '',
        name: row[1]?.trim() || '',
        class: row[2]?.trim() || '',
        photo_filename: row[3]?.trim() || '',
        tags: parseTags(row[4] || ''),
        comment: row[5]?.trim() || '',
        date: row[6]?.trim() || '',
    })).filter(student => student.id && student.name);
}

/**
 * イベントデータを取得
 */
export async function getEvents(): Promise<Event[]> {
    const data = await fetchSheetData('events');
    if (data.length <= 1) return [];

    return data.slice(1).map(row => ({
        id: row[0]?.trim() || '',
        title: row[1]?.trim() || '',
        category: row[2]?.trim() || '',
        photo_filename: row[3]?.trim() || '',
        tags: parseTags(row[4] || ''),
        comment: row[5]?.trim() || '',
        date: row[6]?.trim() || '',
    })).filter(event => event.id && event.title);
}

/**
 * 部活動データを取得
 */
export async function getClubs(): Promise<Club[]> {
    const data = await fetchSheetData('clubs');
    if (data.length <= 1) return [];

    return data.slice(1).map(row => ({
        id: row[0]?.trim() || '',
        club_name: row[1]?.trim() || '',
        photo_filename: row[2]?.trim() || '',
        tags: parseTags(row[3] || ''),
        comment: row[4]?.trim() || '',
        date: row[5]?.trim() || '',
    })).filter(club => club.id && club.club_name);
}

/**
 * 先生データを取得
 */
export async function getTeachers(): Promise<Teacher[]> {
    const data = await fetchSheetData('teachers');
    if (data.length <= 1) return [];

    return data.slice(1).map(row => ({
        id: row[0]?.trim() || '',
        name: row[1]?.trim() || '',
        subject: row[2]?.trim() || '',
        photo_filename: row[3]?.trim() || '',
        tags: parseTags(row[4] || ''),
        comment: row[5]?.trim() || '',
    })).filter(teacher => teacher.id && teacher.name);
}

/**
 * IDで生徒を検索
 */
export async function getStudentById(id: string): Promise<Student | null> {
    const students = await getStudents();
    return students.find(s => s.id === id) || null;
}

/**
 * IDでイベントを検索
 */
export async function getEventById(id: string): Promise<Event | null> {
    const events = await getEvents();
    return events.find(e => e.id === id) || null;
}

/**
 * IDで部活動を検索
 */
export async function getClubById(id: string): Promise<Club | null> {
    const clubs = await getClubs();
    return clubs.find(c => c.id === id) || null;
}

/**
 * IDで先生を検索
 */
export async function getTeacherById(id: string): Promise<Teacher | null> {
    const teachers = await getTeachers();
    return teachers.find(t => t.id === id) || null;
}
