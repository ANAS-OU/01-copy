function addCopyButtons() {
    setTimeout(() => {
        document.querySelector('style').innerHTML += CODE_TAG_STYLES;
        document.querySelectorAll("pre>code").forEach((codeBlock) => {
            if (codeBlock.parentElement.classList.contains("copy-wrapper")) return;

            const wrapper = document.createElement("div");
            wrapper.className = "copy-wrapper";
            wrapper.style.position = "relative";

            const copyBtn = document.createElement("button");
            copyBtn.innerText = "Copy";
            copyBtn.style.position = "absolute";
            copyBtn.style.top = "5px";
            copyBtn.style.right = "5px";
            copyBtn.style.zIndex = "1000";
            copyBtn.style.padding = "2px 6px";
            copyBtn.style.fontSize = "12px";
            copyBtn.style.cursor = "pointer";

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
        })
    }, 1000);
}

document.addEventListener("DOMContentLoaded", addCopyButtons);

const CODE_TAG_STYLES = `
    pre {
        display: block;
        width: 100%;
        background: #534e57;
        color: #dcdcdc;
        padding: 1em;
        border-radius: 0.5em;
        font-family: "Fira Code", "Courier New", monospace;
        font-size: 0.95em;
        overflow-x: auto;
        position: relative;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        line-height: 1.5;
    }

    /* Scrollbar for code block */
    code::-webkit-scrollbar {
        height: 6px;
    }

    code::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 3px;
    }

    code::-webkit-scrollbar-track {
        background: #2c2c2c;
    }

    /* Optional: highlight syntax-like colors (basic) */
    code span.keyword {
        color: #569cd6;
    }

    code span.string {
        color: #ce9178;
    }

    code span.number {
        color: #b5cea8;
    }

    /* Add copy button styles if not inline */
    .copy-wrapper {
        position: relative;
    }

    .copy-wrapper button {
        background: #0e639c;
        color: white;
        border: none;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 4px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .copy-wrapper button:hover {
        background: #1177bb;
    }
`