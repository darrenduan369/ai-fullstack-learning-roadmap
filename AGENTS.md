# Project Rules

## Project
This is a TypeScript learning project.

## Goals
- Learn TypeScript fundamentals.
- Understand code before using AI-generated code.
- Prefer simple and readable solutions.
- Avoid unnecessary dependencies.

## Coding Rules
- Use TypeScript.
- Prefer const over let when possible.
- Use explicit types when they improve readability.
- Keep functions small and focused.
- Avoid any unless necessary.
- Use meaningful variable and function names.

## AI Rules
- Explain the solution before making large changes.
- Do not modify unrelated files.
- Do not add dependencies without explaining why.
- After making changes, explain what changed.
- If requirements are ambiguous, ask before implementing.

## Git Rules
- Keep commits small and meaningful.
- Do not modify Git history unless explicitly requested.
- Never use force push unless explicitly requested.

## Learning and Requirement Traceability / 学习与需求追溯

- Before handling project requests, read `docs/LEARNING-TRACE.md` and locate related lessons, symbols, issues, and requirement records; verify them against current code and Git state.
- 项目需求处理完成、部分完成或受阻时，主动更新 `docs/LEARNING-TRACE.md` 的需求索引和处理详情；学习讲解无代码变更时也记录结论。遵循文档中的编号、模板及维护流程，不需要用户重复提醒。
- 记录实际时间和时区、需求摘要、原因、修改文件/符号、验证结果、处理分支及提交信息；新增课程同步维护课程目录，修复旧问题回链相关记录。
- Distinguish verified evidence from inferred history. Never invent dates, original branch names, commit hashes/messages, or test results. Mark uncommitted work explicitly and backfill verified commit metadata in the next maintenance pass.
- Do not commit, amend, or rewrite Git history merely to fill this document. Keep existing IDs and historical evidence; update paths and links when code moves.
- After each lesson's code has been committed, update both `docs/LEARNING-TRACE.md` and `docs/TypeScript-Learning-Trace.docx`. Record the lesson date and time, branch, commit SHA, exact commit message, learning topics, changed files or symbols, and verification result. Regenerate and verify the DOCX navigation so it stays synchronized with the Markdown source.
- 每课代码提交完成后，必须同步更新 Markdown 主档和 DOCX 导航版；如果课程代码尚未提交，应先标记“待提交”，不得编造提交信息。提交完成后补录真实 SHA、时间、分支和 message，并确认两个文档内容一致。


# 项目规则

## 项目 这是一个TypeScript学习项目。

## 目标 
- 学习TypeScript基础知识。
- 在使用AI生成的代码之前，先要理解代码。
- 偏好简单易读的解决方案。
- 避免不必要的依赖。

## 编码规则 
- 使用TypeScript。
- 尽可能使用const而不是let。
- 当显式类型能提高可读性时，请使用它们。
- 保持函数简洁且功能集中。
- 除非必要，否则请避免。
- 使用有意义的变量和函数名称。

## AI规则 
- 在进行重大更改之前，先解释解决方案。
- 不要修改无关的文件。
- 不要在未解释原因的情况下添加依赖项。
- 做出更改后，解释更改的内容。
- 如果需求不明确，请在实施前询问清楚。

## Git 规则 
- 保持提交内容简洁且有意义。
- 除非有明确要求，否则不要修改Git历史记录。
- 除非有明确要求，否则切勿使用强制推送。
