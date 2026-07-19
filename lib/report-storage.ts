import fs from "fs/promises";
import path from "path";
import crypto from "crypto";


export async function saveReportPDF(
  buffer:Buffer
){

const fileName =

`report-${crypto.randomUUID()}.pdf`;



const folder =

path.join(
process.cwd(),
"public",
"reports"
);



await fs.mkdir(
folder,
{
recursive:true,
}
);



const filePath =

path.join(
folder,
fileName
);



await fs.writeFile(
filePath,
buffer
);



return `/reports/${fileName}`;

}