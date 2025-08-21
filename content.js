function addCopyButtonToBlock(codeBlock) {
    if (!codeBlock.classList?.contains("copy-wrapper")) {
        codeBlock.classList.add('copy-wrapper');
    }

    if (codeBlock.querySelector('.copy-button')) return;
    const copyBtn = document.createElement("button");

    copyBtn.innerText = "Copy";
    copyBtn.className = "copy-button";
    copyBtn.addEventListener("click", () => {
        const newCodeBlock = codeBlock.cloneNode(true);
        newCodeBlock.querySelector('.copy-button')?.remove();
        navigator.clipboard.writeText(newCodeBlock.innerText).then(() => {
            copyBtn.innerText = "Copied!";
            setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
        });
    });
    codeBlock.appendChild(copyBtn);
}

function addCopyButtons() {
    document.querySelectorAll(`code[class*="block-01"]`).forEach(addCopyButtonToBlock);
}

addCopyButtons();

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        // Handle added nodes (new code blocks)
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
                if (node.matches && node.matches('code[class*="block-01"]')) {
                    addCopyButtonToBlock(node);
                } else {
                    node.querySelectorAll && node.querySelectorAll('code[class*="block-01"]').forEach(addCopyButtonToBlock);
                }
            }
        });
        // Handle changes inside code blocks (text/content changes)
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
            let target = mutation.target;
            // If the target is a text node, get its parent
            if (target.nodeType === 3) target = target.parentNode;
            if (target && target.nodeType === 1 && target.matches && target.matches('code[class*="block-01"]')) {
                addCopyButtonToBlock(target);
            }
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});
