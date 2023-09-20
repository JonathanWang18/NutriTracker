const uid = () => {
    let first = Date.now().toString(36).toLocaleUpperCase();
    let second = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
    second = second.toString(36).slice(0,12).padStart(12,'0').toLocaleUpperCase();
    return ''.concat(first,'-',second);
}

console.log(uid());
const IDB = (function init() {
    let db = null;
    let objectStore = null;
    const request = window.indexedDB.open("foodDB", 3);
    
    request.addEventListener('error', (err) => {
        console.warn(err);
    });
    
    request.addEventListener('success', (ev) => {
        db = ev.target.result;
        console.log("Successfully opened DB", db)
    })
    
    request.addEventListener('upgradeneeded', (ev) => {
        db = ev.target.result;
        let oldVersion = ev.oldVersion;
        let newVersion = ev.newVersion;
        console.log("Updated DB from " + oldVersion + " to " + newVersion); 
        console.log("Updated DB", db)
        if (!db.objectStoreNames.contains('foodStore')) {
            objectStore = db.createObjectStore('foodStore', {keyPath: 'listID'});
        }
    });
})


