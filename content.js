function addCopyButtons() {
    setTimeout(() => {
        document.querySelectorAll(`code[class*="block-01"]`).forEach((codeBlock) => {
            if (codeBlock.parentElement?.classList?.contains("copy-wrapper")) return;

            const wrapper = document.createElement("div");
            wrapper.className = "copy-wrapper";
            wrapper.style.position = "relative";

            const copyBtn = document.createElement("button");
            copyBtn.innerText = "Copy";
            copyBtn.className = "copy-button";

            copyBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                    copyBtn.innerText = "Copied!";
                    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
                });
            });

            const parent = codeBlock.parentElement;
            parent.replaceChild(wrapper, codeBlock);
            wrapper.appendChild(codeBlock);
            wrapper.appendChild(copyBtn);
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
