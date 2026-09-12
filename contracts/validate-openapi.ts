import contract from "./openapi.json";

const document = contract as Record<string, any>;
const failures: string[] = [];
const operationIds = new Set<string>();
const methods = new Set(["get", "post", "put", "patch", "delete"]);

function resolve(ref: string): unknown {
  if (!ref.startsWith("#/")) return undefined;
  return ref.slice(2).split("/").map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"))
    .reduce<unknown>((value, part) => value && typeof value === "object"
      ? (value as Record<string, unknown>)[part] : undefined, document);
}

function walk(value: unknown, at = "#"): void {
  if (!value || typeof value !== "object") return;
  if ("$ref" in value && typeof (value as any).$ref === "string") {
    const ref = (value as any).$ref;
    if (ref.startsWith("#/") && resolve(ref) === undefined) failures.push(`${at}: missing ${ref}`);
  }
  for (const [key, child] of Object.entries(value)) walk(child, `${at}/${key}`);
}

for (const [path, item] of Object.entries(document.paths ?? {})) {
  const names = [...path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
  for (const [method, operation] of Object.entries(item as Record<string, any>)) {
    if (!methods.has(method)) continue;
    if (!operation.operationId) failures.push(`${method} ${path}: missing operationId`);
    else if (operationIds.has(operation.operationId)) failures.push(`${method} ${path}: duplicate operationId`);
    else operationIds.add(operation.operationId);
    const parameters = [...((item as any).parameters ?? []), ...(operation.parameters ?? [])]
      .map((parameter: any) => parameter.$ref ? resolve(parameter.$ref) : parameter);
    for (const name of names) if (!parameters.some((p: any) => p?.in === "path" && p.name === name && p.required))
      failures.push(`${method} ${path}: missing path parameter ${name}`);
    const statuses = Object.keys(operation.responses ?? {});
    if (!statuses.some((status) => /^2\d\d$/.test(status))) failures.push(`${method} ${path}: no success response`);
    if (!statuses.includes("default")) failures.push(`${method} ${path}: no default error response`);
  }
}

walk(document);
if (document.openapi !== "3.1.0") failures.push("expected OpenAPI 3.1.0");
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`OpenAPI contract valid: ${operationIds.size} operations`);
