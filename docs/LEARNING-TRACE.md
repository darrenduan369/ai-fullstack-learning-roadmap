# TypeScript 学习与需求追溯档案

建立时间：2026-09-08 16:35 +08:00（Asia/Shanghai）。历史代码基线：`8c71019`；当前工作分支：`main`。

## 目录

- [记录口径与分支证据](#scope)
- [Maintenance Rules](#maintenance-rules)
- [课程时间索引](#lessons)
- [每课内容与排查入口](#details)
- [Current Progress](#progress)
- [工程变更与其他提交](#history)
- [文件与问题检索](#lookup)
- [需求处理流水](#requests)
- [后续记录模板与维护流程](#maintenance)

<a id="scope"></a>
## 记录口径与分支证据

本档案根据本地 `git log --all`、提交差异、`git reflog --all` 和现有源码整理，覆盖当前可见的 31 条历史提交。此前完整聊天、正式上课起止时间和需求模板未保存在仓库中；课程标题和目标根据代码及提交还原。未提交内容明确标为“待提交”，已删除且 Git 不可见的内容不在覆盖范围内。

表内时间为 Git 作者时间，时区均为 `+08:00`；本次核对的课程提交中，作者时间与提交者时间相同。提交时间不代表上课开始或结束时间。历史验证结果没有可靠记录，不能由“已经提交”推断“测试通过”。

Git 提交对象本身不保存创建分支。下表分支标记含义：

- **M**：本地 `refs/heads/main` reflog 有该提交的创建或合并证据，记录发生分支为 `main`。
- **U**：原始提交分支未知；只能确认当前由 `main`、本地远程跟踪引用 `origin/main` 可达。
- **S**：会话基线检查点 `dc11aaf`，原始分支未知；独立记录，不当作新增课程。

`agents/codex` 当前指向 `a561b1d`，但 reflog 显示该分支在 2026-08-12 才从 `origin/main` 创建；`a561b1d` 实际在 2026-08-08 的 `main` 上提交。不能用当前包含分支反推历史创建分支。`origin/main` 是本地保存的远程跟踪状态，本次没有联网刷新。

<a id="maintenance-rules"></a>
## Maintenance Rules

- 本文件是项目学习记录的主档和后续维护基准；`docs/TypeScript-Learning-Trace.docx` 是语义同步的阅读版。
- 只记录实际完成的课程；计划主题不得标记为 Completed。保持既有课程编号稳定，除非用户明确要求，否则不合并、拆分或重编号已完成课程。
- 当前源码是实现细节的首要证据；用户明确提供的课程事实优先于 AI 推测。无法确认的内容必须标为未知，不得为了完整而补写。
- 文件重构或移动时更新当前路径，但不得用最终目录结构改写历史学习事实。更新某一课时避免重写无关课程。
- 明确区分“已学习概念”“当前实现”“临时实验”和“未来计划”。仅当临时实验实质帮助理解课程时才记录；已删除的演示不得描述为当前正式能力。
- 已引入但未被当前流程采用的概念，应写为“introduced / practiced”，不得描述为 fully implemented。例如仅定义但未用于当前请求流的类型需要明确说明。
- 描述应简洁、可验证，避免宽泛或宣传性措辞。每次维护前先核对实际源码路径、Git 状态与相关提交。
- Markdown 与 DOCX 必须保持课程编号、标题、状态、Current Progress、Next Lesson 和核心事实一致。
- 每次维护学习记录时，都要从当前 `HEAD` 枚举可达 Git 提交，并将课程索引未覆盖的新增提交实时增量补入“工程变更与其他提交”；不得只更新课程表。尚未提交的工作区改动不计入提交表，应在对应 REQ 中标为待提交。
- 不得在文档中暴露 API key、密码、token、凭据、真实 `.env` 值或其他秘密。可以记录 `.env.example` 及占位符，但不得复制本地 `.env` 内容。
- 源码结构可以演进，但课程历史必须保持时间顺序与事实稳定。
<a id="lessons"></a>
## 课程时间索引

以下每行对应一个学习单元；message 保留 Git 原始文本。L01～L15、L17～L18 的分支证据为 M（`main`）；L16 的 `ab7563f` 只在当前克隆的 `main` fast-forward 记录中可见，原始创建分支记为 U，`d51289d` 为 M。

| 编号 / 课程 | 提交时间（+08:00） | 提交 | 原始 message |
| --- | --- | --- | --- |
| [L01 基础类型与编译](#l01) | 2026-08-08 22:06:46 | `790923e` | init typescript project |
| [L02 B2B 产品目录](#l02) | 2026-08-13 21:23:52 | `9bad921` | feat: add B2B product catalog exercise |
| [L03 查找与可选属性](#l03) | 2026-08-15 17:28:11 | `163226a` | feat: add product lookup, stock status, and optional descriptions |
| [L04 不可变更新](#l04) | 2026-08-17 23:25:38 | `45890fb` | feat: practice immutable product updates |
| [L05 只读与常量推导](#l05) | 2026-08-19 23:23:16 | `a86b236` | feat: add readonly types and const-based type inference |
| [L06 泛型与字段工具](#l06) | 2026-08-22 22:08:53 | `d03121e` | feat: practice generics and type-safe object utilities |
| [L07 嵌套部分更新](#l07) | 2026-08-24 22:08:12 | `b69958d` | feat: add partial nested product updates |
| [L08 类型映射与字典](#l08) | 2026-08-29 18:59:24 | `eec57d1` | feat: practice Pick, Record, and readonly type mappings |
| [L09 参数与元组](#l09) | 2026-09-03 22:00:31 | `78c4afa` | feat: practice rest parameters, spread, destructuring, and tuples |
| [L10 函数重载与类型守卫](#l10) | 2026-09-05 19:18:36 | `beca5ae` | feat: add overloaded product search and runtime type validation |
| [L11 断言函数与自定义错误](#l11) | 2026-09-07 22:08:26；2026-09-12 18:03:39 | `8c71019`；`6e08a69` | feat: add product assertions and error handling practice；feat: practice TypeScript classes, interfaces, and abstract classes |
| [L12 接口、抽象类与多态](#l12) | 2026-09-12 18:03:39 | `6e08a69` | feat: practice TypeScript classes, interfaces, and abstract classes |
| [L13 继承、多态与组合](#l13) | 2026-09-16 11:02:40 | `1779069` | feat: practice inheritance, polymorphism, and composition |
| [L14 Promise、async/await 与异步错误处理](#l14) | 2026-09-17 17:53:42 | `4c72899` | feat: practice Promise, async await, and async error handling |
| [L15 Fetch API 与 HTTP 请求](#l15) | 2026-09-21 17:54:49 | `d1d3933` | feat: practice fetch requests, query params, POST, and PATCH |
| [L16 DELETE、PUT、可复用 HTTP 客户端与运行时校验](#l16) | 2026-09-21 21:10:01；2026-09-22 16:43:56 | `ab7563f`；`d51289d` | feat: add DELETE, PUT, and reusable HTTP request helper；feat: add typed HTTP client with runtime response validation |
| [L17 API 基础地址、环境变量与配置](#l17) | 2026-09-23 14:42:04 | `107d9b0` | feat: add environment-based API configuration |
| [L18 模块组织与 API 层重构](#l18) | 2026-09-23 17:21:40 | `fdfdb79` | refactor: organize project modules and update learning trace |

<a id="details"></a>
## 每课内容与排查入口

本节“复习检查”是建议的复验方法，不表示当时或本次已运行。日期、分支、提交 message 见上表。路径均指向当前文件；历史版本应使用提交哈希查看。所有课程的入口演示位于 `src/index.ts`，L01 原代码已被后续课程替换，其余大量演示目前被注释。本次课程汇总仅依据已提交到 `107d9b0` 的历史内容。

<a id="l01"></a>
### L01：基础类型与编译

- 学习目标：建立可编译运行的 TypeScript 项目，练习 `string`、`number`、函数参数与返回类型、模板字符串。
- 核心知识与代码实践：`name`、`age`、`sayHello(user: string): string`；`export {}` 将文件作为模块。`tsconfig.json` 设置严格检查、`src` 输入和 `dist` 输出；`package.json` 提供 build 命令。
- 代码定位：`src/index.ts`（历史版本）、`package.json`、`tsconfig.json`。
- 验证与预期：`git show 790923e:src/index.ts`；最初示例输出 `Hello Darren` 与 `Age: 18`。
- 排查重点：源码与编译产物不是同一个文件；年龄修改后来分别发生在两者上，见工程记录 E05、E06。

<a id="l02"></a>
### L02：B2B 产品目录

- 学习目标：把单文件练习拆为类型、数据、服务和入口，使用产品列表练习数组操作。
- 核心知识与代码实践：`Product` 接口、`Product[]`；`getFeaturedProducts`、`getProductsByCategory` 使用 `filter`；`calculateTotalInventoryValue` 用 `reduce` 累计单价乘库存。
- 代码定位：`src/types/product.ts`、`src/data/products.ts`、`src/services/productService.ts`、`src/index.ts`。该提交同时移除已跟踪的 `dist/index.js`。
- 验证与预期：分类过滤只保留目标分类；精选过滤只保留 `featured: true`；空数组库存价值为 0。
- 排查重点：分类字符串精确匹配；数据字段问题先查数据文件，再查类型和服务。

<a id="l03"></a>
### L03：查找、库存状态与可选描述

- 学习目标：处理产品不存在、描述缺失以及库存状态分支。
- 核心知识与代码实践：`getProductById` 返回 `Product | undefined`；`getProductNames` 使用 `map`；`description?: string`、`??` 回退；`StockStatus` 联合类型。
- 代码定位：服务中的 `getProductById`、`getProductNames`、`getStockStatus`；类型中的 `Product`、`StockStatus`；入口中的 `printProductDetails` 注释示例。
- 验证与预期：ID 999 返回 `undefined`；缺描述时显示回退文本；库存 0 → out-of-stock，1～5 → low-stock，6 → in-stock。
- 排查重点：当前负数库存也会进入 low-stock，尚无非负校验；这是现有行为，不是已确认的业务要求。

<a id="l04"></a>
### L04：排序与不可变更新

- 学习目标：修改返回的新数组或对象，保持传入数据不变。
- 核心知识与代码实践：`sortProductsByPrice` 先展开数组再排序；`updateProductStock`、`updateProductStockById` 更新库存；`Supplier` 和 `updateSupplierName` 引入嵌套对象复制。
- 代码定位：服务中的上述函数；类型中的 `SortDirection`、`Supplier`；数据中的 `supplier`。
- 验证与预期：升序、降序均不改变原数组顺序；目标产品是新引用，未修改产品保留原引用；改供应商名称后原名称不变。
- 排查重点：展开运算只做浅复制；修改 `supplier` 必须同时复制该层对象。

<a id="l05"></a>
### L05：readonly、as const 与 satisfies

- 学习目标：通过类型约束减少直接修改，从常量推导可用值。
- 核心知识与代码实践：服务参数采用 `readonly Product[]`、`Readonly<Product>`；`STOCK_STATUSES`、`SORT_DIRECTIONS` 使用 `as const` 和 `(typeof ...)[number]`；入口演示 `satisfies SortConfig`；新增 `updateSupplierNameById`。
- 代码定位：类型中的两个常量数组及对应联合类型；服务中的只读参数与按 ID 更新函数。
- 验证与预期：只读数组不能直接 `push`；通过新数组返回更新；无匹配 ID 时元素保持原引用。
- 排查重点：`readonly` 是编译期约束，不等于运行时冻结；`Readonly<Product>` 本身是浅层的。嵌套供应商只读声明在 L06 加入。

<a id="l06"></a>
### L06：泛型、keyof 与索引访问类型

- 学习目标：读取或更新字段时，让字段名和值类型关联。
- 核心知识与代码实践：`ProductKey = keyof Product`；`getProductField<K extends keyof Product>` 返回 `Product[K]`；通用 `getField<T, K extends keyof T>` 与 `updateField`；`supplier: Readonly<Supplier>`。本课还加入使用 `Partial<Product>` 的浅层 `updateProduct`。
- 代码定位：`src/utils/objectUtils.ts`；服务中的 `getProductField`；类型中的 `ProductKey`。
- 验证与预期：读 price 得到 number，读 description 得到 string 或 undefined；错误键名、给 stock 传字符串应产生类型错误。
- 排查重点：本课浅层 `updateProduct` 在 L07 改名为 `updateProductWithoutSupplier`；当前同名 `updateProduct` 已是另一套嵌套合并实现，追溯时需按提交区分。

<a id="l07"></a>
### L07：Partial、Omit 与嵌套合并

- 学习目标：只提供需要修改的字段，修改供应商名称时保留国家。
- 核心知识与代码实践：`ProductChanges = Partial<Omit<Product, "supplier">> & { supplier?: Partial<Supplier> }`；`updateSupplier` 合并供应商；新版 `updateProduct` 对 supplier 单独处理。
- 代码定位：类型中的 `ProductChanges`；服务中的 `updateProductWithoutSupplier`、`updateSupplier`、`updateProduct`。
- 验证与预期：仅更新 stock 时保留供应商引用；更新 supplier.name 时创建新供应商且 country 不丢失；原产品不变。
- 排查重点：`Partial` 不会自动递归；当前 `updateProductWithoutSupplier` 名称虽含 WithoutSupplier，类型仍是 `Partial<Product>`，实际仍允许传完整 supplier 做浅替换。

<a id="l08"></a>
### L08：Pick、Record 与只读映射

- 学习目标：生成精简卡片、分类数量和 ID 索引，并约束状态文案完整性。
- 核心知识与代码实践：`ProductCard` 使用 `Pick`；`toProductCard`、`toProductCards` 映射卡片；`countProductsByCategory` 返回 `Record<string, number>`；`createProductMap` 返回 `Partial<Record<number, Product>>`；`STOCK_STATUS_LABELS` 组合 `as const satisfies Readonly<Record<StockStatus, string>>`。
- 代码定位：类型中的 `ProductCard`、`STOCK_STATUS_LABELS`；服务中的上述四个函数。
- 验证与预期：卡片仅含 id/name/price/featured；各分类计数之和等于产品总数；不存在的 ID 用 `?.`、`??` 处理。
- 排查重点：ID 重复会由后者覆盖前者；字典声明不保证任意键运行时都有值。

<a id="l09"></a>
### L09：剩余参数、展开、解构与元组

- 学习目标：组合筛选条件、汇总不定数量参数，并返回成对价格。
- 核心知识与代码实践：`filterProducts` 对参数解构，提供默认对象和 `featuredOnly = false`；`calculateSelectedStock(...products)`、`sum(...numbers)`；`getPriceRange` 返回 `[number, number]`；入口演示属性改名、剩余属性、数组解构。
- 代码定位：服务中的三个函数；工具中的 `sum`；类型中的 `ProductFilterOptions` 和 `PriceRange`。
- 验证与预期：不传筛选条件时保留全部产品；minPrice 为 0 时仍参与判断；空参数求和为 0；价格对顺序是最小值、最大值。
- 排查重点：当前 `getPriceRange([])` 返回 `[Infinity, -Infinity]`；声明的只读命名元组 `PriceRange` 未导出、未用于该函数，函数实际返回可变元组。

<a id="l10"></a>
### L10：函数重载与类型守卫

- 学习目标：让同一个查询函数根据不同参数返回不同类型，并安全处理来自外部的 `unknown` 数据。
- 核心知识：函数重载签名与实现签名；`typeof` 分支缩小；`value is Product` 类型谓词；`find` 与 `filter` 返回值差异；字符串 `includes` 查询。
- 代码实践：`findProduct` 按 ID 或完整名称返回单个产品；`searchProduct` 接收数字、关键词或 `ProductSearchOptions`；`isProduct` 在运行时判断对象形状。
- 代码定位：`src/services/productService.ts` 中的 `findProduct`、`searchProduct`、`isProduct`；`src/types/product.ts` 中的 `ProductSearchOptions`；`src/index.ts` 中对应调用示例。
- 验证与预期：数字 999 返回 `undefined`；关键词 `Light` 返回数组；选项对象可以组合分类和精选条件；守卫通过后 TypeScript 允许访问产品属性。
- 排查重点：实现签名必须覆盖所有重载；调用者只看到重载签名。当前 `isProduct` 只检查 id、name、price 三个键是否存在，没有检查字段类型及其余必填字段，见 Q01。

<a id="l11"></a>
### L11：断言函数、自定义错误与必需查询

- 学习目标：理解“返回 undefined”和“抛出异常”两种失败策略，并使用专门的错误类型携带业务上下文。
- 核心知识：`asserts value is Product` 断言签名；`throw`、`try/catch/finally`；`error instanceof Error`；继承内置 `Error`；通过 `name` 和只读字段区分错误类型。
- 代码实践：`assertIsProduct` 在校验失败时抛错；后续新增 `ProductValidationError`、带 `productId` 的 `ProductNotFoundError`，以及保证返回 `Product` 或抛错的 `getRequiredProductById`。
- 代码定位：`src/services/productService.ts` 中的三个错误/查询符号；`src/index.ts` 中的异常捕获示例。
- 提交状态：基础断言与异常处理由 `8c71019` 提交；自定义错误和必需查询扩展随 `6e08a69` 提交。
- 验证与预期：ID 999 应抛出 `ProductNotFoundError`，捕获后可以读取 `error.productId`；断言失败应抛出 `ProductValidationError`；`finally` 无论成功失败都会执行。
- 排查重点：自定义 Error 子类需正确调用 `super` 并设置 `name`；断言的可靠性完全依赖 `isProduct`，Q01 未修复前仍可能接受字段类型错误的数据。

<a id="l12"></a>
### L12：类、接口、抽象类、继承与多态

- 学习目标：从数据接口过渡到带行为的对象模型，理解封装、契约、继承和多态各自解决的问题。
- 核心知识：构造函数参数属性；`public`、`private`、`protected`、`readonly`；`implements`；结构化类型兼容；`abstract class` 与抽象方法；`extends`、`super`；基类数组中的动态方法调用。
- 代码实践：`ProductEntity` 实现 `Sellable` 与 `StockManageable`，用 private stock 封装库存并拒绝负库存；普通对象只要具有 `getPrice(): number` 也能赋给 `Sellable`；`PhysicalProduct` 和 `DiscountProduct` 继承 `BaseProduct`，分别实现原价与折后价。
- 代码定位：`src/models/ProductEntity.ts`、`src/models/BaseProduct.ts`、当前的 `src/types/contracts.ts`；本课提交时该接口文件名仍为 `constracts.ts`。入口演示位于 `src/index.ts`。
- 本次验证：2026-09-12 运行 `npm.cmd run build` 编译通过；运行 `node dist/index.js` 输出 `1 - LED Light 100` 和 `2 - Speaker 160`，证明同一 `BaseProduct[]` 会调用不同子类的 `getPrice` 实现。
- 提交状态：第 12 课代码已在 `main` 通过 `6e08a69` 提交，完整 message 为 `feat: practice TypeScript classes, interfaces, and abstract classes`。
- 排查重点：private 和 protected 只提供 TypeScript 层面的访问约束；折扣率当前没有限制在 0～1；文件名 `constracts.ts` 的拼写偏差已在 L13 随 `1779069` 更名并同步引用，见 Q09；折扣率边界仍未处理。

<a id="l13"></a>
### L13：继承、多态与组合

- **Learning Goals：**理解 `extends`、`super()`、`override`、抽象基类与子类；通过基类引用观察运行时多态；比较继承与组合，并练习 Strategy 风格设计。
- **Key Concepts：**base class、subclass、abstract class、interface、concrete class、polymorphism、composition、Strategy pattern。
- **Practice / Implementation：**基于 `BaseProduct` 创建 `PhysicalProduct` 与 `DiscountProduct`；使用 `BaseProduct[]` 保存不同子类，并通过基类引用调用重写后的 `getPrice()` / `getDisplayName()`；定义 `PricingStrategy`，实现 `NormalPricing` 与 `DiscountPricing`，比较继承的 is-a 与组合的 has-a / uses-a 关系。
- **Important Notes：**组合允许定价行为独立替换，通常比继续扩展继承层次更灵活。本课还将历史拼写 `constracts.ts` 修正为 `contracts.ts`，但文件更名不改变课程知识点。
- **Main Takeaway：**继承适合表达稳定的 is-a 关系；业务行为需要独立替换时，优先考虑组合。
- **Related Project Files：**`src/models/BaseProduct.ts`、`src/models/ProductEntity.ts`、`src/types/contracts.ts`。
- **提交与验证：**`1779069`，2026-09-16 11:02:40 +08:00，`main`；message：`feat: practice inheritance, polymorphism, and composition`。历史提交未保存独立运行结果；当前整体验证见 REQ-20260924-01。
- **Status：Completed。**

<a id="l14"></a>
### L14：Promise、async/await 与异步错误处理

- **Learning Goals：**理解异步编程与 Promise 生命周期；使用 `async` / `await`；处理异步失败和清理逻辑。
- **Key Concepts：**`Promise<T>`、pending、fulfilled、rejected、`resolve`、`reject`、`.then()`、`.catch()`、`async`、`await`、`try/catch/finally`。
- **Practice / Implementation：**`waitForMessage(): Promise<string>` 使用 `setTimeout()` 模拟异步任务；`fetchProductById` 与 `fetchProductMessage` 分别练习成功和拒绝路径；入口示例通过 `.then()` 和 `await` 解包结果，并用 `try/catch/finally` 处理错误与加载状态。
- **Important Notes：**`await` 只暂停当前 async 函数，不阻塞整个 JavaScript 运行时；async 函数始终返回 Promise。当前 CommonJS 学习配置不支持直接使用 top-level await，因此示例封装在 async 函数中。当前入口里的异步演示已注释，不属于正在自动运行的功能。
- **Main Takeaway：**Promise 描述未来结果，`async` / `await` 让异步控制流更接近同步写法，但 rejected 状态仍必须显式处理。
- **Related Project Files：**`src/async/asyncDemo.ts`、`src/services/productService.ts`、`src/index.ts`。
- **提交与验证：**`4c72899`，2026-09-17 17:53:42 +08:00，`main`；message：`feat: practice Promise, async await, and async error handling`。历史定时器示例的运行输出未保存。
- **Status：Completed。**

<a id="l15"></a>
### L15：Fetch API 与 HTTP 请求

- **Learning Goals：**调用真实 HTTP API，理解 `fetch()`、`Response` 与 JSON 解析；练习 GET、查询参数、POST、PATCH，并校验外部数据。
- **Key Concepts：**`fetch()`、`Promise<Response>`、`response.status`、`response.ok`、`response.json()`、`unknown`、Type Guard、`URLSearchParams`、query string、`JSON.stringify()`、`Content-Type`。
- **Practice / Implementation：**以 JSONPlaceholder 为练习 API；GET `/todos/1` 与 `/todos`；用 `Todo`、`isTodo`、`isTodoArray` 校验单条和列表响应；用 `TodoQuery` 与 `URLSearchParams` 组合 `userId` / `completed`；用 `CreateTodoInput = Omit<Todo, "id">` 组织 POST；用 `UpdateTodoInput = Partial<Pick<Todo, "title" | "completed">>` 组织 PATCH。
- **Important Notes：**查询 `completed` 必须判断 `query.completed !== undefined`，因为 `false` 是有效值。JSONPlaceholder 当前返回原始 Todo JSON，不返回 `{ code, message, data }`；`ApiResponse<T>` 不能被描述为当前 Todo 请求的真实响应结构。
- **Main Takeaway：**`fetch → Response → JSON → unknown → Type Guard → typed data`；TypeScript 声明不能替代运行时响应校验。
- **Related Project Files：**当前路径为 `src/api/todoApi.ts`、`src/types/todo.ts`、`src/validators/todoValidator.ts`、`src/api/productApi.ts`；本课提交时 Todo 示例集中在历史文件 `src/api/httpDemo.ts`。
- **提交与验证：**`d1d3933`，2026-09-21 17:54:49 +08:00，`main`；message：`feat: practice fetch requests, query params, POST, and PATCH`。本次未向公共 API 发起写请求。
- **Status：Completed。**

<a id="l16"></a>
### L16：DELETE、PUT、可复用 HTTP 客户端与运行时校验

- **Learning Goals：**补齐常见 REST 方法；理解 204 No Content、PUT 与 PATCH；抽取可复用请求逻辑；组合泛型与运行时校验。
- **Key Concepts：**DELETE、PUT、PATCH、204 No Content、`request<T>()`、`Validator<T>`、generic type parameter、function reference、Type Guard、runtime validation、`as T` 的限制。
- **Practice / Implementation：**练习 DELETE `/todos/:id`，理解 204 响应可能没有 JSON body；用 `ReplaceTodoInput` 练习 PUT 完整替换，并与 PATCH 部分更新比较；创建 `src/api/httpClient.ts`，将请求、状态检查、JSON 解析与验证器调用集中到 `request<T>()`。

```ts
export type Validator<T> = (value: unknown) => value is T;

request<Todo>("/todos/1", isTodo);
```

- **Important Notes：**`Validator<T>` 是验证函数契约，`isTodo` 是 Todo 的具体实现；传递 `isTodo` 是传函数本身，`isTodo(data)` 是执行后的布尔结果。`<T>` 表示编译期预期，validator 才执行运行时验证；`as T` 只要求 TypeScript 信任开发者，不能验证 JSON。课程中曾故意用 `isTodoArray` 校验单条 Todo，触发 `Invalid response data`；这是理解边界的临时实验，不是当前正式功能。Zod 尚未正式引入或采用。
- **Current Implementation：**当前 `request<T>` 会校验 `response.ok`、解析 JSON 并调用 validator；DELETE 仍由 `todoApi.ts` 单独处理，因此通用请求函数当前没有承担 204 无响应体分支。
- **ApiResponse<T>：**`src/types/api.ts` 引入了通用响应包装概念，可供未来 Java 后端或其他 API 使用；当前 JSONPlaceholder Todo 流程并未采用它。
- **Main Takeaway：**静态泛型和运行时验证解决不同问题，可靠的外部数据边界需要两者共同工作。
- **Related Project Files：**`src/api/httpClient.ts`、`src/api/todoApi.ts`、`src/types/todo.ts`、`src/validators/todoValidator.ts`、`src/types/api.ts`。
- **提交与验证：**`ab7563f`（2026-09-21 21:10:01 +08:00，原始创建分支未知）与 `d51289d`（2026-09-22 16:43:56 +08:00，`main`）；对应 messages 为 `feat: add DELETE, PUT, and reusable HTTP request helper`、`feat: add typed HTTP client with runtime response validation`。
- **Status：Completed。**

<a id="l17"></a>
### L17：API 基础地址、环境变量与配置

- **Learning Goals：**移除重复的硬编码完整 URL；分离配置与业务逻辑；理解 Node 环境变量、不同环境配置和本地配置保护。
- **Key Concepts：**base URL、`process.env`、`string | undefined`、Fail Fast、`@types/node`、`.env`、`.env.example`、配置链。
- **Practice / Implementation：**`src/config/apiConfig.ts` 集中读取 `API_BASE_URL`，缺失时立即抛错；`request()` 接收 path 并与基础地址拼接；安装 `@types/node`，`tsconfig.json` 使用 `"types": ["node"]`；`package.json` 保留 `build: tsc` 与 `start: node --env-file=.env dist/index.js`。

```text
.env → process.env.API_BASE_URL → apiConfig.ts
→ API_BASE_URL → httpClient.ts → path → final URL
```

- **Important Notes：**Windows PowerShell 可能阻止 `npm.ps1`，本项目可使用 `npm.cmd run build` / `npm.cmd start`。`.env` 已由 `.gitignore` 排除；`.env.example` 可以记录变量名和占位模板。环境变量不天然等于秘密：API base URL、公开项目 ID 通常可公开，API key、密码、token 与数据库秘密必须保护。文档从不读取或复制真实 `.env` 值。
- **Future Boundary：**当前 Node 项目使用 `process.env`；Astro / Vite 可能使用 `import.meta.env`，但尚未在本项目实现，不能标为已开始。
- **Main Takeaway：**配置应集中、可验证并与业务逻辑解耦；缺失必要配置时应尽早失败。
- **Related Project Files：**`src/config/apiConfig.ts`、`src/api/httpClient.ts`、`.env.example`、`.gitignore`、`package.json`、`package-lock.json`、`tsconfig.json`。
- **提交与验证：**`107d9b0`，2026-09-23 14:42:04 +08:00，`main`；message：`feat: add environment-based API configuration`。
- **Status：Completed。**

<a id="l18"></a>
### L18：模块组织与 API 层重构

- **Learning Goals：**应用单一职责与关注点分离；建立模块边界；组织 import/export；降低耦合、避免循环依赖，并形成更真实的项目结构。
- **Key Concepts：**single responsibility、module boundary、`import`、`import type`、explicit export、barrel export、dependency direction、circular dependency、naming convention、refactoring。
- **Practice / Implementation：**将 Todo 类型拆到 `types/todo.ts`，Todo 校验拆到 `validators/todoValidator.ts`，Todo HTTP 函数移动到 `api/todoApi.ts`；把产品校验和两种自定义错误分别移动到 validators/errors；新增 `api/index.ts`、`types/index.ts`、`validators/index.ts`、`errors/index.ts` 作为显式 barrel 入口；入口改为从 `./api` 与 `./validators` 导入。
- **Import Boundary：**`import type` 只参与编译期类型检查，普通 import 会保留运行时值/函数/类依赖。barrel export 提供稳定的模块公共入口；当前 barrel 使用显式导出，没有滥用 `export *`。
- **Dependency Direction：**目标方向为 `types → validators → api / services → index / consumer`，配置方向为 `config → httpClient`；应避免 api ↔ validator、service ↔ index、types → api 以及循环依赖。
- **Important Notes：**重构的目标是行为不变、结构改善；当前文件职责已更清晰，但仍有可核实边界：`fetchTodosByQuery`、`updateTodo`、`deleteTodo`、`replaceTodo` 仍直接使用相对 URL；`productValidator.ts` 的 `isProduct` 仍只检查字段存在性，尚未完整校验必填字段类型；`ApiResponse<T>` 仅定义、未用于当前 Todo 请求流。
- **Verified Conflict：**重构前 `ProductNotFoundError` 暴露只读 `productId`，当前提取后的 `src/errors/ProductNotFoundError.ts` 只接收 `id` 构造 message，没有保留该公开字段。因此不能把这次提交描述为完全行为等价；文档保留此事实，不自行修改源码。
- **Main Takeaway：**模块化重构通过清晰职责和单向依赖降低维护成本；目录变整齐不等于自动保证运行时行为完全不变，仍需回归验证。
- **Related Project Files：**`src/api/index.ts`、`src/api/todoApi.ts`、`src/api/httpClient.ts`、`src/types/index.ts`、`src/types/todo.ts`、`src/validators/index.ts`、`src/validators/todoValidator.ts`、`src/validators/productValidator.ts`、`src/errors/index.ts`、`src/errors/ProductNotFoundError.ts`、`src/errors/ProductValidationError.ts`、`src/services/productService.ts`、`src/index.ts`。
- **提交与验证：**`fdfdb79`，2026-09-23 17:21:40 +08:00，`main`；message：`refactor: organize project modules and update learning trace`。当前整体验证见 REQ-20260924-01。
- **Status：Completed。**

<a id="progress"></a>
## Current Progress

- **Current Lesson：**Lesson 18 completed。
- **Current Stage：**TypeScript fundamentals → OOP → async programming → HTTP/API integration → runtime validation → environment configuration → project modularization。
- **Next Lesson：**Lesson 19 — Discriminated Unions and UI / Async State Modeling。
- **Planned Focus：**loading、success、error、discriminated union、state modeling。
- **Next Lesson Status：Planned。**Lesson 19 尚未完成，本次未实现其代码，也未将未来主题写入 L18。

<a id="history"></a>
## 工程变更与其他提交

本表补齐课程表之外的 13 条提交。历史修复只按差异描述，不猜测对话中的原因或验收结果。每次文档维护均应以当前 `HEAD` 重新核对 Git 历史并增量更新本表。

| 编号 | 时间（+08:00） | 提交 / 分支证据 | 原始 message | 内容与定位 |
| --- | --- | --- | --- | --- |
| E01 | 2026-08-08 17:24:20 | `dd1d214` / U | Add initial README.md with personal and tech details | README 个人信息与技术路线 |
| E02 | 2026-08-08 17:28:28 | `c7f5f3f` / U | chore: add gitignore configuration | `.gitignore` 初始忽略规则 |
| E03 | 2026-08-08 17:31:20 | `087d75b` / U | docs: add MIT license | LICENSE |
| E04 | 2026-08-08 22:15:24 | `274cd44` / M | merge remote repository | 合并本地项目与远程历史；逐父提交检查差异 |
| E05 | 2026-08-08 23:27:59 | `a561b1d` / M | fix: update age from 18 to 118 | `src/index.ts` 年龄 18 → 118；当前 agents/codex 指向此处 |
| E06 | 2026-08-12 13:18:53 | `cbb91f0` / M | fix: update age from 18 to 118 | `dist/index.js` 年龄 18 → 118；与 E05 同 message、不同文件 |
| E07 | 2026-08-12 17:34:07 | `dc11aaf` / S | Agent host session e7fadc89-a712-40c5-bbe0-91878b84f929 - baseline checkpoint | 会话基线快照，含源码、配置等 8 个文件；不重复计课 |
| E08 | 2026-08-12 17:43:06 | `4856141` / M | chore: add Codex project instructions | 新建 AGENTS.md |
| E09 | 2026-08-12 22:52:14 | `a874448` / M | ` fix: resolve gitignore merge conflict` | `.gitignore` 移除冲突标记与重复行；message 有一个前导空格 |
| E10 | 2026-09-05 14:49:26 | `9d70da4` / U | Add Senity to technologies list in README | README 技术列表增加 Senity（保留原拼写） |
| E11 | 2026-09-05 14:50:12 | `21d04ae` / U | Update name format in README.md | README 姓名格式调整 |
| E12 | 2026-09-05 19:18:45 | `9dbbfe0` / M | Merge branch 'main' of github.com:darrenduan369/ai-fullstack-learning-roadmap | 合并 main 历史；与当日重载课程区分 |
| E13 | 2026-09-12 18:11:49 | `f5c5539` / M | docs: organize lessons 1 through 12 learning notes | 整理 L01～L12 学习记录；属于课程文档维护提交，不重复计为课程 |

<a id="lookup"></a>
## 文件与问题检索

### 文件导航

| 文件 | 当前职责 | 关联课程 |
| --- | --- | --- |
| [src/index.ts](../src/index.ts) | 演示入口与模块消费者 | 全部、L18 |
| [src/types/product.ts](../src/types/product.ts) | 产品模型、联合类型、工具类型和查询选项 | L02～L10 |
| [src/data/products.ts](../src/data/products.ts) | 产品样例数据 | L02～L04 |
| [src/services/productService.ts](../src/services/productService.ts) | 产品业务与异步逻辑 | L02～L14、L18 |
| [src/utils/objectUtils.ts](../src/utils/objectUtils.ts) | 泛型字段读写与求和 | L06、L09 |
| [src/types/contracts.ts](../src/types/contracts.ts) | 可销售、库存管理与定价策略接口 | L12～L13 |
| [src/models/ProductEntity.ts](../src/models/ProductEntity.ts) / [src/models/BaseProduct.ts](../src/models/BaseProduct.ts) | 实体、继承、方法重写、多态和定价策略 | L12～L13 |
| [src/async/asyncDemo.ts](../src/async/asyncDemo.ts) | Promise 与延迟异步任务 | L14 |
| [src/api/productApi.ts](../src/api/productApi.ts) | 返回 `unknown` 的 JSON 请求示例 | L15 |
| [src/api/todoApi.ts](../src/api/todoApi.ts) | Todo HTTP 请求 | L15～L18 |
| [src/api/httpClient.ts](../src/api/httpClient.ts) | `request<T>`、`Validator<T>`、基础地址和响应校验 | L16～L17 |
| [src/api/index.ts](../src/api/index.ts) | Todo API 显式 barrel exports | L18 |
| [src/types/todo.ts](../src/types/todo.ts) / [src/types/index.ts](../src/types/index.ts) | Todo 类型及显式 barrel exports | L15、L18 |
| [src/types/api.ts](../src/types/api.ts) | 尚未用于当前 Todo 流程的 `ApiResponse<T>` | L16 |
| [src/validators/todoValidator.ts](../src/validators/todoValidator.ts) | Todo 运行时校验 | L15～L16、L18 |
| [src/validators/productValidator.ts](../src/validators/productValidator.ts) | 产品守卫与断言；当前校验仍不完整 | L10～L11、L18 |
| [src/validators/index.ts](../src/validators/index.ts) | 验证器显式 barrel exports | L18 |
| [src/errors/ProductNotFoundError.ts](../src/errors/ProductNotFoundError.ts) / [src/errors/ProductValidationError.ts](../src/errors/ProductValidationError.ts) / [src/errors/index.ts](../src/errors/index.ts) | 产品错误类及显式 barrel exports | L11、L18 |
| [src/config/apiConfig.ts](../src/config/apiConfig.ts) | 读取并 Fail Fast 校验 `API_BASE_URL` | L17 |
| [.env.example](../.env.example) / [.gitignore](../.gitignore) | 环境变量模板与本地 `.env` 忽略规则 | L17 |
| [package.json](../package.json) / [tsconfig.json](../tsconfig.json) | build/start、Node 类型与编译配置 | L01、L17 |
### 排查线索登记

以下为基线代码阅读得到的现状或待明确边界，未在本次修复，亦未运行专门复现测试。后续修复应创建 REQ 记录并回链此编号。

| 编号 / 现象 | 最短定位 | 来源 | 下一步验证与状态 |
| --- | --- | --- | --- |
| Q01 错误字段类型也可能通过校验 | `src/validators/productValidator.ts`：isProduct → assertIsProduct | L10～L11、L18 | 传 `{ id: "wrong", name: 123, price: null }`，当前逻辑会通过；待补充完整 Product 校验需求 |
| Q02 空列表价格为无穷值 | getPriceRange | L09 / `78c4afa` | 传空数组；需先确定空值、异常或其他返回约定 |
| Q03 supplier.country 丢失 | updateProduct / updateSupplier / updateProductWithoutSupplier | L06 → L07 | 核对调用的是深一层合并还是浅替换；属于排查入口，未确认实际回归 |
| Q04 不存在的 ID 取属性失败 | getProductById / searchProduct / createProductMap | L03、L08、L10 | 用 999 检查 undefined 分支；调用处需判断 |
| Q05 排序或修改污染原对象 | sortProductsByPrice / updateProductStockById / updateSupplierNameById | L04、L05 | 对比数组、目标对象及嵌套 supplier 引用 |
| Q06 旧练习没有输出 | src/index.ts 中对应注释块 | 各课入口 | 先确认是否注释及是否重新编译；不要同时启用同名 const 示例 |
| Q07 负库存显示低库存 | getStockStatus | L03 / `163226a` | 用 -1、0、5、6 检查；待明确是否拒绝负数 |
| Q08 折扣率可能超出合理范围 | DiscountProduct.constructor / getPrice | L12 / 暂存区 | 用 -0.1、1、1.2 检查；待明确是否限制在 0～1，本次不改代码 |
| Q09 接口文件名疑似拼写错误 | 历史 `src/types/constracts.ts` 及其 imports | L12 → L13 / `1779069` | 已解决：更名为 `src/types/contracts.ts` 并同步 imports；当前路径已核对 |
| Q10 部分 Todo 请求仍使用相对 URL | `src/api/todoApi.ts`：`fetchTodosByQuery`、`updateTodo`、`deleteTodo`、`replaceTodo` | L15～L18 | 当前这些函数直接 `fetch("/todos...")`，Node 中不具备浏览器页面基础地址；待统一复用带 `API_BASE_URL` 的 `request` 或显式拼接完整 URL |
| Q11 模块重构后错误对象丢失 `productId` 属性 | `ProductNotFoundError` / `getRequiredProductById` | L11、L18 / `fdfdb79` | 重构前构造函数公开 `readonly productId`；当前独立错误类只用 id 生成 message。需确认是否恢复该字段，本次只记录、不改源码 |

### 常用追溯命令（PowerShell）

```powershell
# 按关键词检索本档案与当前源码
rg -n 'supplier|Q03|L07' docs/LEARNING-TRACE.md src

# 查看某次修改和当时完整源码，不切换当前工作区
git show --stat b69958d
git show b69958d -- src/services/productService.ts src/types/product.ts
git show b69958d:src/services/productService.ts

# 查询函数引入、删除与文件演变
git log --all -S 'assertIsProduct' --oneline -- src/services/productService.ts
git log --follow --oneline -- src/services/productService.ts
git blame src/services/productService.ts

# 比较两个课程版本；合并提交分别与两个父提交比较
git diff d03121e b69958d -- src/services/productService.ts
git diff '9dbbfe0^1' 9dbbfe0 -- src
git diff '9dbbfe0^2' 9dbbfe0 -- src

# 核对时间、完整 message、当前包含分支和历史分支证据
git show -s --format=fuller 8c71019
git show -s --format=%B 8c71019
git branch -a --contains 8c71019
git reflog show main --date=iso

# 当前项目已有依赖时编译，再运行入口；每步成功后再执行下一步
npm run build
node dist/index.js
```

建议顺序：按现象找 Q 编号或函数 → 找关联课程/提交 → 对比历史实现和当前调用 → 最小复现 → 修复并验证 → 追加 REQ 记录。当前 build 只做编译，入口只运行已启用演示，不能代表全部课程回归通过。

<a id="requests"></a>
## 需求处理流水

| 需求编号 | 日期 | 摘要 | 状态 | 关联 |
| --- | --- | --- | --- | --- |
| [REQ-20260908-01](#req-20260908-01) | 2026-09-08 | 建立课程、提交和问题追溯档案，约定后续自动维护 | 文档已生成，未提交 | L01～L10、E01～E12 |
| [REQ-20260909-01](#req-20260909-01) | 2026-09-09 | 导出带目录导航的 Word 文档 | 已生成，未提交 | REQ-20260908-01 |
| [REQ-20260909-02](#req-20260909-02) | 2026-09-09 | 排查 VS Code 打开 DOCX 显示乱码 | 已定位，无代码变更 | REQ-20260909-01 |
| [REQ-20260909-03](#req-20260909-03) | 2026-09-09 | 约定每课提交后同步 Markdown 与 DOCX | 规则已建立，未提交 | REQ-20260908-01、REQ-20260909-01 |
| [REQ-20260912-01](#req-20260912-01) | 2026-09-12 | 完善并统一整理前 12 课课程文档 | 两版文档已同步，未提交 | L01～L12 |
| [REQ-20260923-01](#req-20260923-01) | 2026-09-23 | 根据提交与当前代码补录第 13～18 课并同步 Markdown/DOCX | 已随 `fdfdb79` 提交 | L13～L18、Q09～Q10 |
| [REQ-20260924-01](#req-20260924-01) | 2026-09-24 | 按课程事实校正 L13～L18、进度和长期维护规则 | Markdown/DOCX 已同步，待提交 | L13～L18、Q01、Q10～Q11 |
| [REQ-20260924-02](#req-20260924-02) | 2026-09-24 | 补齐工程提交表并建立实时增量同步规则 | Markdown/DOCX 已同步，待提交 | E01～E13、REQ-20260924-01 |

<a id="req-20260908-01"></a>
### REQ-20260908-01：建立可持续维护的追溯档案

- 记录时间：2026-09-08 16:35 +08:00；历史基线 `8c71019`；处理分支 `main`。
- 用户需求摘要：整理此前每课内容、日期时间、提交分支和 message，支持再次定位修复；以后处理需求时同步更新此文件。
- 现状与原因：课程代码逐步积累在入口与服务中，README 尚无课程索引，同 message 的提交也可能涉及不同文件。
- 方案与改动：创建本文件作为统一档案；README 增加入口；AGENTS.md 添加处理前查档、处理后更新的规则。历史内容按证据还原，不补写未知对话。
- 验收标准：覆盖 23 条可见提交；10 个整理课程单元；能按时间、提交、函数和问题编号检索；保留未知项；有后续维护规则和模板。
- 验证（2026-09-08，+08:00）：`git diff --check` 通过；使用 Node 内置模块核对本地全部 23 条提交，遗漏 0；文档内部锚点及相对文件链接失效 0，重复锚点 0，Unicode 替换字符 0。`git status --short` 确认仅 AGENTS.md、README.md 和新 docs 文档发生变化。未运行 build 或课程示例：本次仅修改文档与助手约定，未修改业务代码、未新增依赖。
- 实际提交：文档首次纳入仓库的提交为 `6e08a69`，时间 2026-09-12 18:03:39 +08:00，message 为 `feat: practice TypeScript classes, interfaces, and abstract classes`。该提交同时包含课程代码，不是独立文档提交。
- 后续：新需求继续追加；本次仅登记 Q01～Q07 排查线索。

<a id="req-20260909-01"></a>
### REQ-20260909-01：导出带目录导航的 Word 文档

- 记录日期：2026-09-09（Asia/Shanghai）；处理分支 `main`；修改前基线 `8c71019`。
- 用户需求摘要：将学习追溯档案整理成能够通过目录导航的 Word 文档。
- 方案与改动：生成 `docs/TypeScript-Learning-Trace.docx`；保留标题层级，增加静态可点击目录，使用 A4 页面、中文字体、统一标题层级、交替底色表格和代码样式；README 增加 Word 入口。
- 验证：DOCX 包结构及必要 XML 已核对；目录条目与正文标题使用内部链接。当前隔离环境缺少文档工具包的 Python 和 LibreOffice 渲染运行时，本机 Word 后台转换又停在导入阶段，因此未完成逐页 PNG 视觉检查。首次在 Word 中打开时，Word 会把内嵌的 HTML 内容转换为普通文档内容，建议保存一次以完成物化。
- Git：DOCX 首次纳入仓库的提交为 `6e08a69`，时间 2026-09-12 18:03:39 +08:00，message 为 `feat: practice TypeScript classes, interfaces, and abstract classes`。

<a id="req-20260909-02"></a>
### REQ-20260909-02：排查 VS Code 打开 DOCX 显示乱码

- 记录日期：2026-09-09（Asia/Shanghai）；处理分支 `main`；当前基线 `8c71019`。
- 现象：在 VS Code 编辑器中直接打开 `docs/TypeScript-Learning-Trace.docx`，显示以 `PK` 开头的二进制字符。
- 原因：DOCX 是包含 XML 等内容的 ZIP 二进制包，VS Code 当前使用文本编辑器读取它；截图中的内容不是中文编码损坏。
- 处理方式：使用 Microsoft Word、WPS 或 LibreOffice 打开文件；若要在 VS Code 内预览，需要安装可信的 DOCX/Office 预览扩展，然后通过“重新打开编辑器方式”选择相应预览器。不要通过右下角编码菜单转换或保存该文件，否则可能破坏 DOCX 包。
- 默认应用说明：在 Windows 文件资源管理器中右键 DOCX，选择“打开方式”→“选择其他应用”→ WPS，并勾选“始终使用此应用打开 .docx 文件”。此关联只控制 Windows 双击行为；VS Code 资源管理器中的单击仍由 VS Code 编辑器处理，需要使用“在文件资源管理器中显示”后双击，或安装 DOCX 预览扩展。
- 验证依据：文件开头显示 ZIP 的 `PK` 签名；REQ-20260909-01 已核对 DOCX 必要包条目和 XML 结构。此次仅补充使用说明，未修改 DOCX 或业务代码，未运行构建。

<a id="req-20260909-03"></a>
### REQ-20260909-03：每课提交后同步两版学习档案

- 记录日期：2026-09-09（Asia/Shanghai）；处理分支 `main`；当前基线 `8c71019`。
- 用户需求摘要：以后每课代码完成提交后，将学习进度同步到 DOCX 文档。
- 执行规则：课程提交完成后，同时更新 Markdown 主档和 DOCX 导航版，记录日期时间、分支、真实提交 SHA、完整 message、学习内容、代码定位及验证结果；重新生成并核对 DOCX 目录。尚未提交时明确标为“待提交”。
- 持久化位置：规则已加入根目录 `AGENTS.md` 及本档案“后续记录模板与维护流程”，以后在本仓库处理课程任务时自动遵循。
- Git：规则首次纳入仓库的提交为 `6e08a69`，时间 2026-09-12 18:03:39 +08:00，message 为 `feat: practice TypeScript classes, interfaces, and abstract classes`；该提交同时包含课程代码。

<a id="req-20260912-01"></a>
### REQ-20260912-01：完善并统一整理前 12 课课程文档

- 记录时间：2026-09-12 18:04:16 +08:00；处理分支 `main`；当前提交基线 `8c71019`。
- 需求摘要：第 12 课完成后，补齐并统一整理全部 12 课的学习内容，同步 Markdown 与 DOCX 导航版。
- 整理结果：统一每课的学习目标、核心知识与代码实践、代码定位、验证与预期、排查重点；将原 L10 拆分为 L10 函数重载与类型守卫、L11 断言函数与自定义错误，并新增 L12 接口、抽象类与多态。
- 代码依据：暂存区中的 `src/services/productService.ts`、`src/models/ProductEntity.ts`、`src/models/BaseProduct.ts`、`src/types/constracts.ts` 和 `src/index.ts`。
- 验证：`npm run build` 因 PowerShell 执行策略阻止 `npm.ps1` 而未启动；改用同一安装目录的 `npm.cmd run build` 后 TypeScript 编译通过。随后运行 `node dist/index.js`，实际输出 `1 - LED Light 100`、`2 - Speaker 160`。
- 文档核验：Markdown 的 27 个二级/三级正文标题已同步为 DOCX 的 27 个静态目录链接和 27 个跳转目标；DOCX 已包含 L11、L12、真实提交 `6e08a69` 和运行结果，Unicode 替换字符为 0。当前环境仍无可用的文档渲染运行时，因此未完成逐页 PNG 视觉检查。
- Git 状态：课程代码已在 `main` 提交为 `6e08a69`，提交时间 2026-09-12 18:03:39 +08:00，完整 message 为 `feat: practice TypeScript classes, interfaces, and abstract classes`。本次提交后的课程文档整理仍在工作区，未擅自创建额外提交或改写历史。
- 待办：当前 Markdown 与 DOCX 内容已经同步；Q08、Q09 仅登记为后续确认项。

<a id="req-20260923-01"></a>
### REQ-20260923-01：补录第 13～18 课并同步两版档案

- 请求/记录时间：2026-09-23 15:42:49 +08:00。
- 类型与状态：学习文档；已完成并提交。
- 需求摘要与验收标准：依据当前窗口项目的相关记录，将已完成的第 13～18 课补录到 `docs/LEARNING-TRACE.md` 和 `docs/TypeScript-Learning-Trace.docx`；两版需包含课程日期时间、分支证据、真实提交 SHA、完整 message、学习主题、代码定位和验证结果。
- 关联课程/问题/前序需求：L13～L18、Q09、Q10、REQ-20260909-03、REQ-20260912-01。
- 原因与证据：Git 历史存在 `1779069`、`4c72899`、`d1d3933`、`ab7563f`、`d51289d`、`107d9b0` 六个连续课程提交，而旧档案截至 L12；逐提交核对作者/提交者时间、完整 message、父提交、文件差异和当前源码。L16 仅有本地 fast-forward 拉取证据，未推测其原始创建分支。
- 方案与改动：扩展课程索引与课程详情，更新当前文件导航；把 Q09 标记为已由 L13 解决；登记 Q10 作为相对 URL 的后续排查入口；从 Markdown 主档重新生成带静态目录导航的 DOCX。未修改 TypeScript 课程源码或依赖。
- Git：处理分支 `main`；修改前基线 `107d9b0`；实际提交为 `fdfdb79`，时间 2026-09-23 17:21:40 +08:00，完整 message 为 `refactor: organize project modules and update learning trace`。该提交同时包含 L18 模块化重构和两份学习文档。
- 验证：2026-09-23 在系统临时目录导出已提交的 `107d9b0` 纯净快照，使用项目现有 TypeScript 工具链独立编译通过；运行快照入口并加载 `.env.example`，输出 `API Base URL: https://jsonplaceholder.typicode.com`。未执行真实网络请求；历史各课未保存的运行结果仍明确标为未知。
- 文档核验：Markdown 与 DOCX 均覆盖 L01～L18；DOCX 目录条目、正文标题、课程提交信息和 Markdown 主档同步；ZIP 包结构、内部导航目标、Unicode 替换字符和关键课程文本已检查。当前环境未执行 Word/WPS 逐页视觉渲染。
- 未决项与后续：Q08 折扣率边界仍待需求确认；Q10 的相对 URL 请求待后续统一。该批文档已随 `fdfdb79` 提交；后续校正见 REQ-20260924-01。
<a id="req-20260924-01"></a>
### REQ-20260924-01：校正 Lesson 13～18 与学习进度

- 请求/记录时间：2026-09-24 09:49:16 +08:00。
- 类型与状态：学习文档维护；完成，文档变更待提交。
- 需求摘要与验收标准：严格按当前仓库、明确课程事实和可验证 Git 历史校正 L13～L18；加入长期 Maintenance Rules；同步 Current Progress 为 Lesson 18 completed、Lesson 19 planned；保持 Markdown 与 DOCX 语义一致，不实现 L19。
- 关联课程/问题/前序需求：L13～L18、Q01、Q09～Q11、REQ-20260923-01。
- 事实校正：L16 合并 `ab7563f` 的 DELETE/PUT/请求复用与 `d51289d` 的 `Validator<T>` / 运行时校验；L17 对应 `107d9b0` 的环境配置；L18 对应 `fdfdb79` 的模块化重构。JSONPlaceholder 当前不使用 `ApiResponse<T>`；Zod、Astro、Sanity 均未标为已完成或已开始。
- 当前路径更新：Todo API、类型和验证器分别定位到 `src/api/todoApi.ts`、`src/types/todo.ts`、`src/validators/todoValidator.ts`；产品验证器和错误类定位到 `src/validators/`、`src/errors/`；barrel exports 定位到各目录 `index.ts`。
- 冲突与边界：`fdfdb79` 重构前的 `ProductNotFoundError` 暴露 `readonly productId`，当前独立错误类未保留该公开字段，因此不能确认重构完全行为等价；记录为 Q11，本次不改源码。`isProduct` 当前仍只检查字段存在性，未完成类型与全部必填字段校验；保留 Q01。
- 修改文件：仅 `docs/LEARNING-TRACE.md`、`docs/TypeScript-Learning-Trace.docx`；未修改课程源码、配置或依赖。
- Git：处理分支 `main`；修改前基线 `fdfdb79`；本次文档校正待提交，未创建或改写提交。
- 验证：`npm.cmd run build` 通过；Markdown 共核对 35 个锚点、34 个内部链接和 27 个文件链接，目标均有效；DOCX 共核对 37 项静态目录、37 个正文标题和 8 条需求索引，关键课程事实均已同步，Unicode 替换字符为 0；工作区仅这两份学习记录文档发生修改。未使用 Word/WPS 进行分页与视觉渲染核验。
- 未决项与后续：Q01、Q08、Q10、Q11 保持待处理；Lesson 19 仅为 Planned。

<a id="req-20260924-02"></a>
### REQ-20260924-02：补齐工程提交表并建立实时同步规则

- 请求/记录时间：2026-09-24 10:25:06 +08:00。
- 类型与状态：学习文档维护；完成，文档变更待提交。
- 用户需求摘要：补齐“工程变更与其他提交”中尚未登记的已提交记录，并将该区域随 Git 历史实时增量更新的要求纳入长期文档规则。
- 证据与处理：以当前 `HEAD` `fdfdb79` 枚举全部可达提交，对照课程索引和 E01～E12 后确认遗漏 `f5c5539`（2026-09-12 18:11:49 +08:00，`docs: organize lessons 1 through 12 learning notes`）；新增为 E13。当前未提交的两份文档修改不计入工程提交表。
- 规则更新：Maintenance Rules 与“后续记录模板与维护流程”均要求每次维护时重新核对当前 `HEAD` 的可达提交，将课程索引未覆盖的新增提交同步补入工程提交表；待提交工作只登记到 REQ。
- 修改文件：仅 `docs/LEARNING-TRACE.md`、`docs/TypeScript-Learning-Trace.docx`；未修改课程源码、配置或依赖。
- Git：处理分支 `main`；当前基线 `fdfdb79`；本次文档修改待提交，未创建或改写 Git 历史。
- 验证：核对当前 31 条可达提交，课程索引与工程提交表合计覆盖全部提交且不重复；同步核对 Markdown 与 DOCX 的 E13、规则和本需求记录。未使用 Word/WPS 进行分页与视觉渲染核验。
<a id="maintenance"></a>
## 后续记录模板与维护流程

此档案依靠遵守根目录 AGENTS.md 的助手在处理项目需求时更新，不是后台监控服务。手工或其他工具产生的提交，需要下次任务开始时核对补录。无需为维护文档额外引入依赖。

1. 开始任务时读取本档案，检索相关函数、课程、REQ 和 Q 编号，核对实际源码、分支、Git 状态；从当前 `HEAD` 枚举可达提交，补齐能够从历史确认的遗漏记录。课程索引未覆盖的新增提交必须实时增量写入“工程变更与其他提交”，未提交改动只写入 REQ，不得伪造提交记录。
2. 新需求按当日顺序分配 `REQ-YYYYMMDD-NN`；同一问题的继续处理更新原记录并追加处理时间，后续独立修复创建新编号并关联旧记录。
3. 完成、部分完成或受阻都要记录实际状态、修改文件/符号、验证结果和未决项；纯学习讲解记录“无代码变更”。没有执行的验证明确写“未运行”。
4. 未提交时填写处理分支、基线 SHA、待提交状态；建议 message 与实际 message 分开。不为填哈希擅自提交。用户授权提交后，补录真实结果；不通过 amend 或重写历史给文档制造自引用哈希。若文档与代码同一提交，哈希可在下一次维护时补录。
5. 新课程追加到课程索引和内容节；函数迁移更新文件导航；修复 Q 问题更新其状态并链接 REQ，同时保留原始问题描述、引入提交和历史结论。
6. 每次维护检查目录链接、提交证据和记录一致性，保留既有编号。不要用一次编译成功覆盖尚未验证的历史课程结果。
7. 每课代码提交完成后，同步更新 `docs/LEARNING-TRACE.md` 与 `docs/TypeScript-Learning-Trace.docx`。DOCX 以 Markdown 主档为内容依据，需重新生成目录导航并核对两版的课程日期时间、分支、提交 SHA、完整 message、学习主题、代码定位和验证结果；未提交时只记录“待提交”，提交后再补录真实信息。

可复制的记录模板：

```markdown
<a id="req-yyyymmdd-nn"></a>
### REQ-YYYYMMDD-NN：简短标题

- 请求/记录时间：YYYY-MM-DD HH:mm:ss +08:00（无法确认的请求时间写未知）。
- 类型与状态：学习 / 新功能 / 修复 / 重构 / 文档；处理中 / 完成 / 部分完成 / 受阻。
- 需求摘要与验收标准：用户想得到什么，如何确认完成。
- 关联课程/问题/前序需求：Lxx、Qxx、REQ-...，没有则写无。
- 现象与复现：输入、操作、预期、实际；非故障需求写不适用。
- 原因与证据：文件路径、函数/类型、历史提交；推测与确认分开。
- 方案与改动：涉及文件和符号、行为前后差异、选择原因。
- Git：处理分支、修改前基线；实际提交 SHA、提交时间（带时区）、完整 message；未提交则明确标注。
- 验证：命令/用例、执行时间、实际结果、未执行项目及原因。
- 未决项与后续：边界、阻塞、下一步；若修复旧问题更新对应 Q 状态。
- 后续处理记录：时间、补充改动、验证及新提交，保留原结论。
```
