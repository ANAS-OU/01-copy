function addCopyButtons() {
    setTimeout(() => {
        document.querySelectorAll(`code[class*="block-01"]`).forEach((codeBlock) => {
            if (codeBlock.classList?.contains("copy-wrapper")) return;

            codeBlock.classList.add('copy-wrapper');

            const copyBtn = document.createElement("button");
            copyBtn.innerText = "Copy";
            copyBtn.className = "copy-button";

            copyBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                    copyBtn.innerText = "Copied!";
                    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
                });
            });

            codeBlock.appendChild(copyBtn);
        });
    }, 500);
}

addCopyButtons();

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            addCopyButtons();
            break;
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
