# Day 4 Assessment: API Testing, Reporting, and Debugging

## 📋 Overview
Day 4 completes **Assessment Plan Tasks 3 & 4**:
- **API Automation Task**: Automating Login API & Product APIs (`GET`, `POST`, `PUT`, `DELETE`), validating HTTP status codes, response body schemas, headers, and latency/response time.
- **Reporting & Debugging Task**: Generating HTML reports and debugging test runs using Playwright Trace Viewer and Inspector.

---

## 🛠️ Architecture & Components Created

1. **[`src/api/apiClient.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/src/api/apiClient.ts)**:
   - High-level API client wrapping Playwright's `APIRequestContext`.
   - Automatic latency measurement (`responseTimeMs`) on every call.
   - Manages Bearer Token authentication headers.
   - Methods:
     - `login(username, password)`
     - `getCurrentUser()` (protected route)
     - `getProducts(limit)`
     - `getProductById(id)`
     - `createProduct(payload)`
     - `updateProduct(id, payload)`
     - `deleteProduct(id)`

2. **[`tests/day4/day4_api_assessment.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day4/day4_api_assessment.spec.ts)**:
   - **Task 1**: Login API authentication & JSON token validation.
   - **Task 2**: Bearer token injection for protected endpoints.
   - **Task 3**: GET products with status code, schema, headers, and response time checks.
   - **Task 4**: POST create product with payload validation.
   - **Task 5**: PUT partial update.
   - **Task 6**: DELETE entity validation.
   - **Task 7**: Negative testing (invalid credentials $\rightarrow$ 400 Bad Request).

3. **[`tests/day4/day4_debugging_tracing.spec.ts`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/tests/day4/day4_debugging_tracing.spec.ts)**:
   - Programmatic trace recording using `context.tracing.start` & `stop`.
   - Exports complete trace archive with DOM snapshots, screenshots, action logs, and network events to `test-results/day4-trace.zip`.

---

## 🔍 Playwright Trace Viewer

The Trace Viewer provides a full timeline of the test execution, including:
- **Action Timeline**: Every mouse click, keypress, and navigation step.
- **Before/After DOM Snapshots**: Inspect actual HTML elements at the exact millisecond an action occurred.
- **Network Log**: All HTTP requests, responses, headers, and timings.
- **Console & Errors**: Browser console errors and stack traces.

### How to View the Generated Day 4 Trace:
```powershell
npm run trace:day4
```
*(Or `npx playwright show-trace test-results/day4-trace.zip`)*

---

## 📊 Test Execution Summary

Run Day 4 tests:
```bash
npm run test:day4
```

Results:
```text
Running 9 tests using 6 workers
  ✓ API Task 1: Authenticate via Login API and Validate Response Contract (573ms)
  ✓ API Task 2: Validate Protected Endpoint with Bearer Token (838ms)
  ✓ API Task 3: GET Products - Validate Schema, Headers and Performance (492ms)
  ✓ API Task 4: POST Create Product - Validate Status Code 201/200 & Created Entity (495ms)
  ✓ API Task 5: PUT Update Product - Validate Status and Partial Updates (513ms)
  ✓ API Task 6: DELETE Product - Validate Soft/Hard Deletion Status and Body (468ms)
  ✓ API Task 7: Negative Auth - Validate 400 Bad Request with Invalid Credentials (489ms)
  ✓ Trace Viewer Task: Record Complete Trace with Snapshots and Actions (1.6s)
  ✓ Error Inspection: Demonstrate Failure Diagnostics and Error Context (1.2s)

9 passed (3.5s)
```

- **Day 4 Isolated HTML Report**: [`playwright-report/day4/index.html`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/playwright-report/day4/index.html)
- **Trace Archive**: [`test-results/day4-trace.zip`](file:///c:/Users/Priyansu%20Sikdar/Downloads/Playwright/test-results/day4-trace.zip)
