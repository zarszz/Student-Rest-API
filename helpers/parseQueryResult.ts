import { QueryResult } from "https://deno.land/x/postgres/query.ts";

export const parseResult = (rowData: QueryResult): Array<any> => {
  let data: Array<any> = [];
  rowData.rows.forEach((element: Array<any>) => {
    let dataObject: any = {};
    for (let i = 0; i < rowData.rowDescription.columns.length; i++) {
      dataObject[rowData.rowDescription.columns[i].name] = element[i];
    }
    data.push(dataObject);
  });
  return data;
};
