function containsBlockedWords(text) {
    const blockedRegex = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF]/;
    return blockedRegex.test(text);
}

// Paste Blocking
document.addEventListener('paste', function (e) {
    const target = e.target;

    const isEditable = (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
    );

    if (!isEditable) return;

    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;

    const pastedText = clipboardData.getData('text');

    if (containsBlockedWords(pastedText)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('Pasting special characters is not allowed.');
        setTimeout(() => {
            if (target.isContentEditable) {
                target.innerText = '';
            } else {
                target.value = '';
            }
        }, 0);
    }
}, true); // capture phase

// Typing Blocking
document.addEventListener('beforeinput', function (e) {
    const target = e.target;

    const isEditable = (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
    );

    if (!isEditable) return;

    if (containsBlockedWords(e.data || '')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('Typing special characters is not allowed.');
        setTimeout(() => {
            if (target.isContentEditable) {
                target.innerText = '';
            } else {
                target.value = '';
            }
            target.dispatchEvent(new Event("input", { bubbles: true }));
        }, 0);
    }
}, true); // capture phase
