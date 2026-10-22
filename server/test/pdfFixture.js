export function makePdf({ javascript = false } = {}) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R" + (javascript ? " /OpenAction 4 0 R" : "") + " >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Resources << >> >>",
    ...(javascript ? ["<< /S /Java#53cript /J#53 (app.alert\\(1\\)) >>"] : [])
  ];
  let pdf = "%PDF-1.7\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += (index + 1) + " 0 obj\n" + object + "\nendobj\n";
  });
  const xref = Buffer.byteLength(pdf);
  pdf += "xref\n0 " + (objects.length + 1) + "\n0000000000 65535 f \n";
  for (const offset of offsets.slice(1)) pdf += String(offset).padStart(10, "0") + " 00000 n \n";
  pdf += "trailer\n<< /Size " + (objects.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF\n";
  return Buffer.from(pdf);
}

export async function cleanPdfTool(_executable, args) {
  if (args[0] === "--is-encrypted") return { code: 2, stdout: "" };
  if (args[0] === "--json=2") return { code: 0, stdout: JSON.stringify({ version: 2, qpdf: [{}, { "obj:1 0 R": { value: { "/Type": "/Catalog" } } }] }) };
  return { code: 0, stdout: "" };
}
