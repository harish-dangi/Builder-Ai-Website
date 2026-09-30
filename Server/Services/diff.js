import crypto from "crypto";

export function hashContent(content) {
    return crypto.createHash("md5").update(content).digest("hex").slice(0, 12);
}
// Apply AI file operations (create, update, delete) to project files
export function applyOperations(currentFiles, operations) {
    console.log("========== APPLY OPERATIONS ==========");
    const files = { ...currentFiles };
    const applied = [];
    const errors = [];
    for (const op of operations) {
        try {
            switch (op.op) {
                // CREATE
                case "create": {
                    if (typeof op.content !== "string") {
                        errors.push(`create ${op.path}: missing content`);
                        break;
                    }
                    files[op.path] = op.content;
                    applied.push(`created ${op.path}`);
                    break;
                }
                // UPDATE
                case "update": {
                    const existing = files[op.path];
                    if (existing === undefined) {
                        errors.push(`update ${op.path}: file not found`);
                        break;
                    }
                    if (typeof existing !== "string") {
                        errors.push(
                            `update ${op.path}: existing file content is not a string`
                        );
                        break;
                    }
                    if (typeof op.search !== "string") {
                        errors.push(`update ${op.path}: missing search`);
                        break;
                    }
                    if (typeof op.replace !== "string") {
                        errors.push(`update ${op.path}: missing replace`);
                        break;
                    }
                    const newContent = searchReplace(
                        existing,
                        op.search,
                        op.replace
                    );
                    if (newContent === null) {
                        errors.push(
                            `update ${op.path}: search string not found`
                        );
                        break;
                    }
                    files[op.path] = newContent;
                    applied.push(`updated ${op.path}`);
                    break;
                }
                // DELETE
                case "delete": {
                    if (files[op.path] !== undefined) {
                        delete files[op.path];
                        applied.push(`deleted ${op.path}`);
                    } else {
                        errors.push(
                            `delete ${op.path}: file not found`
                        );
                    }
                    break;
                }
                // UNKNOWN
                default: {
                    errors.push(`unknown op: ${op.op}`);
                }
            }

        } catch (err) {
            console.error("[Diff] Operation failed:", op, err);
            errors.push(
                `${op.op} ${op.path}: ${err.message}`
            );
        }
    }
    const result = {
        files,
        applied,
        errors
    };
    console.log("========== REVISION RESULT ==========");
    console.log("Applied:", result.applied);
    console.log("Errors:", result.errors);
    console.log("Updated App.js:", result.files["/App.js"]);
    console.log("=====================================");
    return result;
}
// SEARCH + REPLACE
function searchReplace(content, search, replace) {
    // Safety check
    if (typeof content !== "string") {
        throw new Error("searchReplace: content must be a string");
    }
    if (typeof search !== "string") {
        throw new Error("searchReplace: search must be a string");
    }
    if (typeof replace !== "string") {
        throw new Error("searchReplace: replace must be a string");
    }
    // 1. EXACT MATCH
    if (content.includes(search)) {
        return content.replace(search, () => replace);
    }
    // 2. NORMALIZE WHITESPACE
    const normalizeWs = (text) =>
        text
            .split("\n")
            .map((line) => line.replace(/\s+/g, " ").trim())
            .join("\n")
            .trim();
    const normalizedContent = normalizeWs(content);
    const normalizedSearch = normalizeWs(search);
    if (normalizedContent.includes(normalizedSearch)) {
        const searchLines = normalizedSearch.split("\n");
        const contentLines = content.split("\n");
        for (let i = 0; i <= contentLines.length - searchLines.length; i++) {
            let match = true;
            for (let j = 0; j < searchLines.length; j++) {
                if (normalizeWs(contentLines[i + j]) !== searchLines[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                const before = contentLines.slice(0, i);
                const after = contentLines.slice(i + searchLines.length);
                return [...before, replace, ...after].join("\n");
            }
        }
    }
    return null;
}
